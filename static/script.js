// // Application State
// let currentUser = null;
// let flights = [
//     {
//         id: 1,
//         flightNumber: 'PK101',
//         aircraft: 'PIA Boeing 777',
//         origin: 'Karachi',
//         destination: 'Islamabad',
//         date: '2025-08-01',
//         time: '08:30',
//         duration: 2.0,
//         seats: 45,
//         price: 15000,
//         status: 'available'
//     },
//     {
//         id: 2,
//         flightNumber: 'PK202',
//         aircraft: 'Airblue Airbus A320',
//         origin: 'Lahore',
//         destination: 'Karachi',
//         date: '2025-08-02',
//         time: '14:15',
//         duration: 2.0,
//         seats: 12,
//         price: 13500,
//         status: 'available'
//     },
//     {
//         id: 3,
//         flightNumber: 'PK303',
//         aircraft: 'Serene Air Boeing 737',
//         origin: 'Sialkot',
//         destination: 'Lahore',
//         date: '2025-08-03',
//         time: '10:45',
//         duration: 1.0,
//         seats: 0,
//         price: 9500,
//         status: 'full'
//     },
//     {
//         id: 4,
//         flightNumber: 'PK404',
//         aircraft: 'Fly Jinnah Airbus A320',
//         origin: 'Multan',
//         destination: 'Islamabad',
//         date: '2025-08-04',
//         time: '16:20',
//         duration: 1.5,
//         seats: 28,
//         price: 12000,
//         status: 'available'
//     },
//     {
//         id: 5,
//         flightNumber: 'PK505',
//         aircraft: 'PIA ATR 72',
//         origin: 'Islamabad',
//         destination: 'Sialkot',
//         date: '2025-08-05',
//         time: '12:00',
//         duration: 1.2,
//         seats: 67,
//         price: 8000,
//         status: 'available'
//     }
// ];

// let editingFlightId = null;

// // Utility Functions
// function formatTime(timeString) {
//     return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         hour12: true 
//     });
// }
// function loadAdminDashboard() {
//     fetch('/dashboard-data')
//         .then(res => res.json())
//         .then(data => {
//             if (data.error) {
//                 alert("Unauthorized access");
//                 return;
//             }

//             // Update stats
//             document.getElementById("totalFlights").textContent = data.total_flights;
//             document.getElementById("totalSeats").textContent = data.total_seats;
//             document.getElementById("totalRevenue").textContent = `Rs.${data.total_revenue}`;

//             // Populate flights
//             const tbody = document.getElementById("adminFlightsTableBody");
//             tbody.innerHTML = '';

//             data.flights.forEach(flight => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${flight.flightNumber}</td>
//                     <td>${flight.origin} → ${flight.destination}</td>
//                     <td>${flight.date} ${flight.time}</td>
//                     <td>${flight.seats}</td>
//                     <td>Rs.${flight.price}</td>
//                     <td>${flight.status}</td>
//                     <td>
//                         <button onclick="editFlight(${flight.id})">✏️</button>
//                         <button onclick="deleteFlight(${flight.id})">🗑️</button>
//                     </td>
//                 `;
//                 tbody.appendChild(row);
//             });

//             showView('adminView');
//         });
// }

// function formatDate(dateString) {
//     return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//     });
// }

// function formatPrice(price) {
//     return `Rs. ${price.toLocaleString('en-PK')}`;
// }


// function showAlert(message, type = 'success') {
//     const alertContainer = document.getElementById('alertContainer');
//     const alert = document.createElement('div');
//     alert.className = `alert ${type}`;
//     alert.textContent = message;
    
//     alertContainer.appendChild(alert);
    
//     setTimeout(() => {
//         alert.style.animation = 'slideOut 0.3s ease forwards';
//         setTimeout(() => {
//             if (alert.parentNode) {
//                 alert.parentNode.removeChild(alert);
//             }
//         }, 300);
//     }, 4000);
// }

// // Navigation Functions
// function showView(viewId) {
//     // Hide all views
//     document.querySelectorAll('.view').forEach(view => {
//         view.classList.remove('active');
//     });

//     // Show selected view
//     document.getElementById(viewId).classList.add('active');

//     // Update navigation active state
//     document.querySelectorAll('.nav-link').forEach(link => {
//         link.classList.remove('active');
//     });

//     const activeLink = document.querySelector(`[data-view="${viewId.replace('View', '')}"]`);
//     if (activeLink) {
//         activeLink.classList.add('active');
//     }

//     // Update page title
//     const titles = {
//         homeView: 'Shaista Airways - Home',
//         loginView: 'Shaista Airways - Login',
//         registerView: 'Shaista Airways - Register',
//         adminView: 'Shaista Airways - Admin Dashboard'
//     };
//     document.title = titles[viewId] || 'Shaista Airways';

//     // If admin dashboard is shown, update info
//     if (viewId === 'adminView') {
//         renderAdminFlights();
//         updateDashboardStats();
//     }
// }

// function updateNavigation() {
//     const navAuth = document.getElementById('navAuth');
    
