// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
});

// Modal Management
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const plansModal = document.getElementById('plansModal');
const dashboard = document.getElementById('dashboard');
const closeButtons = document.querySelectorAll('.close');

function showModal(modal) {
    modal.style.display = 'block';
}

function hideModal(modal) {
    modal.style.display = 'none';
}

loginBtn.addEventListener('click', () => showModal(loginModal));
signupBtn.addEventListener('click', () => showModal(signupModal));

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        hideModal(button.closest('.modal'));
    });
});

// Login Form Handler
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideModal(loginModal);
    showModal(plansModal);
});

// Signup Form Handler
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideModal(signupModal);
    showModal(plansModal);
});

// Plan Selection
const planButtons = document.querySelectorAll('.select-plan');
planButtons.forEach(button => {
    button.addEventListener('click', () => {
        hideModal(plansModal);
        showDashboard();
    });
});

function showDashboard() {
    document.querySelector('main').style.display = 'none';
    dashboard.style.display = 'block';
    initializeDashboard();
}

// Dashboard Charts and Data
function initializeDashboard() {
    // Storage Chart
    const storageCtx = document.getElementById('storageChart').getContext('2d');
    new Chart(storageCtx, {
        type: 'doughnut',
        data: {
            labels: ['Used', 'Available'],
            datasets: [{
                data: [65, 35],
                backgroundColor: [
                    'rgba(74, 144, 226, 0.8)',
                    'rgba(200, 200, 200, 0.8)'
                ]
            }]
        },
        options: {
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Speed Chart
    const speedCtx = document.getElementById('speedChart').getContext('2d');
    new Chart(speedCtx, {
        type: 'line',
        data: {
            labels: ['0s', '5s', '10s', '15s', '20s'],
            datasets: [{
                label: 'Network Speed',
                data: [75, 82, 78, 85, 75],
                borderColor: 'rgba(74, 144, 226, 0.8)',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(74, 144, 226, 0.2)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Speed (Mbps)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Update speed value periodically
    setInterval(() => {
        const speedValue = Math.floor(70 + Math.random() * 20);
        document.querySelector('.current-speed .value').textContent = speedValue;
    }, 2000);

    // Populate Nearby Networks
    const networks = [
        { name: 'Jio', strength: 90, secure: true },
        { name: 'Airtel', strength: 75, secure: true },
        { name: 'VI', strength: 60, secure: false }
    ];

    const networksList = document.querySelector('.networks-list');
    networksList.innerHTML = ''; // Clear existing items
    networks.forEach(network => {
        const networkItem = document.createElement('div');
        networkItem.className = 'network-item';
        networkItem.innerHTML = `
            <span>${network.name}</span>
            <span>${network.strength}% ${network.secure ? '🔒' : '🔓'}</span>
        `;
        networksList.appendChild(networkItem);
    });

    // Populate Alerts
    const alerts = [
        { type: 'success', message: 'Network storage optimized' },
        { type: 'warning', message: 'Storage space running low' },
        { type: 'error', message: 'Connection lost with Network_2' }
    ];

    const alertsList = document.querySelector('.alerts-list');
    alertsList.innerHTML = ''; // Clear existing alerts
    alerts.forEach(alert => {
        const alertItem = document.createElement('div');
        alertItem.className = `alert-item ${alert.type}`;
        alertItem.innerHTML = `
            <i class="fas fa-${alert.type === 'success' ? 'check-circle' : 
                            alert.type === 'warning' ? 'exclamation-triangle' : 
                            'times-circle'}"></i>
            <span>${alert.message}</span>
        `;
        alertsList.appendChild(alertItem);
    });
}

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    dashboard.style.display = 'none';
    document.querySelector('main').style.display = 'block';
});