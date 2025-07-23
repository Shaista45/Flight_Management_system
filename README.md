
# ✈️ Flight Booking System — Flask + SQLite

A clean, modern, and functional **Flight Management Web App** built with **Python (Flask)**, featuring a responsive frontend (HTML/CSS/JavaScript) and **SQLite** for persistent backend storage. This system allows **users to search and book flights**, while giving **a single admin** full control to manage flight schedules and pricing.

---

## 🌟 Features

- 🛫 **Search & Book Flights** between major cities in Pakistan  
- 🔐 **Secure Admin Login** (No registration — hardcoded credentials)  
- ✏️ **Admin Panel**: Add, Edit, Delete flights from database  
- 💸 **Prices displayed in Pakistani Rupees (Rs.)**  
- ⚠️ **Input Validation**: Same city for departure/arrival not allowed  
- 💾 **Flight data stored in SQLite (`flight.db`)**  
- 🖥 **Responsive Frontend** using HTML5, CSS3, JavaScript, and Bootstrap  
- 💡 **Session handled via LocalStorage** for quick demo purposes  

---

## 🧰 Tech Stack

- **Backend**: Flask (Python)
- **Database**: SQLite
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap
- **Session**: LocalStorage

---

## 📁 Folder Structure

```
Flight_Management_system/
├── app.py              # Main Flask application
├── flight.db           # SQLite database
├── static/             # CSS & JS assets
│   ├── style.css
│   └── script.js
├── templates/
│   └── index.html      # HTML template
├── README.md           # This file
└── LICENSE             # MIT License
```

---

## 🔐 Admin Credentials

> Only one admin can log in (credentials are defined in `app.py`):

```
📧 Email:    admin@example.com 
🔑 Password: admin123  
```

> Note: There is no registration for admin. Credentials are hardcoded for security and simplicity.

---

## 🚀 Run the App Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Shaista45/Flight_Management_system.git
cd Flight_Management_system
```

### 2️⃣ Install Required Dependencies

```bash
pip install flask
```

### 3️⃣ Run the App

```bash
python app.py
```

### 4️⃣ Open in Browser

Visit: [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## 🧹 Flight Database Management

- All flight records are stored in `flight.db` (SQLite format).
- You can **view/edit the DB** using [DB Browser for SQLite](https://sqlitebrowser.org/).
- To **reset** all flights, just delete the `flight.db` file and re-run the app.

---

## ⚠️ Known Limitations

- ❗ **Only one hardcoded admin** — no multi-user or registration support
- 🔒 No email verification or password reset feature
- ⚠️ LocalStorage used for session management (not secure for production)

---

## 📜 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for more information.

---

> Made with ❤️ by Shaista Noureen