//     if (currentUser) {
//         navAuth.innerHTML = `
//             <span class="nav-link">Welcome, ${currentUser.firstName}</span>
//             <span class="nav-link role-badge">${currentUser.role.toUpperCase()}</span>
//             ${currentUser.role === 'admin' ? '<a href="#" class="nav-link" data-view="admin">Dashboard</a>' : ''}
//             <a href="#" class="nav-link" onclick="logout()">Logout</a>
//         `;
//     } else {
//         navAuth.innerHTML = `
//             <a href="#" class="nav-link" data-view="login">Login</a>
//             <a href="#" class="nav-link register-btn" data-view="register">Register</a>
//         `;
//     }
    
//     // Reattach event listeners
//     attachNavigationListeners();
// }

// function attachNavigationListeners() {
//     document.querySelectorAll('[data-view]').forEach(link => {
//         link.addEventListener('click', (e) => {
//             e.preventDefault();
//             const view = e.target.getAttribute('data-view');
            
//             // Handle flights navigation specially
//             if (view === 'flights') {
//                 showView('homeView');
//                 setTimeout(() => {
//                     document.getElementById('flightsSection').scrollIntoView({
//                         behavior: 'smooth'
//                     });
//                 }, 100);
//                 return;
//             }
            
//             if (view === 'admin' && (!currentUser || currentUser.role !== 'admin')) {
//                 showAlert('Access denied. Admin privileges required.', 'error');
//                 return;
//             }
//             showView(view + 'View');
//         });
//     });
// }

// // Authentication Functions
// function login(email, password) {
//     // Hardcoded admin credentials
//     const adminUser = {
//         id: 1,
//         firstName: 'Admin',
//         lastName: 'User',
//         email: 'admin@example.com',
//         password: 'admin123',
//         role: 'admin'
//     };

//     // Predefined passengers (can be extended)
//     const predefinedPassengers = [
//         {
//             id: 2,
//             firstName: 'John',
//             lastName: 'Doe',
//             email: 'john@example.com',
//             password: 'user123',
//             role: 'user'
//         },
//         {
//             id: 3,
//             firstName: 'Jane',
//             lastName: 'Smith',
//             email: 'jane@example.com',
//             password: 'passenger123',
//             role: 'user'
//         }
//     ];

//     // Get registered users
//     const users = JSON.parse(localStorage.getItem('users') || '[]');

//     let user = null;
//     // Check admin
//     if (email === adminUser.email && password === adminUser.password) {
//         user = adminUser;
//     } else {
//         // Check predefined passengers
//         user = predefinedPassengers.find(u => u.email === email && u.password === password);
//         if (!user) {
//             // Check registered passengers
//             user = users.find(u => u.email === email && u.password === password && u.role === 'user');
//         }
//     }

//     if (user) {
//         currentUser = user;
//         localStorage.setItem('currentUser', JSON.stringify(currentUser));
//         updateNavigation();
//         showView('homeView');
//         showAlert(`Welcome back, ${user.firstName}!`, 'success');
//         if (user.role === 'admin') {
//             updateDashboardStats();
//         }
//     } else {
//         showAlert('Invalid email or password', 'error');
//     }
// }

// function register(userData) {
//     // Only passengers can register (role must be 'user')
//     if (userData.role !== 'user') {
//         showAlert('Only passengers can register.', 'error');
//         return;
//     }
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     // Prevent registration for predefined users
//     const predefinedEmails = ['admin@example.com', 'john@example.com', 'jane@example.com'];
//     if (predefinedEmails.includes(userData.email)) {
//         showAlert('This email is reserved and cannot be registered.', 'error');
//         return;
//     }
//     // Check if user already exists
//     if (users.find(u => u.email === userData.email)) {
//         showAlert('Email already registered', 'error');
//         return;
//     }
//     // Add user
//     const newUser = {
//         id: Date.now(),
//         ...userData
//     };
//     users.push(newUser);
//     localStorage.setItem('users', JSON.stringify(users));
//     showAlert('Registration successful! Please login.', 'success');
//     showView('loginView');
// }

// function logout() {
//     const confirmLogout = confirm("Are you sure you want to log out?");
//     if (confirmLogout) {
//         currentUser = null;
//         localStorage.removeItem('currentUser');
//         updateNavigation();
//         showView('homeView');
//         showAlert('Logged out successfully', 'success');
//     } else {
//         showAlert('Logout cancelled', 'info');
//     }
// }


// // Flight Functions
// function renderFlights(flightsToRender = flights) {
//     const tbody = document.getElementById('flightsTableBody');
    
//     if (flightsToRender.length === 0) {
//         tbody.innerHTML = `
//             <tr>
//                 <td colspan="7" style="text-align: center; padding: 3rem; color: #6b7280;">
//                     <div style="font-size: 3rem; margin-bottom: 1rem;">✈️</div>
//                     <h3>No flights found</h3>
//                     <p>Try adjusting your search criteria</p>
//                 </td>
//             </tr>
//         `;
//         return;
//     }
    
