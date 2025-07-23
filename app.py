from flask import Flask, render_template, request, redirect, session, flash, jsonify
import sqlite3
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'
DATABASE = 'flight_data.db'


# Initialize database with one admin and sample flights
def init_db():
    if not os.path.exists(DATABASE):
        conn = sqlite3.connect(DATABASE)
        conn.execute('''CREATE TABLE users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            username TEXT NOT NULL,
                            password TEXT NOT NULL,
                            role TEXT NOT NULL)''')

        conn.execute('''CREATE TABLE flights (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            flightNumber TEXT,
                            aircraft TEXT,
                            origin TEXT,
                            destination TEXT,
                            date TEXT,
                            time TEXT,
                            duration REAL,
                            seats INTEGER,
                            price REAL,
                            status TEXT)''')

        # Insert admin only if not exists
        conn.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
                     ('admin', 'admin123', 'admin'))

        # Sample flights
        sample_flights = [
            ('PK101', 'Boeing 737', 'Multan', 'Lahore', '2024-01-15', '08:30', 1.5, 45, 15000.00, 'available'),
            ('PK202', 'Airbus A320', 'Karachi', 'Islamabad', '2024-01-16', '14:15', 2.0, 12, 12000.00, 'available'),
            ('PK303', 'Boeing 787', 'Sialkot', 'Multan', '2024-01-17', '10:45', 1.0, 0, 18000.00, 'full')
        ]
        conn.executemany('''INSERT INTO flights (flightNumber, aircraft, origin, destination, date, time, duration, seats, price, status)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', sample_flights)
        conn.commit()
        conn.close()

@app.route('/dashboard-data')
def dashboard_data():
    if session.get('role') != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    flights = cur.execute("SELECT * FROM flights").fetchall()
    total_flights = len(flights)
    total_seats = sum([f['seats'] for f in flights])
    total_revenue = sum([f['price'] * f['seats'] for f in flights])
    conn.close()

    flights_list = [dict(f) for f in flights]

    return jsonify({
        'flights': flights_list,
        'total_flights': total_flights,
        'total_seats': total_seats,
        'total_revenue': total_revenue
    })


@app.route('/')
def home():
    conn = sqlite3.connect(DATABASE)
    flights = conn.execute("SELECT * FROM flights").fetchall()
    conn.close()
    return render_template("index.html", flights=flights)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = sqlite3.connect(DATABASE)
        # Always set role to 'user' (Passenger) for new registrations
        try:
            conn.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", (username, password, 'user'))
            conn.commit()
            flash("Registration successful. You can now login.", "success")
        except sqlite3.IntegrityError:
            flash("Username already exists.", "error")
        finally:
            conn.close()
        return redirect('/login')
    return render_template("register.html")
#function to add single and only admin that could only sign in through email and password
def add_admin():
    conn = sqlite3.connect(DATABASE)
    try:
        conn.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", ('admin', 'admin123', 'admin'))
        conn.commit()
    except sqlite3.IntegrityError:
        pass  # Admin already exists
    finally:
        conn.close()

# Ensure admin exists on startup
add_admin()
#function to add single and only admin that could only sign in through email and password
if __name__ == '__main__':
    init_db()
    app.run(debug=True)

    

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = sqlite3.connect(DATABASE)
        user = conn.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password)).fetchone()
        conn.close()
        if user:
            session['username'] = user[1]
            session['role'] = user[3]
            flash("Login successful!", "success")
            return redirect('/')
        else:
            flash("Invalid credentials", "danger")
    return render_template("login.html")


@app.route('/logout')
def logout():
    session.clear()
    flash("Logged out successfully.", "info")
    return redirect('/')


@app.route('/add_flight', methods=['POST'])
def add_flight():
    if session.get('role') != 'admin':
        return redirect('/')

    data = request.form
    if data['origin'] == data['destination']:
        flash("Origin and destination cannot be the same.", "danger")
        return redirect('/')

    conn = sqlite3.connect(DATABASE)
    conn.execute('''INSERT INTO flights (flightNumber, aircraft, origin, destination, date, time, duration, seats, price, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                 (data['flightNumber'], data['aircraft'], data['origin'], data['destination'],
                  data['date'], data['time'], float(data['duration']), int(data['seats']),
                  float(data['price']), data['status']))
    conn.commit()
    conn.close()
    flash("Flight added.", "success")
    return redirect('/')


@app.route('/edit_flight/<int:flight_id>', methods=['GET', 'POST'])
def edit_flight(flight_id):
    if session.get('role') != 'admin':
        return redirect('/')

    conn = sqlite3.connect(DATABASE)

    if request.method == 'POST':
        data = request.form
        if data['origin'] == data['destination']:
            flash("Origin and destination cannot be the same.", "danger")
            return redirect('/')
        conn.execute('''UPDATE flights SET flightNumber=?, aircraft=?, origin=?, destination=?, date=?, time=?,
                        duration=?, seats=?, price=?, status=? WHERE id=?''',
                     (data['flightNumber'], data['aircraft'], data['origin'], data['destination'],
                      data['date'], data['time'], float(data['duration']), int(data['seats']),
                      float(data['price']), data['status'], flight_id))
        conn.commit()
        conn.close()
        flash("Flight updated.", "success")
        return redirect('/')
    else:
        flight = conn.execute("SELECT * FROM flights WHERE id=?", (flight_id,)).fetchone()
        conn.close()
        return render_template('edit_flight.html', flight=flight)


@app.route('/delete_flight/<int:flight_id>')
def delete_flight(flight_id):
    if session.get('role') != 'admin':
        return redirect('/')

    conn = sqlite3.connect(DATABASE)
    conn.execute("DELETE FROM flights WHERE id=?", (flight_id,))
    conn.commit()
    conn.close()
    flash("Flight deleted.", "info")
    return redirect('/')


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