//     tbody.innerHTML = flightsToRender.map((flight, index) => `
//         <tr style="animation-delay: ${index * 0.1}s">
//             <td>
//                 <div class="flight-number">${flight.flightNumber}</div>
//                 <div style="font-size: 0.875rem; color: #6b7280;">${flight.aircraft}</div>
//             </td>
//             <td>
//                 <div class="route">
//                     <span>${flight.origin}</span>
//                     <span class="route-arrow">→</span>
//                     <span>${flight.destination}</span>
//                 </div>
//             </td>
//             <td>
//                 <div>${formatDate(flight.date)}</div>
//                 <div style="font-size: 0.875rem; color: #6b7280;">${formatTime(flight.time)}</div>
//             </td>
//             <td>${flight.duration}h</td>
//             <td>
//                 <div class="status-badge ${flight.seats > 0 ? 'available' : 'full'}">
//                     ${flight.seats > 0 ? `${flight.seats} Available` : 'Full'}
//                 </div>
//             </td>
//             <td>
//                 <div class="price">${formatPrice(flight.price)}</div>
//             </td>
//             <td>
//                 ${flight.seats > 0 
//                     ? `<button class="book-btn" onclick="bookFlight(${flight.id})">Book Now</button>`
//                     : '<span style="color: #6b7280;">Unavailable</span>'
//                 }
//             </td>
//         </tr>
//     `).join('');
// }

// function renderAdminFlights() {
//     const tbody = document.getElementById('adminFlightsTableBody');
    
//     tbody.innerHTML = flights.map((flight, index) => `
//         <tr style="animation-delay: ${index * 0.1}s">
//             <td>
//                 <div class="flight-number">${flight.flightNumber}</div>
//                 <div style="font-size: 0.875rem; color: #6b7280;">${flight.aircraft}</div>
//             </td>
//             <td>
//                 <div class="route">
//                     <span>${flight.origin}</span>
//                     <span class="route-arrow">→</span>
//                     <span>${flight.destination}</span>
//                 </div>
//             </td>
//             <td>
//                 <div>${formatDate(flight.date)}</div>
//                 <div style="font-size: 0.875rem; color: #6b7280;">${formatTime(flight.time)}</div>
//             </td>
//             <td>${flight.seats}</td>
//             <td>${formatPrice(flight.price)}</td>
//             <td>
//                 <div class="status-badge ${flight.seats > 0 ? 'available' : 'full'}">
//                     ${flight.seats > 0 ? 'Available' : 'Full'}
//                 </div>
//             </td>
//             <td>
//                 <button class="action-btn edit-btn" onclick="editFlight(${flight.id})">Edit</button>
//                 <button class="action-btn delete-btn" onclick="confirmDeleteFlight(${flight.id})">Delete</button>
//             </td>
//         </tr>
//     `).join('');
// }

// function searchFlights() {
//     const origin = document.getElementById('searchOrigin').value.trim();
//     const destination = document.getElementById('searchDestination').value.trim();
//     const date = document.getElementById('searchDate').value.trim();

//     // ✅ Validation
//     if (!origin || !destination || !date) {
//         showAlert('Please select Origin, Destination and Date before searching.', 'error');
//         return;
//     }
//     if (origin === destination) {
//         showAlert('Origin and Destination cannot be the same', 'error');
//         return;
//     }
//     if (new Date(date) < new Date()) {
//         showAlert('Cannot search for past flights', 'error');
//         return;
//     }

//     // Proceed with search
//     let filteredFlights = flights;

//     filteredFlights = filteredFlights.filter(flight => 
//         flight.origin === origin && 
//         flight.destination === destination && 
//         flight.date === date
//     );

//     renderFlights(filteredFlights);

//     if (filteredFlights.length > 0) {
//         showAlert(`Found ${filteredFlights.length} flight(s)`, 'success');
//     } else {
//         showAlert('No flights found matching your criteria', 'warning');
//     }
// }

// function bookFlight(flightId) {
//     if (!currentUser) {
//         showAlert('Please login to book flights', 'warning');
//         showView('loginView');
//         return;
//     }
    
//     const flight = flights.find(f => f.id === flightId);
//     if (flight && flight.seats > 0) {
//         // Simulate booking
//         showAlert(`Flight ${flight.flightNumber} booked successfully!`, 'success');
        
//         // Decrease available seats
//         flight.seats--;
//         if (flight.seats === 0) {
//             flight.status = 'full';
//         }
        
//         // Update displays
//         renderFlights();
//         if (currentUser && currentUser.role === 'admin') {
//             renderAdminFlights();
//             updateDashboardStats();
//         }
//     } else {
//         showAlert('Flight is no longer available', 'error');
//     }
// }


// // Admin Functions
// function updateDashboardStats() {
//     const totalFlights = flights.length;
//     const totalSeats = flights.reduce((sum, flight) => sum + flight.seats, 0);
//     const totalRevenue = flights.reduce((sum, flight) => sum + (flight.price * (100 - flight.seats)), 0);
    
//     document.getElementById('totalFlights').textContent = totalFlights;
//     document.getElementById('totalSeats').textContent = totalSeats;
//     document.getElementById('totalRevenue').textContent = formatPrice(totalRevenue);
// }

// function showAddFlightModal() {
//     document.getElementById('modalTitle').textContent = 'Add New Flight';
//     document.getElementById('submitFlightBtn').textContent = 'Add Flight';
//     document.getElementById('flightForm').reset();
//     editingFlightId = null;
    
//     // Set minimum date to today
//     const today = new Date().toISOString().split('T')[0];
//     document.getElementById('flightDate').min = today;
    
//     document.getElementById('flightModal').classList.add('active');
// }

// function editFlight(flightId) {
//     const flight = flights.find(f => f.id === flightId);
//     if (!flight) return;
    
//     document.getElementById('modalTitle').textContent = 'Edit Flight';
//     document.getElementById('submitFlightBtn').textContent = 'Update Flight';
    
//     // Populate form
//     document.getElementById('flightNumber').value = flight.flightNumber;
//     document.getElementById('aircraft').value = flight.aircraft;
//     document.getElementById('origin').value = flight.origin;
//     document.getElementById('destination').value = flight.destination;
//     document.getElementById('flightDate').value = flight.date;
//     document.getElementById('flightTime').value = flight.time;
//     document.getElementById('duration').value = flight.duration;
//     document.getElementById('seats').value = flight.seats;
//     document.getElementById('price').value = flight.price;
    
//     editingFlightId = flightId;
//     document.getElementById('flightModal').classList.add('active');
// }

// function confirmDeleteFlight(flightId) {
//     const flight = flights.find(f => f.id === flightId);
//     if (!flight) return;
    
//     document.getElementById('confirmationTitle').textContent = 'Delete Flight';
//     document.getElementById('confirmationMessage').textContent = 
//         `Are you sure you want to delete flight ${flight.flightNumber}? This action cannot be undone.`;
    
//     document.getElementById('confirmActionBtn').onclick = () => {
//         deleteFlight(flightId);
//         closeConfirmationModal();
//     };
    
//     document.getElementById('confirmationModal').classList.add('active');
// }

// function deleteFlight(flightId) {
//     const flightIndex = flights.findIndex(f => f.id === flightId);
//     if (flightIndex !== -1) {
//         const flight = flights[flightIndex];
//         flights.splice(flightIndex, 1);
        
//         renderFlights();
//         renderAdminFlights();
//         updateDashboardStats();
        
//         showAlert(`Flight ${flight.flightNumber} deleted successfully`, 'success');
//     }
// }

// function closeFlightModal() {
//     document.getElementById('flightModal').classList.remove('active');
//     editingFlightId = null;
// }

// function closeConfirmationModal() {
//     document.getElementById('confirmationModal').classList.remove('active');
// }

// // Event Listeners
// document.addEventListener('DOMContentLoaded', function() {
//     // Check for saved user
//     const savedUser = localStorage.getItem('currentUser');
//     if (savedUser) {
//         currentUser = JSON.parse(savedUser);
//         updateNavigation();
//     } else {
//         updateNavigation();
//     }
    
//     // Initialize flights display
//     renderFlights();
    
//     // Mobile navigation toggle
//     const navToggle = document.getElementById('navToggle');
//     const navMenu = document.querySelector('.nav-menu');
    
//     navToggle.addEventListener('click', () => {
//         navMenu.classList.toggle('active');
//     });
    
//     // Navigation links
//     attachNavigationListeners();
    
//     // Login form
//     document.getElementById('loginForm').addEventListener('submit', function(e) {
//         e.preventDefault();
//         const email = document.getElementById('loginEmail').value;
//         const password = document.getElementById('loginPassword').value;
//         login(email, password);
//     });
    
//     // Register form
//     document.getElementById('registerForm').addEventListener('submit', function(e) {
//         e.preventDefault();
//       const userData = {
//       firstName: document.getElementById('registerFirstName').value,
//       lastName: document.getElementById('registerLastName').value,
//       email: document.getElementById('registerEmail').value,
//       password: document.getElementById('registerPassword').value,
//       role: 'user' // Always set to passenger
//       };
//         register(userData);
//     });
    
//     // Flight form
//     document.getElementById('flightForm').addEventListener('submit', function(e) {
//         e.preventDefault();
        
//         const flightData = {
//             flightNumber: document.getElementById('flightNumber').value,
//             aircraft: document.getElementById('aircraft').value,
//             origin: document.getElementById('origin').value,
//             destination: document.getElementById('destination').value,
//             date: document.getElementById('flightDate').value,
//             time: document.getElementById('flightTime').value,
//             duration: parseFloat(document.getElementById('duration').value),
//             seats: parseInt(document.getElementById('seats').value),
//             price: parseFloat(document.getElementById('price').value),
//             status: 'available'
//         };
        
//         // Validation
//         if (flightData.origin === flightData.destination) {
//             showAlert('Origin and destination cannot be the same', 'error');
//             return;
//         }
        
//         if (editingFlightId) {
//             // Update existing flight
//             const flightIndex = flights.findIndex(f => f.id === editingFlightId);
//             if (flightIndex !== -1) {
//                 flights[flightIndex] = { ...flights[flightIndex], ...flightData };
//                 showAlert('Flight updated successfully', 'success');
//             }
//         } else {
//             // Add new flight
//             const newFlight = {
//                 id: Date.now(),
//                 ...flightData
//             };
//             flights.push(newFlight);
//             showAlert('Flight added successfully', 'success');
//         }
        
//         renderFlights();
//         renderAdminFlights();
//         updateDashboardStats();
//         closeFlightModal();
//     });
    
//     // Modal close on outside click
//     document.getElementById('flightModal').addEventListener('click', function(e) {
//         if (e.target === this) {
//             closeFlightModal();
//         }
//     });
    
//     document.getElementById('confirmationModal').addEventListener('click', function(e) {
//         if (e.target === this) {
//             closeConfirmationModal();
//         }
//     });
    
//     // Set minimum date for search
//     const today = new Date().toISOString().split('T')[0];
//     document.getElementById('searchDate').min = today;
    
//     // Smooth scrolling for anchor links
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function (e) {
//             const href = this.getAttribute('href');
//             // Skip if href is just "#" to avoid invalid selector
//             if (href !== '#') {
//                 e.preventDefault();
//                 const target = document.querySelector(href);
//                 if (target) {
//                     target.scrollIntoView({
//                         behavior: 'smooth'
//                     });
//                 }
//             }
//         });
//     });
    
//     //Add some demo users for testing
//     if (!localStorage.getItem('users')) {
//         const demoUsers = [
//             {
//                 id: 1,
//                 firstName: 'Admin',
//                 lastName: 'User',
//                 email: 'admin@example.com',
//                 password: 'admin123',
//                 role: 'admin'
//             },
//             {
//                 id: 2,
//                 firstName: 'Ijaz',
//                 lastName: 'Hussain',
//                 email: 'ijaz@gmail.com',
//                 password: 'ijaz123',
//                 role: 'passanger'
//             }
//         ];
//         localStorage.setItem('users', JSON.stringify(demoUsers));
//     }
// });

// // Add CSS animation classes dynamically
// const style = document.createElement('style');
// style.textContent = `
//     @keyframes slideOut {
//         to { 
//             transform: translateX(400px); 
//             opacity: 0;
//         }
//     }
    
//     .role-badge {
//         background: var(--primary-blue) !important;
//         color: var(--white) !important;
//         padding: 0.25rem 0.75rem !important;
//         border-radius: 15px !important;
//         font-size: 0.75rem !important;
//         font-weight: 600 !important;
//     }
// `;
// document.head.appendChild(style);

// // Add keyboard shortcuts
// document.addEventListener('keydown', function(e) {
//     // ESC to close modals
//     if (e.key === 'Escape') {
//         closeFlightModal();
//         closeConfirmationModal();
//     }
    
//     // Ctrl/Cmd + K for search focus
//     if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
//         e.preventDefault();
//         document.getElementById('searchOrigin').focus();
//     }
// });
 
// document.addEventListener('DOMContentLoaded', function () {
//     const userLink = document.getElementById('userProfileLink');
//     const flightSection = document.getElementById('userFlightsSection');
//     const flightList = document.getElementById('userFlightsList');

//     if (!userLink || !flightSection || !flightList) return;

//     userLink.addEventListener('click', function (e) {
//         e.preventDefault();

//         const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//         if (!currentUser || currentUser.role !== 'user') {
//             alert("Only signed-in users can view flights.");
//             return;
//         }

//         const allFlights = JSON.parse(localStorage.getItem('userFlights')) || {};
//         const flights = allFlights[currentUser.email] || [];

//         flightList.innerHTML = ''; // Clear previous list

//         if (flights.length === 0) {
//             flightList.innerHTML = '<li>No flights added yet.</li>';
//         } else {
//             flights.forEach(flight => {
//                 const li = document.createElement('li');
//                 li.textContent = `${flight.flightNumber} | ${flight.origin} → ${flight.destination} on ${flight.date} at ${flight.time}`;
//                 flightList.appendChild(li);
//             });
//         }

//         // Toggle visibility
//         flightSection.style.display = (flightSection.style.display === 'none') ? 'block' : 'none';
//     });
// });


// // Intersection Observer for animations
// const observerOptions = {
//     threshold: 0.1,
//     rootMargin: '0px 0px -50px 0px'
// };

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
//         }
//     });
// }, observerOptions);

// // Observe elements for animation
// document.addEventListener('DOMContentLoaded', () => {
//     setTimeout(() => {
//         document.querySelectorAll('.stat-card, .flights-table tr').forEach(el => {
//             observer.observe(el);
//         });
//     }, 100);
// });

// Application State
let currentUser = null;
let flights = [
    {
        id: 1,
        flightNumber: 'PK101',
        aircraft: 'PIA Boeing 777',
        origin: 'Karachi',
        destination: 'Islamabad',
        date: '2025-08-01',
        time: '08:30',
        duration: 2.0,
        seats: 45,
        price: 15000,
        status: 'available'
    },
    {
        id: 2,
        flightNumber: 'PK202',
        aircraft: 'Airblue Airbus A320',
        origin: 'Lahore',
        destination: 'Karachi',
        date: '2025-08-02',
        time: '14:15',
        duration: 2.0,
        seats: 12,
        price: 13500,
        status: 'available'
    },
    {
        id: 3,
        flightNumber: 'PK303',
        aircraft: 'Serene Air Boeing 737',
        origin: 'Sialkot',
        destination: 'Lahore',
        date: '2025-08-03',
        time: '10:45',
        duration: 1.0,
        seats: 0,
        price: 9500,
        status: 'full'
    },
    {
        id: 4,
        flightNumber: 'PK404',
        aircraft: 'Fly Jinnah Airbus A320',
        origin: 'Multan',
        destination: 'Islamabad',
        date: '2025-08-04',
        time: '16:20',
        duration: 1.5,
        seats: 28,
        price: 12000,
        status: 'available'
    },
    {
        id: 5,
        flightNumber: 'PK505',
        aircraft: 'PIA ATR 72',
        origin: 'Islamabad',
        destination: 'Sialkot',
        date: '2025-08-05',
        time: '12:00',
        duration: 1.2,
        seats: 67,
        price: 8000,
        status: 'available'
    }
];

let editingFlightId = null;

// Utility Functions
function formatTime(timeString) {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatPrice(price) {
    return `Rs. ${price.toLocaleString('en-PK')}`;
}

function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;
    
    alertContainer.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 300);
    }, 4000);
}

// Navigation Functions
function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    document.getElementById(viewId).classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`[data-view="${viewId.replace('View', '')}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    const titles = {
        homeView: 'Shaista Airways - Home',
        loginView: 'Shaista Airways - Login',
        registerView: 'Shaista Airways - Register',
        adminView: 'Shaista Airways - Admin Dashboard'
    };
    document.title = titles[viewId] || 'Shaista Airways';

    if (viewId === 'adminView') {
        renderAdminFlights();
        updateDashboardStats();
    }
}

function updateNavigation() {
    const navAuth = document.getElementById('navAuth');
    
    if (currentUser) {
        navAuth.innerHTML = `
            <div class="user-profile">
                <a href="#" class="nav-link" id="userProfileLink">${currentUser.firstName}</a>
                <div class="user-flights-dropdown" id="userFlightsDropdown">
                    <h3>Your Booked Flights</h3>
                    <ul id="userFlightsList"></ul>
                </div>
            </div>
            ${currentUser.role === 'admin' ? '<a href="#" class="nav-link" data-view="admin">Dashboard</a>' : ''}
            <a href="#" class="nav-link" onclick="logout()">Logout</a>
        `;
        
        // Reattach event listeners after updating DOM
        setupUserProfileDropdown();
    } else {
        navAuth.innerHTML = `
            <a href="#" class="nav-link" data-view="login">Login</a>
            <a href="#" class="nav-link register-btn" data-view="register">Register</a>
        `;
    }
    
    attachNavigationListeners();
}

function setupUserProfileDropdown() {
    const userProfileLink = document.getElementById('userProfileLink');
    const userFlightsDropdown = document.getElementById('userFlightsDropdown');
    
    if (userProfileLink && userFlightsDropdown) {
        userProfileLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (userFlightsDropdown.style.display === 'block') {
                userFlightsDropdown.style.display = 'none';
            } else {
                userFlightsDropdown.style.display = 'block';
                loadUserBookedFlights();
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userFlightsDropdown.contains(e.target)) {
                userFlightsDropdown.style.display = 'none';
            }
        });
    }
}

function attachNavigationListeners() {
    document.querySelectorAll('[data-view]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = e.target.getAttribute('data-view');
            
            if (view === 'flights') {
                showView('homeView');
                setTimeout(() => {
                    document.getElementById('flightsSection').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 100);
                return;
            }
            
            if (view === 'admin' && (!currentUser || currentUser.role !== 'admin')) {
                showAlert('Access denied. Admin privileges required.', 'error');
                return;
            }
            showView(view + 'View');
        });
    });
}

// Authentication Functions
function login(email, password) {
    const adminUser = {
        id: 1,
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
    };

    const predefinedPassengers = [
        {
            id: 2,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'user123',
            role: 'user'
        },
        {
            id: 3,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            password: 'passenger123',
            role: 'user'
        }
    ];

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    let user = null;
    if (email === adminUser.email && password === adminUser.password) {
        user = adminUser;
    } else {
        user = predefinedPassengers.find(u => u.email === email && u.password === password);
        if (!user) {
            user = users.find(u => u.email === email && u.password === password && u.role === 'user');
        }
    }

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateNavigation();
        showView('homeView');
        showAlert(`Welcome back, ${user.firstName}!`, 'success');
        if (user.role === 'admin') {
            updateDashboardStats();
        }
    } else {
        showAlert('Invalid email or password', 'error');
    }
}

function register(userData) {
    if (userData.role !== 'user') {
        showAlert('Only passengers can register.', 'error');
        return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const predefinedEmails = ['admin@example.com', 'john@example.com', 'jane@example.com'];
    if (predefinedEmails.includes(userData.email)) {
        showAlert('This email is reserved and cannot be registered.', 'error');
        return;
    }
    if (users.find(u => u.email === userData.email)) {
        showAlert('Email already registered', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        ...userData
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    showAlert('Registration successful! Please login.', 'success');
    showView('loginView');
}

function logout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateNavigation();
        showView('homeView');
        showAlert('Logged out successfully', 'success');
    } else {
        showAlert('Logout cancelled', 'info');
    }
}

// Flight Functions
function renderFlights(flightsToRender = flights) {
    const tbody = document.getElementById('flightsTableBody');
    
    if (flightsToRender.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 3rem; color: #6b7280;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">✈️</div>
                    <h3>No flights found</h3>
                    <p>Try adjusting your search criteria</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = flightsToRender.map((flight, index) => `
        <tr style="animation-delay: ${index * 0.1}s">
            <td>
                <div class="flight-number">${flight.flightNumber}</div>
                <div style="font-size: 0.875rem; color: #6b7280;">${flight.aircraft}</div>
            </td>
            <td>
                <div class="route">
                    <span>${flight.origin}</span>
                    <span class="route-arrow">→</span>
                    <span>${flight.destination}</span>
                </div>
            </td>
            <td>
                <div>${formatDate(flight.date)}</div>
                <div style="font-size: 0.875rem; color: #6b7280;">${formatTime(flight.time)}</div>
            </td>
            <td>${flight.duration}h</td>
            <td>
                <div class="status-badge ${flight.seats > 0 ? 'available' : 'full'}">
                    ${flight.seats > 0 ? `${flight.seats} Available` : 'Full'}
                </div>
            </td>
            <td>
                <div class="price">${formatPrice(flight.price)}</div>
            </td>
            <td>
                ${flight.seats > 0 
                    ? `<button class="book-btn" onclick="bookFlight(${flight.id})">Book Now</button>`
                    : '<span style="color: #6b7280;">Unavailable</span>'
                }
            </td>
        </tr>
    `).join('');
}

function renderAdminFlights() {
    const tbody = document.getElementById('adminFlightsTableBody');
    
    tbody.innerHTML = flights.map((flight, index) => `
        <tr style="animation-delay: ${index * 0.1}s">
            <td>
                <div class="flight-number">${flight.flightNumber}</div>
                <div style="font-size: 0.875rem; color: #6b7280;">${flight.aircraft}</div>
            </td>
            <td>
                <div class="route">
                    <span>${flight.origin}</span>
                    <span class="route-arrow">→</span>
                    <span>${flight.destination}</span>
                </div>
            </td>
            <td>
                <div>${formatDate(flight.date)}</div>
                <div style="font-size: 0.875rem; color: #6b7280;">${formatTime(flight.time)}</div>
            </td>
            <td>${flight.seats}</td>
            <td>${formatPrice(flight.price)}</td>
            <td>
                <div class="status-badge ${flight.seats > 0 ? 'available' : 'full'}">
                    ${flight.seats > 0 ? 'Available' : 'Full'}
                </div>
            </td>
            <td>
                <button class="action-btn edit-btn" onclick="editFlight(${flight.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="confirmDeleteFlight(${flight.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function searchFlights() {
    const origin = document.getElementById('searchOrigin').value.trim();
    const destination = document.getElementById('searchDestination').value.trim();
    const date = document.getElementById('searchDate').value.trim();

    if (!origin || !destination || !date) {
        showAlert('Please select Origin, Destination and Date before searching.', 'error');
        return;
    }
    if (origin === destination) {
        showAlert('Origin and Destination cannot be the same', 'error');
        return;
    }
    if (new Date(date) < new Date()) {
        showAlert('Cannot search for past flights', 'error');
        return;
    }

    let filteredFlights = flights.filter(flight => 
        flight.origin === origin && 
        flight.destination === destination && 
        flight.date === date
    );

    renderFlights(filteredFlights);

    if (filteredFlights.length > 0) {
        showAlert(`Found ${filteredFlights.length} flight(s)`, 'success');
    } else {
        showAlert('No flights found matching your criteria', 'warning');
    }
}

function bookFlight(flightId) {
    if (!currentUser) {
        showAlert('Please login to book flights', 'warning');
        showView('loginView');
        return;
    }
    
    const flight = flights.find(f => f.id === flightId);
    if (flight && flight.seats > 0) {
        const booking = {
            user: currentUser.email,
            flightNumber: flight.flightNumber,
            origin: flight.origin,
            destination: flight.destination,
            date: flight.date,
            time: flight.time,
            price: flight.price,
            bookedAt: new Date().toISOString()
        };
        
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        flight.seats--;
        if (flight.seats === 0) {
            flight.status = 'full';
        }
        
        renderFlights();
        if (currentUser.role === 'admin') {
            renderAdminFlights();
            updateDashboardStats();
        }
        
        showAlert(`Flight ${flight.flightNumber} booked successfully!`, 'success');
    } else {
        showAlert('Flight is no longer available', 'error');
    }
}

// User Profile Functions
function loadUserBookedFlights() {
    const userFlightsList = document.getElementById('userFlightsList');
    if (!userFlightsList) return;
    
    userFlightsList.innerHTML = '<li>Loading your flights...</li>';
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        userFlightsList.innerHTML = '<li>Please login to view your flights.</li>';
        return;
    }
    
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const userBookings = bookings.filter(booking => booking.user === currentUser.email);
    
    if (userBookings.length === 0) {
        userFlightsList.innerHTML = '<li>No flights booked yet.</li>';
        return;
    }
    
    userFlightsList.innerHTML = '';
    
    userBookings.forEach(booking => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${booking.flightNumber}</strong><br>
            ${booking.origin} → ${booking.destination}<br>
            ${formatDate(booking.date)} at ${formatTime(booking.time)}<br>
            Price: ${formatPrice(booking.price)}
        `;
        userFlightsList.appendChild(li);
    });
}

// Admin Functions
function updateDashboardStats() {
    const totalFlights = flights.length;
    const totalSeats = flights.reduce((sum, flight) => sum + flight.seats, 0);
    const totalRevenue = flights.reduce((sum, flight) => sum + (flight.price * (100 - flight.seats)), 0);
    
    document.getElementById('totalFlights').textContent = totalFlights;
    document.getElementById('totalSeats').textContent = totalSeats;
    document.getElementById('totalRevenue').textContent = formatPrice(totalRevenue);
}

function showAddFlightModal() {
    document.getElementById('modalTitle').textContent = 'Add New Flight';
    document.getElementById('submitFlightBtn').textContent = 'Add Flight';
    document.getElementById('flightForm').reset();
    editingFlightId = null;
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('flightDate').min = today;
    
    document.getElementById('flightModal').classList.add('active');
}

function editFlight(flightId) {
    const flight = flights.find(f => f.id === flightId);
    if (!flight) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Flight';
    document.getElementById('submitFlightBtn').textContent = 'Update Flight';
    
    document.getElementById('flightNumber').value = flight.flightNumber;
    document.getElementById('aircraft').value = flight.aircraft;
    document.getElementById('origin').value = flight.origin;
    document.getElementById('destination').value = flight.destination;
    document.getElementById('flightDate').value = flight.date;
    document.getElementById('flightTime').value = flight.time;
    document.getElementById('duration').value = flight.duration;
    document.getElementById('seats').value = flight.seats;
    document.getElementById('price').value = flight.price;
    
    editingFlightId = flightId;
    document.getElementById('flightModal').classList.add('active');
}

function confirmDeleteFlight(flightId) {
    const flight = flights.find(f => f.id === flightId);
    if (!flight) return;
    
    document.getElementById('confirmationTitle').textContent = 'Delete Flight';
    document.getElementById('confirmationMessage').textContent = 
        `Are you sure you want to delete flight ${flight.flightNumber}? This action cannot be undone.`;
    
    document.getElementById('confirmActionBtn').onclick = () => {
        deleteFlight(flightId);
        closeConfirmationModal();
    };
    
    document.getElementById('confirmationModal').classList.add('active');
}

function deleteFlight(flightId) {
    const flightIndex = flights.findIndex(f => f.id === flightId);
    if (flightIndex !== -1) {
        const flight = flights[flightIndex];
        flights.splice(flightIndex, 1);
        
        renderFlights();
        renderAdminFlights();
        updateDashboardStats();
        
        showAlert(`Flight ${flight.flightNumber} deleted successfully`, 'success');
    }
}

function closeFlightModal() {
    document.getElementById('flightModal').classList.remove('active');
    editingFlightId = null;
}

function closeConfirmationModal() {
    document.getElementById('confirmationModal').classList.remove('active');
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered');
      });
  });
}
// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved user
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateNavigation();
    } else {
        updateNavigation();
    }
    
    // Initialize flights display
    renderFlights();
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Navigation links
    attachNavigationListeners();
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        login(email, password);
    });
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const userData = {
            firstName: document.getElementById('registerFirstName').value,
            lastName: document.getElementById('registerLastName').value,
            email: document.getElementById('registerEmail').value,
            password: document.getElementById('registerPassword').value,
            role: 'user'
        };
        register(userData);
    });
    
    // Flight form
    document.getElementById('flightForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const flightData = {
            flightNumber: document.getElementById('flightNumber').value,
            aircraft: document.getElementById('aircraft').value,
            origin: document.getElementById('origin').value,
            destination: document.getElementById('destination').value,
            date: document.getElementById('flightDate').value,
            time: document.getElementById('flightTime').value,
            duration: parseFloat(document.getElementById('duration').value),
            seats: parseInt(document.getElementById('seats').value),
            price: parseFloat(document.getElementById('price').value),
            status: 'available'
        };
        
        if (flightData.origin === flightData.destination) {
            showAlert('Origin and destination cannot be the same', 'error');
            return;
        }
        
        if (editingFlightId) {
            const flightIndex = flights.findIndex(f => f.id === editingFlightId);
            if (flightIndex !== -1) {
                flights[flightIndex] = { ...flights[flightIndex], ...flightData };
                showAlert('Flight updated successfully', 'success');
            }
        } else {
            const newFlight = {
                id: Date.now(),
                ...flightData
            };
            flights.push(newFlight);
            showAlert('Flight added successfully', 'success');
        }
        
        renderFlights();
        renderAdminFlights();
        updateDashboardStats();
        closeFlightModal();
    });
    
    // Modal close on outside click
    document.getElementById('flightModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeFlightModal();
        }
    });
    
    document.getElementById('confirmationModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeConfirmationModal();
        }
    });
    
    // Set minimum date for search
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('searchDate').min = today;
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add demo users for testing
    if (!localStorage.getItem('users')) {
        const demoUsers = [
            {
                id: 1,
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin'
            },
            {
                id: 2,
                firstName: 'Ijaz',
                lastName: 'Hussain',
                email: 'ijaz@gmail.com',
                password: 'ijaz123',
                role: 'passenger'
            }
        ];
        localStorage.setItem('users', JSON.stringify(demoUsers));
    }
});

// Add CSS animation classes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to { 
            transform: translateX(400px); 
            opacity: 0;
        }
    }
    
    .role-badge {
        background: var(--primary-blue) !important;
        color: var(--white) !important;
        padding: 0.25rem 0.75rem !important;
        border-radius: 15px !important;
        font-size: 0.75rem !important;
        font-weight: 600 !important;
    }
    
    .user-profile {
        position: relative;
        display: inline-block;
    }
    
    .user-flights-dropdown {
        display: none;
        position: absolute;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 15px;
        width: 300px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        margin-top: 5px;
    }
    
    .user-flights-dropdown h3 {
        margin-top: 0;
        font-size: 16px;
        color: #333;
    }
    
    #userFlightsList {
        list-style: none;
        padding: 0;
        margin: 10px 0 0 0;
        max-height: 300px;
        overflow-y: auto;
    }
    
    #userFlightsList li {
        padding: 8px 0;
        border-bottom: 1px solid #eee;
    }
    
    #userFlightsList li:last-child {
        border-bottom: none;
    }
`;
document.head.appendChild(style);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeFlightModal();
        closeConfirmationModal();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchOrigin').focus();
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.stat-card, .flights-table tr').forEach(el => {
            observer.observe(el);
        });
    }, 100);
});

