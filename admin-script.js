// Admin Dashboard JavaScript

const ADMIN_DATA_KEY = 'mercyCityAdminData';

// Mock data for demonstration
const mockData = {
    pledges: [
        { id: 1, name: 'Mary Johnson', email: 'mary@example.com', phone: '+263 77 123 4567', type: 'Building Fund', amount: 50000, date: '2024-01-15', status: 'active' },
        { id: 2, name: 'David Smith', email: 'david@example.com', phone: '+263 71 987 6543', type: 'Missions', amount: 25000, date: '2024-01-14', status: 'active' },
        { id: 3, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+263 73 456 7890', type: 'Facility Upgrade', amount: 75000, date: '2024-01-13', status: 'pending' },
        { id: 4, name: 'John Brown', email: 'john@example.com', phone: '+263 77 321 0987', type: 'General Fund', amount: 15000, date: '2024-01-12', status: 'completed' },
        { id: 5, name: 'Grace Lee', email: 'grace@example.com', phone: '+263 71 654 3210', type: 'Building Fund', amount: 100000, date: '2024-01-11', status: 'active' }
    ],
    offerings: [
        { id: 1, name: 'Mary Johnson', email: 'mary@example.com', phone: '+263 77 123 4567', amount: 25000, method: 'Bank Transfer', date: '2024-01-15', receipt: true },
        { id: 2, name: 'David Smith', email: 'david@example.com', phone: '+263 71 987 6543', amount: 15000, method: 'Mobile Banking', date: '2024-01-14', receipt: true },
        { id: 3, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+263 73 456 7890', amount: 30000, method: 'Cash', date: '2024-01-13', receipt: false },
        { id: 4, name: 'John Brown', email: 'john@example.com', phone: '+263 77 321 0987', amount: 20000, method: 'Bank Transfer', date: '2024-01-12', receipt: true },
        { id: 5, name: 'Grace Lee', email: 'grace@example.com', phone: '+263 71 654 3210', amount: 35000, method: 'Mobile Banking', date: '2024-01-11', receipt: true }
    ],
    tithes: [
        { id: 1, name: 'Samuel Munemo', email: 'samuel@example.com', phone: '+263 77 234 5678', amount: 18000, status: 'paid', dueDate: '2024-01-10', datePaid: '2024-01-10' },
        { id: 2, name: 'Lydia Ncube', email: 'lydia@example.com', phone: '+263 71 654 7890', amount: 22000, status: 'pending', dueDate: '2024-02-05', datePaid: '' },
        { id: 3, name: 'Peter Chiremba', email: 'peter@example.com', phone: '+263 78 987 6543', amount: 15000, status: 'paid', dueDate: '2024-01-08', datePaid: '2024-01-08' }
    ],
    users: [
        { id: 1, name: 'Mary Johnson', email: 'mary@example.com', phone: '+263 77 123 4567', role: 'member', joined: '2023-06-15', status: 'active' },
        { id: 2, name: 'David Smith', email: 'david@example.com', phone: '+263 71 987 6543', role: 'member', joined: '2023-08-22', status: 'active' },
        { id: 3, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+263 73 456 7890', role: 'visitor', joined: '2024-01-10', status: 'active' },
        { id: 4, name: 'Pastor John Doe', email: 'pastor@example.com', phone: '+263 77 000 0000', role: 'admin', joined: '2020-01-01', status: 'active' },
        { id: 5, name: 'Grace Lee', email: 'grace@example.com', phone: '+263 71 654 3210', role: 'member', joined: '2023-12-05', status: 'active' }
    ],
    notifications: [
        { id: 1, subject: 'Sunday Service Reminder', message: 'Don\'t forget our main service this Sunday at 9:00 AM', type: 'announcement', channel: 'both', recipients: 'all', date: '2024-01-15', sent: 247 },
        { id: 2, subject: 'Building Fund Update', message: 'Thank you for your generous pledges towards our new sanctuary', type: 'pledge', channel: 'email', recipients: 'pledgers', date: '2024-01-14', sent: 89 },
        { id: 3, subject: 'Prayer Meeting Tonight', message: 'Join us for intercessory prayer at 7:00 PM', type: 'event', channel: 'whatsapp', recipients: 'active', date: '2024-01-13', sent: 156 }
    ]
};

function loadSavedAdminData() {
    const saved = localStorage.getItem(ADMIN_DATA_KEY);
    if (!saved) return;
    try {
        const parsed = JSON.parse(saved);
        if (parsed.pledges) mockData.pledges = parsed.pledges;
        if (parsed.offerings) mockData.offerings = parsed.offerings;
        if (parsed.tithes) mockData.tithes = parsed.tithes;
        if (parsed.users) mockData.users = parsed.users;
        if (parsed.notifications) mockData.notifications = parsed.notifications;
    } catch (error) {
        localStorage.removeItem(ADMIN_DATA_KEY);
    }
}

function saveAdminData() {
    localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(mockData));
}

loadSavedAdminData();

// Currency conversion rates (approximate as of May 2026)
const CURRENCY_RATES = {
    'ZWL': 1,
    'USD': 0.0032,
    'ZWG': 0.15,
    'ZAR': 0.062
};

function convertCurrency(amount, fromCurrency = 'ZWL', toCurrency = 'USD') {
    if (fromCurrency === toCurrency) return amount;
    const inUSD = amount * CURRENCY_RATES[fromCurrency];
    return Math.round(inUSD / CURRENCY_RATES[toCurrency] * 100) / 100;
}

function formatCurrency(amount, currency = 'ZWL') {
    const symbols = { 'ZWL': 'ZWL', 'USD': 'USD', 'ZWG': 'ZWG', 'ZAR': 'R' };
    return symbols[currency] + ' ' + amount.toLocaleString();
}

// Current user session
let currentUser = null;
let givingChart = null;
let compareChart = null;
let memberGrowthChart = null;
let fullChartInstance = null;

// Admin notification configuration
const adminNotificationEmails = ['bryantamudaishe@gmail.com'];

const authorizedRoles = ['admin', 'financial_director', 'media_team', 'secretary', 'projects_admin', 'member'];

// Role-based access control
const rolePermissions = {
    admin: {
        canViewPledges: true,
        canViewOfferings: true,
        canViewTithes: true,
        canViewUsers: true,
        canEditAnnouncements: true,
        canPublishSermons: true,
        canManageTeam: true,
        canViewReports: true,
        canAccessSettings: true
    },
    financial_director: {
        canViewPledges: false,
        canViewOfferings: true,
        canViewTithes: true,
        canViewUsers: false,
        canEditAnnouncements: false,
        canPublishSermons: false,
        canManageTeam: false,
        canViewReports: true,
        canAccessSettings: false
    },
    media_team: {
        canViewPledges: false,
        canViewOfferings: false,
        canViewTithes: false,
        canViewUsers: false,
        canEditAnnouncements: false,
        canPublishSermons: true,
        canManageTeam: false,
        canViewReports: false,
        canAccessSettings: false
    },
    secretary: {
        canViewPledges: false,
        canViewOfferings: false,
        canViewTithes: false,
        canViewUsers: false,
        canEditAnnouncements: true,
        canPublishSermons: false,
        canManageTeam: false,
        canViewReports: false,
        canAccessSettings: false
    },
    projects_admin: {
        canViewPledges: true,
        canViewOfferings: false,
        canViewTithes: false,
        canViewUsers: false,
        canEditAnnouncements: false,
        canPublishSermons: false,
        canManageTeam: false,
        canViewReports: true,
        canAccessSettings: false
    },
    member: {
        canViewPledges: false,
        canViewOfferings: false,
        canViewTithes: false,
        canViewUsers: false,
        canEditAnnouncements: true,
        canPublishSermons: false,
        canManageTeam: false,
        canViewReports: false,
        canAccessSettings: false
    }
};

function getAllowedPages(role) {
    const pageMap = {
        admin: ['dashboard', 'pledges', 'offerings', 'tithes', 'users', 'notifications', 'prayRequests', 'events', 'ministries', 'reports', 'settings'],
        financial_director: ['dashboard', 'offerings', 'tithes', 'reports'],
        media_team: ['dashboard', 'notifications'],
        secretary: ['notifications'],
        projects_admin: ['dashboard', 'pledges', 'reports'],
        member: ['notifications']
    };
    return pageMap[role] || ['dashboard'];
}

function getLandingPage(role) {
    const allowedPages = getAllowedPages(role);
    return allowedPages.includes('dashboard') ? 'dashboard' : allowedPages[0];
}

function redirectToLogin() {
    localStorage.removeItem('adminSession');
    window.location.href = 'login.html';
}

function getAdminSession() {
    const session = localStorage.getItem('adminSession');
    if (!session) return null;

    try {
        const sessionData = JSON.parse(session);
        const now = new Date();
        const expiresAt = new Date(sessionData.expiresAt);

        if (now >= expiresAt) {
            localStorage.removeItem('adminSession');
            return null;
        }

        if (!sessionData.isProjectTeam || !authorizedRoles.includes(sessionData.role)) {
            localStorage.removeItem('adminSession');
            return null;
        }

        return sessionData;
    } catch (error) {
        localStorage.removeItem('adminSession');
        return null;
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const sessionData = getAdminSession();
    if (!sessionData) {
        alert('You must be signed in as a registered projects team member to access the admin dashboard.');
        return redirectToLogin();
    }

    currentUser = sessionData;
    initializeDashboard();
    setupNavigation();
    setupEventListeners();
    setupModuleCardHandlers();
    loadCharts();
});

function initializeDashboard() {
    // Update user info in header
    document.querySelector('.admin-user-name').textContent = currentUser.name;
    const roleDisplay = currentUser.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    document.querySelector('.admin-user-role').textContent = roleDisplay;

    const heroGreeting = document.getElementById('heroGreeting');
    if (heroGreeting) heroGreeting.textContent = currentUser.name;

    const todayDate = document.getElementById('todayDate');
    if (todayDate) {
        todayDate.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    // Apply role-based navigation and page visibility
    applyRoleBasedAccess(currentUser.role);

    // Load initial data based on role
    if (rolePermissions[currentUser.role].canViewPledges) loadPledgesTable();
    if (rolePermissions[currentUser.role].canViewOfferings) loadOfferingsTable();
    if (rolePermissions[currentUser.role].canViewTithes) loadTithesTable();
    if (rolePermissions[currentUser.role].canViewUsers) loadUsersTable();
    if (rolePermissions[currentUser.role].canEditAnnouncements || rolePermissions[currentUser.role].canPublishSermons || currentUser.role === 'admin') loadNotifications();
    updateStats();
    loadCharts();
    if (currentUser.role === 'admin') {
        checkPledgeNeeds();
    }

    const landingPage = getLandingPage(currentUser.role);
    if (landingPage && landingPage !== 'dashboard') {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        const navItem = document.querySelector(`[data-page="${landingPage}"]`);
        if (navItem) navItem.classList.add('active');

        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        const landingPageElement = document.getElementById(`${landingPage}-page`);
        if (landingPageElement) {
            landingPageElement.style.display = 'block';
            landingPageElement.classList.add('active');
        }
    }
}

function applyRoleBasedAccess(role) {
    const allowedPages = getAllowedPages(role);
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const moduleCards = document.querySelectorAll('.module-card');

    // Hide or show navigation items depending on allowed pages
    navItems.forEach(item => {
        const pageId = item.getAttribute('data-page');
        if (allowedPages.includes(pageId)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
            item.classList.remove('active');
        }
    });

    // Hide or show page sections
    pages.forEach(page => {
        const pageId = page.id.replace('-page', '');
        if (allowedPages.includes(pageId)) {
            page.style.display = '';
        } else {
            page.style.display = 'none';
            page.classList.remove('active');
        }
    });

    // Hide module cards on home page by allowed modules
    moduleCards.forEach(card => {
        const moduleId = card.id.replace('-module', '');
        if (allowedPages.includes(moduleId)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });

    // Ensure settings card is hidden for non-admins unless explicitly allowed
    if (!allowedPages.includes('settings')) {
        document.querySelectorAll('#settings-module').forEach(card => card.style.display = 'none');
    }
}

function checkPledgeNeeds() {
    // Check for pledges that need attention (e.g., building fund pledges that are due)
    const buildingFundPledges = mockData.pledges.filter(p => p.type === 'Building Fund' && p.status === 'active');
    const totalBuildingPledges = buildingFundPledges.reduce((sum, p) => sum + p.amount, 0);
    
    // If building fund pledges exceed a threshold, send notification
    if (totalBuildingPledges > 500000) { // Example threshold
        const pledgeNeedNotification = {
            id: mockData.notifications.length + 1,
            subject: 'Building Fund Pledge Goal Reached!',
            message: `Great news! Building fund pledges have reached ZWL ${totalBuildingPledges.toLocaleString()}. This is a significant milestone for our sanctuary project.`,
            type: 'pledge',
            channel: 'email',
            recipients: 'admin',
            date: new Date().toISOString().split('T')[0],
            sent: 1
        };
        
        // Check if this notification already exists
        const existingNotification = mockData.notifications.find(n => 
            n.subject === pledgeNeedNotification.subject && 
            n.date === pledgeNeedNotification.date
        );
        
        if (!existingNotification) {
            mockData.notifications.unshift(pledgeNeedNotification);
            
            // Send to admin emails
            console.log(`Sending pledge need notification to admin: ${adminNotificationEmails.join(', ')}`);
            alert(`Pledge Need Alert: ${pledgeNeedNotification.subject}\n\n${pledgeNeedNotification.message}`);
        }
    }
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');

            // Check if module requires special access
            const modulesRequiringLogin = ['pledges', 'offerings', 'tithes', 'reports', 'notifications', 'settings'];
            
            if (modulesRequiringLogin.includes(pageId)) {
                // Check if user has permission for this module
                if (!checkModuleAccess(pageId)) {
                    openModuleAccessModal(pageId);
                    return;
                }
            }

            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Hide all pages
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));

            // Show selected page
            const pageElement = document.getElementById(pageId + '-page');
            if (pageElement) {
                pageElement.classList.add('active');
            }
        });
    });
}

function setupModuleCardHandlers() {
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const moduleId = this.id.replace('-module', '');
            navigateToModule(moduleId);
        });
    });
}

function setupEventListeners() {
    // Setup close buttons for all module access modals
    const modals = [
        'pledgesAccessModal',
        'offeringsAccessModal',
        'thesAccessModal',
        'reportsAccessModal',
        'announcementsAccessModal',
        'settingsAccessModal'
    ];

    // Close modals when clicking the close button
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function(e) {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modals when clicking outside content
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Setup filter listeners
    const filters = [
        { id: 'pledge-filter', handler: loadPledgesTable },
        { id: 'pledge-search', handler: loadPledgesTable },
        { id: 'offering-filter', handler: loadOfferingsTable },
        { id: 'offering-search', handler: loadOfferingsTable },
        { id: 'tithes-filter', handler: loadTithesTable },
        { id: 'tithes-search', handler: loadTithesTable },
        { id: 'user-role-filter', handler: loadUsersTable },
        { id: 'user-search', handler: loadUsersTable }
    ];

    filters.forEach(filter => {
        const element = document.getElementById(filter.id);
        if (element) {
            if (filter.id.includes('filter')) {
                element.addEventListener('change', filter.handler);
            } else {
                element.addEventListener('input', filter.handler);
            }
        }
    });
}

function updateStats() {
    // Calculate stats from mock data
    const totalPledges = mockData.pledges.reduce((sum, pledge) => sum + pledge.amount, 0);
    const totalOfferings = mockData.offerings.reduce((sum, offering) => sum + offering.amount, 0);
    const totalTithes = mockData.tithes.reduce((sum, tithe) => sum + tithe.amount, 0);
    const activeMembers = mockData.users.filter(user => user.status === 'active').length;
    const notificationsSent = mockData.notifications.reduce((sum, notif) => sum + notif.sent, 0);

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    // ZWL values
    setText('total-pledges', formatCurrency(totalPledges, 'ZWL'));
    setText('total-offerings', formatCurrency(totalOfferings, 'ZWL'));
    setText('total-tithes', formatCurrency(totalTithes, 'ZWL'));

    // Currency conversions
    setText('pledges-usd', formatCurrency(convertCurrency(totalPledges, 'ZWL', 'USD'), 'USD'));
    setText('pledges-zwg', formatCurrency(convertCurrency(totalPledges, 'ZWL', 'ZWG'), 'ZWG'));
    setText('pledges-rands', formatCurrency(convertCurrency(totalPledges, 'ZWL', 'ZAR'), 'ZAR'));

    setText('offerings-usd', formatCurrency(convertCurrency(totalOfferings, 'ZWL', 'USD'), 'USD'));
    setText('offerings-zwg', formatCurrency(convertCurrency(totalOfferings, 'ZWL', 'ZWG'), 'ZWG'));
    setText('offerings-rands', formatCurrency(convertCurrency(totalOfferings, 'ZWL', 'ZAR'), 'ZAR'));

    setText('tithes-usd', formatCurrency(convertCurrency(totalTithes, 'ZWL', 'USD'), 'USD'));
    setText('tithes-zwg', formatCurrency(convertCurrency(totalTithes, 'ZWL', 'ZWG'), 'ZWG'));
    setText('tithes-rands', formatCurrency(convertCurrency(totalTithes, 'ZWL', 'ZAR'), 'ZAR'));

    setText('active-members', activeMembers);
    setText('notifications-sent', notificationsSent);

    // Update pledge statistics
    updatePledgeStatistics();
    updatePledgeNeeds();
}

function updatePledgeStatistics() {
    const totalPledges = mockData.pledges.length;
    const fulfilledPledges = mockData.pledges.filter(p => p.status === 'completed').length;
    const pendingPledges = mockData.pledges.filter(p => p.status !== 'completed').length;
    const fulfillmentRate = totalPledges > 0 ? Math.round((fulfilledPledges / totalPledges) * 100) : 0;

    // Dashboard section
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    setText('total-pledges-count', totalPledges);
    setText('fulfilled-pledges-count', fulfilledPledges);
    setText('pending-pledges-count', pendingPledges);
    setText('fulfillment-rate', fulfillmentRate + '%');

    // Pledges page section
    setText('page-total-pledges-count', totalPledges);
    setText('page-fulfilled-pledges-count', fulfilledPledges);
    setText('page-pending-pledges-count', pendingPledges);
    setText('page-fulfillment-rate', fulfillmentRate + '%');
}

function updatePledgeNeeds() {
    const pledgeNeeds = [
        { name: 'Building Fund', target: 500000, icon: '🏗️' },
        { name: 'Equipment & Sound System', target: 150000, icon: '🎙️' },
        { name: 'Outreach & Missions', target: 100000, icon: '✝️' }
    ];

    const totalPledged = mockData.pledges.reduce((sum, p) => sum + p.amount, 0);
    const completedPledges = mockData.pledges.filter(p => p.status === 'completed').length;
    const fulfilledAmount = completedPledges > 0 ? (totalPledged / mockData.pledges.length) * completedPledges : 0;

    const needsList = document.getElementById('pledgeNeedsList');
    if (!needsList) return;

    needsList.innerHTML = pledgeNeeds.map(need => {
        const progress = Math.min((fulfilledAmount / need.target) * 100, 100);
        return `
            <div class="pledge-need-item">
                <h5>${need.icon} ${need.name}</h5>
                <div class="need-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span class="progress-text">${Math.round(progress)}%</span>
                </div>
                <small>Target: ${formatCurrency(need.target, 'ZWL')}</small>
            </div>
        `;
    }).join('');
}


function loadPledgesTable() {
    const filter = document.getElementById('pledge-filter').value;
    const search = document.getElementById('pledge-search').value.toLowerCase();

    let filteredPledges = mockData.pledges;

    if (filter !== 'all') {
        const filterMap = {
            'building': 'Building Fund',
            'missions': 'Missions',
            'facility': 'Facility Upgrade',
            'general': 'General Fund'
        };
        filteredPledges = filteredPledges.filter(pledge => pledge.type === filterMap[filter]);
    }

    if (search) {
        filteredPledges = filteredPledges.filter(pledge =>
            pledge.name.toLowerCase().includes(search) ||
            pledge.email.toLowerCase().includes(search)
        );
    }

    const tbody = document.querySelector('#pledges-table tbody');
    tbody.innerHTML = '';

    filteredPledges.forEach(pledge => {
        const row = document.createElement('tr');
        const isFulfilled = pledge.status === 'completed';
        const statusBadge = isFulfilled 
            ? '<span class="pledge-status-badge fulfilled"><i class="fas fa-check"></i> Pledged</span>' 
            : '<span class="pledge-status-badge pending"><i class="fas fa-hourglass-half"></i> Pending</span>';
        
        const usdAmount = convertCurrency(pledge.amount, 'ZWL', 'USD');
        const zwgAmount = convertCurrency(pledge.amount, 'ZWL', 'ZWG');
        const zarAmount = convertCurrency(pledge.amount, 'ZWL', 'ZAR');

        row.innerHTML = `
            <td>${statusBadge}</td>
            <td>${pledge.name}</td>
            <td>${pledge.email}</td>
            <td>${pledge.phone}</td>
            <td>${pledge.type}</td>
            <td>${formatCurrency(pledge.amount, 'ZWL')}</td>
            <td>
                <small>${formatCurrency(usdAmount, 'USD')} / ${formatCurrency(zwgAmount, 'ZWG')} / ${formatCurrency(zarAmount, 'ZAR')}</small>
            </td>
            <td>${formatDate(pledge.date)}</td>
            <td>
                <button class="pledged-btn ${isFulfilled ? 'fulfilled' : ''}" onclick="togglePledgeFulfilled(${pledge.id})">
                    ${isFulfilled ? '✓ Pledged' : 'Mark Pledged'}
                </button>
            </td>
            <td>
                <button class="btn-action" onclick="viewPledge(${pledge.id})">View</button>
                <button class="btn-action danger" onclick="deletePledge(${pledge.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function togglePledgeFulfilled(id) {
    const pledge = mockData.pledges.find(p => p.id === id);
    if (pledge) {
        pledge.status = pledge.status === 'completed' ? 'active' : 'completed';
        saveAdminData();
        loadPledgesTable();
        updateStats();
        const message = pledge.status === 'completed' ? 'Pledge marked as fulfilled!' : 'Pledge status updated.';
        showAdminSuccessMessage('Status Updated', message);
    }
}

function loadTithesTable() {
    const filter = document.getElementById('tithes-filter').value;
    const search = document.getElementById('tithes-search').value.toLowerCase();

    let filteredTithes = mockData.tithes;

    if (filter !== 'all') {
        filteredTithes = filteredTithes.filter(tithe => tithe.status === filter);
    }

    if (search) {
        filteredTithes = filteredTithes.filter(tithe =>
            tithe.name.toLowerCase().includes(search) ||
            tithe.email.toLowerCase().includes(search)
        );
    }

    const tbody = document.querySelector('#tithes-table tbody');
    tbody.innerHTML = '';

    filteredTithes.forEach(tithe => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tithe.name}</td>
            <td>${tithe.email}</td>
            <td>${tithe.phone}</td>
            <td>ZWL ${tithe.amount.toLocaleString()}</td>
            <td><span class="status-badge ${tithe.status}">${tithe.status.charAt(0).toUpperCase() + tithe.status.slice(1)}</span></td>
            <td>${tithe.dueDate || '-'}</td>
            <td>${tithe.datePaid || '-'}</td>
            <td>
                <button class="btn-action" onclick="viewTithe(${tithe.id})">View</button>
                <button class="btn-action danger" onclick="deleteTithe(${tithe.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadOfferingsTable() {
    const filter = document.getElementById('offering-filter').value;
    const search = document.getElementById('offering-search').value.toLowerCase();

    let filteredOfferings = mockData.offerings;

    if (filter !== 'all') {
        filteredOfferings = filteredOfferings.filter(offering => offering.method.toLowerCase().replace(' ', '') === filter);
    }

    if (search) {
        filteredOfferings = filteredOfferings.filter(offering =>
            offering.name.toLowerCase().includes(search) ||
            offering.email.toLowerCase().includes(search)
        );
    }

    const tbody = document.querySelector('#offerings-table tbody');
    tbody.innerHTML = '';

    filteredOfferings.forEach(offering => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${offering.name}</td>
            <td>${offering.email}</td>
            <td>${offering.phone}</td>
            <td>ZWL ${offering.amount.toLocaleString()}</td>
            <td>${offering.method}</td>
            <td>${formatDate(offering.date)}</td>
            <td>${offering.receipt ? '<i class="fas fa-check text-success"></i>' : '<button class="btn-action" onclick="sendReceipt(' + offering.id + ')">Send</button>'}</td>
            <td>
                <button class="btn-action" onclick="viewOffering(${offering.id})">View</button>
                <button class="btn-action danger" onclick="deleteOffering(${offering.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadUsersTable() {
    const filter = document.getElementById('user-role-filter').value;
    const search = document.getElementById('user-search').value.toLowerCase();

    let filteredUsers = mockData.users;

    if (filter !== 'all') {
        filteredUsers = filteredUsers.filter(user => user.role === filter);
    }

    if (search) {
        filteredUsers = filteredUsers.filter(user =>
            user.name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search)
        );
    }

    const tbody = document.querySelector('#users-table tbody');
    tbody.innerHTML = '';

    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td><span class="status-badge ${user.role}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></td>
            <td>${formatDate(user.joined)}</td>
            <td><span class="status-badge ${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
            <td>
                <button class="btn-action" onclick="editUser(${user.id})">Edit</button>
                <button class="btn-action danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadNotifications() {
    const notificationList = document.querySelector('.notification-list');
    notificationList.innerHTML = '';

    mockData.notifications.forEach(notification => {
        const item = document.createElement('div');
        item.className = 'notification-item';
        item.innerHTML = `
            <h4>${notification.subject}</h4>
            <p>${notification.message}</p>
            <div class="notification-meta">
                <span>Type: ${notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}</span>
                <span>Sent: ${notification.sent} recipients</span>
                <span>${formatDate(notification.date)}</span>
            </div>
        `;
        notificationList.appendChild(item);
    });
}

function loadCharts() {
    // Giving Trends Chart
    const givingCtx = document.getElementById('givingChart').getContext('2d');
    givingChart = new Chart(givingCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Recurring Offerings',
                data: [680000, 710000, 760000, 820000, 900000, 950000, 1030000],
                borderColor: '#1a472a',
                backgroundColor: 'rgba(26, 71, 42, 0.18)',
                tension: 0.4
            }, {
                label: 'Project Giving',
                data: [420000, 490000, 520000, 610000, 700000, 740000, 820000],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.16)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'ZWL ' + (value / 1000) + 'k';
                        }
                    }
                }
            }
        }
    });

    // Tithes vs Pledges Comparison Chart
    const compareCanvas = document.getElementById('compareChart');
    if (compareCanvas) {
        const compareCtx = compareCanvas.getContext('2d');
        compareChart = new Chart(compareCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Tithes',
                    data: [350000, 370000, 390000, 420000, 460000, 480000, 520000],
                    backgroundColor: '#1a472a'
                }, {
                    label: 'Pledges',
                    data: [280000, 310000, 340000, 360000, 400000, 430000, 470000],
                    backgroundColor: '#d4af37'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'ZWL ' + (value / 1000) + 'k';
                            }
                        }
                    }
                }
            }
        });
    }

    // Trends Chart
    const trendsCtx = document.getElementById('trendsChart').getContext('2d');
    new Chart(trendsCtx, {
        type: 'bar',
        data: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
            datasets: [{
                label: 'Total Giving (ZWL)',
                data: [2090000, 2300000, 2050000, 2440000, 2730000, 2850000, 4340000],
                backgroundColor: '#1a472a',
                borderColor: '#1a472a',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'ZWL ' + (value / 1000000) + 'M';
                        }
                    }
                }
            }
        }
    });

    // Membership Chart
    const membershipCtx = document.getElementById('membershipChart').getContext('2d');
    new Chart(membershipCtx, {
        type: 'doughnut',
        data: {
            labels: ['Active Members', 'Visitors', 'Admins'],
            datasets: [{
                data: [1200, 47, 3],
                backgroundColor: ['#1a472a', '#d4af37', '#c41e3a'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });

    const memberGrowthCanvas = document.getElementById('memberGrowthChart');
    if (memberGrowthCanvas) {
        const memberGrowthCtx = memberGrowthCanvas.getContext('2d');
        memberGrowthChart = new Chart(memberGrowthCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Active Members',
                    data: [980, 1010, 1045, 1085, 1140, 1180, 1235],
                    borderColor: '#1a472a',
                    backgroundColor: 'rgba(26, 71, 42, 0.18)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value;
                            }
                        }
                    }
                }
            }
        });
    }
}

function openChartModal(chartId, title) {
    const modal = document.getElementById('chartModal');
    const modalTitle = document.getElementById('chartModalTitle');
    const canvas = document.getElementById('fullChartCanvas');
    if (!modal || !canvas || !modalTitle) return;

    const ctx = canvas.getContext('2d');
    if (fullChartInstance) {
        fullChartInstance.destroy();
    }

    const sourceChart = chartId === 'givingChart' ? givingChart : chartId === 'compareChart' ? compareChart : memberGrowthChart;
    if (!sourceChart) return;

    const config = {
        type: sourceChart.config.type,
        data: JSON.parse(JSON.stringify(sourceChart.data)),
        options: JSON.parse(JSON.stringify(sourceChart.options))
    };
    fullChartInstance = new Chart(ctx, config);

    modalTitle.textContent = title;
    modal.style.display = 'flex';
}

function closeChartModal() {
    const modal = document.getElementById('chartModal');
    if (!modal) return;
    modal.style.display = 'none';
    if (fullChartInstance) {
        fullChartInstance.destroy();
        fullChartInstance = null;
    }
}

// Modal functions
function openAddUserModal() {
    document.getElementById('addUserModal').style.display = 'block';
}

function closeAddUserModal() {
    document.getElementById('addUserModal').style.display = 'none';
}

// Success message functions
function showAdminSuccessMessage(title, message) {
    const successMsg = document.getElementById('adminSuccessMessage');
    document.getElementById('adminSuccessTitle').textContent = title;
    document.getElementById('adminSuccessText').textContent = message;
    successMsg.style.display = 'flex';
}

function closeAdminSuccessMessage() {
    document.getElementById('adminSuccessMessage').style.display = 'none';
}

// Form handlers
function addNewUser(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('newUserName').value,
        email: document.getElementById('newUserEmail').value,
        phone: document.getElementById('newUserPhone').value,
        role: document.getElementById('newUserRole').value,
        password: document.getElementById('newUserPassword').value
    };

    // Add to mock data
    const newUser = {
        id: mockData.users.length + 1,
        ...formData,
        joined: new Date().toISOString().split('T')[0],
        status: 'active'
    };
    mockData.users.push(newUser);
    saveAdminData();

    // Close modal and reset form
    closeAddUserModal();
    document.getElementById('addUserForm').reset();

    // Show success message
    showAdminSuccessMessage(
        'User Added Successfully!',
        `${formData.name} has been added as a ${formData.role} with temporary password: ${formData.password}`
    );

    // Refresh users table
    loadUsersTable();
    updateStats();
}

function sendNotification(event) {
    event.preventDefault();

    const formData = {
        type: document.getElementById('notification-type').value,
        channel: document.getElementById('notification-channel').value,
        subject: document.getElementById('notification-subject').value,
        message: document.getElementById('notification-message').value,
        recipients: document.getElementById('notification-recipients').value
    };

    // Send to admin notification emails
    if (formData.channel === 'email' || formData.channel === 'both') {
        console.log(`Sending notification to admin emails: ${adminNotificationEmails.join(', ')}`);
        // In a real app, this would send actual emails
        alert(`Notification sent to admin: ${adminNotificationEmails.join(', ')}\nSubject: ${formData.subject}`);
    }

    // Add to mock notifications
    const newNotification = {
        id: mockData.notifications.length + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0],
        sent: formData.recipients === 'all' ? 1247 : formData.recipients === 'active' ? 1200 : 89
    };
    mockData.notifications.unshift(newNotification);
    saveAdminData();

    // Reset form
    document.getElementById('notificationForm').reset();

    // Show success message
    showAdminSuccessMessage(
        'Notification Sent!',
        `Your ${formData.type} has been sent to ${newNotification.sent} recipients via ${formData.channel === 'both' ? 'Email & WhatsApp' : formData.channel.charAt(0).toUpperCase() + formData.channel.slice(1)}.`
    );

    // Refresh notifications
    loadNotifications();
    updateStats();
}

// Action functions
function viewPledge(id) {
    const pledge = mockData.pledges.find(p => p.id === id);
    if (pledge) {
        alert(`Pledge Details:\n\nName: ${pledge.name}\nEmail: ${pledge.email}\nType: ${pledge.type}\nAmount: ZWL ${pledge.amount.toLocaleString()}\nDate: ${formatDate(pledge.date)}\nStatus: ${pledge.status}`);
    }
}

function deletePledge(id) {
    if (confirm('Are you sure you want to delete this pledge?')) {
        const index = mockData.pledges.findIndex(p => p.id === id);
        if (index > -1) {
            mockData.pledges.splice(index, 1);
            saveAdminData();
            loadPledgesTable();
            updateStats();
            showAdminSuccessMessage('Pledge Deleted', 'The pledge has been successfully deleted.');
        }
    }
}

function viewOffering(id) {
    const offering = mockData.offerings.find(o => o.id === id);
    if (offering) {
        alert(`Offering Details:\n\nName: ${offering.name}\nEmail: ${offering.email}\nAmount: ZWL ${offering.amount.toLocaleString()}\nMethod: ${offering.method}\nDate: ${formatDate(offering.date)}\nReceipt Sent: ${offering.receipt ? 'Yes' : 'No'}`);
    }
}

function sendReceipt(id) {
    const offering = mockData.offerings.find(o => o.id === id);
    if (offering) {
        offering.receipt = true;
        saveAdminData();
        loadOfferingsTable();
        showAdminSuccessMessage('Receipt Sent', `A receipt has been sent to ${offering.email}`);
    }
}

function deleteOffering(id) {
    if (confirm('Are you sure you want to delete this offering?')) {
        const index = mockData.offerings.findIndex(o => o.id === id);
        if (index > -1) {
            mockData.offerings.splice(index, 1);
            saveAdminData();
            loadOfferingsTable();
            updateStats();
            showAdminSuccessMessage('Offering Deleted', 'The offering record has been successfully deleted.');
        }
    }
}

function viewTithe(id) {
    const tithe = mockData.tithes.find(t => t.id === id);
    if (tithe) {
        alert(`Tithe Details:\n\nName: ${tithe.name}\nEmail: ${tithe.email}\nPhone: ${tithe.phone}\nAmount: ZWL ${tithe.amount.toLocaleString()}\nStatus: ${tithe.status.charAt(0).toUpperCase() + tithe.status.slice(1)}\nDue Date: ${tithe.dueDate || 'N/A'}\nDate Paid: ${tithe.datePaid || 'N/A'}`);
    }
}

function deleteTithe(id) {
    if (confirm('Are you sure you want to delete this tithe record?')) {
        const index = mockData.tithes.findIndex(t => t.id === id);
        if (index > -1) {
            mockData.tithes.splice(index, 1);
            saveAdminData();
            loadTithesTable();
            updateStats();
            showAdminSuccessMessage('Tithe Record Deleted', 'The tithe record has been successfully deleted.');
        }
    }
}

function editUser(id) {
    const user = mockData.users.find(u => u.id === id);
    if (user) {
        const newRole = prompt('Enter new role (visitor/member/admin):', user.role);
        if (newRole && ['visitor', 'member', 'admin'].includes(newRole)) {
            user.role = newRole;
            saveAdminData();
            loadUsersTable();
            showAdminSuccessMessage('User Updated', `${user.name}'s role has been updated to ${newRole}.`);
        }
    }
}

function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = mockData.users.findIndex(u => u.id === id);
        if (index > -1) {
            mockData.users.splice(index, 1);
            saveAdminData();
            loadUsersTable();
            updateStats();
            showAdminSuccessMessage('User Deleted', 'The user has been successfully deleted.');
        }
    }
}

// Report generation functions
function generateFinancialReport() {
    const totalPledges = mockData.pledges.reduce((sum, p) => sum + p.amount, 0);
    const totalOfferings = mockData.offerings.reduce((sum, o) => sum + o.amount, 0);
    const totalTithes = mockData.tithes.reduce((sum, t) => sum + t.amount, 0);

    const report = `
FINANCIAL REPORT - AFMIZ Mercy City Assembly
Generated: ${new Date().toLocaleDateString()}

TOTAL PLEDGES: ZWL ${totalPledges.toLocaleString()}
TOTAL OFFERINGS: ZWL ${totalOfferings.toLocaleString()}
TOTAL TITHES: ZWL ${totalTithes.toLocaleString()}
GRAND TOTAL: ZWL ${(totalPledges + totalOfferings + totalTithes).toLocaleString()}

PLEDGE BREAKDOWN:
${mockData.pledges.map(p => `- ${p.type}: ZWL ${p.amount.toLocaleString()}`).join('\n')}

OFFERING METHODS:
${['Bank Transfer', 'Mobile Banking', 'Cash'].map(method => {
    const amount = mockData.offerings.filter(o => o.method === method).reduce((sum, o) => sum + o.amount, 0);
    return `- ${method}: ZWL ${amount.toLocaleString()}`;
}).join('\n')}

TITHES SUMMARY:
- Total Tithes: ZWL ${totalTithes.toLocaleString()}
- Paid Tithes: ZWL ${mockData.tithes.filter(t => t.status === 'paid').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
- Pending Tithes: ZWL ${mockData.tithes.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
    `;

    downloadReport('financial_report.txt', report);
    showAdminSuccessMessage('Report Generated', 'Financial report has been downloaded.');
}

function generateMembershipReport() {
    const totalUsers = mockData.users.length;
    const activeMembers = mockData.users.filter(u => u.status === 'active').length;
    const roleBreakdown = {};
    mockData.users.forEach(u => {
        roleBreakdown[u.role] = (roleBreakdown[u.role] || 0) + 1;
    });

    const report = `
MEMBERSHIP REPORT - AFMIZ Mercy City Assembly
Generated: ${new Date().toLocaleDateString()}

TOTAL USERS: ${totalUsers}
ACTIVE MEMBERS: ${activeMembers}

ROLE BREAKDOWN:
${Object.entries(roleBreakdown).map(([role, count]) => `- ${role.charAt(0).toUpperCase() + role.slice(1)}: ${count}`).join('\n')}

RECENT REGISTRATIONS:
${mockData.users.slice(-5).map(u => `- ${u.name} (${u.role}) - Joined: ${formatDate(u.joined)}`).join('\n')}
    `;

    downloadReport('membership_report.txt', report);
    showAdminSuccessMessage('Report Generated', 'Membership report has been downloaded.');
}

function generateAttendanceReport() {
    const report = `
ATTENDANCE REPORT - AFMIZ Mercy City Assembly
Generated: ${new Date().toLocaleDateString()}

This is a sample attendance report. In a real implementation,
this would include actual attendance data from services.

SAMPLE DATA:
- Sunday Service (Jan 14): 387 attendees
- Wednesday Prayer (Jan 10): 156 attendees
- Youth Service (Jan 12): 89 attendees
- Prayer Breakfast (Jan 6): 124 attendees

AVERAGE ATTENDANCE: 189 people per service
    `;

    downloadReport('attendance_report.txt', report);
    showAdminSuccessMessage('Report Generated', 'Attendance report has been downloaded.');
}

function generateNotificationReport() {
    const totalSent = mockData.notifications.reduce((sum, n) => sum + n.sent, 0);
    const channelBreakdown = {};
    mockData.notifications.forEach(n => {
        const channel = n.channel === 'both' ? 'Email & WhatsApp' : n.channel.charAt(0).toUpperCase() + n.channel.slice(1);
        channelBreakdown[channel] = (channelBreakdown[channel] || 0) + n.sent;
    });

    const report = `
NOTIFICATION REPORT - AFMIZ Mercy City Assembly
Generated: ${new Date().toLocaleDateString()}

TOTAL NOTIFICATIONS SENT: ${totalSent}

CHANNEL BREAKDOWN:
${Object.entries(channelBreakdown).map(([channel, count]) => `- ${channel}: ${count} notifications`).join('\n')}

RECENT NOTIFICATIONS:
${mockData.notifications.slice(0, 5).map(n => `- ${n.subject} (${n.type}) - ${n.sent} recipients`).join('\n')}
    `;

    downloadReport('notification_report.txt', report);
    showAdminSuccessMessage('Report Generated', 'Notification report has been downloaded.');
}

function downloadReport(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminSession');
        window.location.href = 'login.html';
    }
}

function navigateToModule(module) {
    // Modules that require authentication
    const modulesRequiringAuth = ['pledges', 'offerings', 'tithes', 'reports', 'notifications', 'settings'];
    
    if (modulesRequiringAuth.includes(module)) {
        // Check if user has permission
        const permissions = rolePermissions[currentUser.role];
        let hasPermission = false;

        switch (module) {
            case 'pledges':
                hasPermission = permissions.canViewPledges;
                break;
            case 'offerings':
                hasPermission = permissions.canViewOfferings;
                break;
            case 'tithes':
                hasPermission = permissions.canViewTithes;
                break;
            case 'reports':
                hasPermission = permissions.canViewReports;
                break;
            case 'notifications':
                hasPermission = permissions.canEditAnnouncements;
                break;
            case 'settings':
                hasPermission = permissions.canAccessSettings;
                break;
            default:
                hasPermission = true;
        }

        if (!hasPermission) {
            showAdminSuccessMessage('Access Denied', 'You do not have permission to access this module.');
            return;
        }

        // Open the access modal for additional authentication
        openModuleAccessModal(module);
        return;
    }

    // Navigate to the module
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('data-page') === module) {
            item.click();
        }
    });
}

// Pledges Access Modal Functions
function openPledgesAccessModal() {
    document.getElementById('pledgesAccessModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePledgesAccessModal() {
    document.getElementById('pledgesAccessModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPledgesRegisterForm() {
    document.getElementById('pledgesLoginForm').style.display = 'none';
    document.getElementById('pledgesRegisterForm').style.display = 'block';
}

function showPledgesLoginForm() {
    document.getElementById('pledgesRegisterForm').style.display = 'none';
    document.getElementById('pledgesLoginForm').style.display = 'block';
}

function handlePledgesLogin(event) {
    event.preventDefault();

    const email = document.getElementById('pledgesEmail').value.trim();
    const password = document.getElementById('pledgesPassword').value;

    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }

    const user = getAllUsers().find(u => u.email === email && u.password === password);

    if (!user) {
        alert('Invalid email or password');
        return;
    }

    if (!user.isProjectTeam) {
        alert('You are not authorized to access pledges.');
        return;
    }

    // Check if user has permission to view pledges
    if (!rolePermissions[user.role].canViewPledges) {
        alert('Your role does not have permission to view pledges.');
        return;
    }

    // Store pledges access session
    const pledgesSession = {
        userId: user.id,
        email: user.email,
        role: user.role,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour
    };
    localStorage.setItem('pledgesSession', JSON.stringify(pledgesSession));

    closePledgesAccessModal();
    navigateToModule('pledges');
}

function handlePledgesRegistration(event) {
    event.preventDefault();

    const name = document.getElementById('pledgesRegName').value.trim();
    const email = document.getElementById('pledgesRegEmail').value.trim();
    const password = document.getElementById('pledgesRegPassword').value;

    if (!name || !email || !password) {
        alert('All fields are required');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        return;
    }

    const registeredUsers = loadRegisteredUsers();
    const duplicateEmail = registeredUsers.some(user => user.email.toLowerCase() === email.toLowerCase()) ||
        mockUsers.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (duplicateEmail) {
        alert('This email is already registered. Please login instead.');
        showPledgesLoginForm();
        return;
    }

    const newUser = {
        id: Date.now(),
        username: email.split('@')[0],
        email: email,
        password: password,
        role: 'projects_admin', // Default role for pledges registration
        name: name,
        phone: '',
        address: '',
        idNumber: '',
        twoFactorEnabled: false,
        isProjectTeam: true
    };

    registeredUsers.push(newUser);
    saveRegisteredUsers(registeredUsers);

    alert('Registration successful. You can now login to access pledges.');
    showPledgesLoginForm();
}

// Check pledges access on pledges page load
function checkPledgesAccess() {
    const session = localStorage.getItem('pledgesSession');
    if (!session) return false;

    try {
        const sessionData = JSON.parse(session);
        const now = new Date();
        const expiresAt = new Date(sessionData.expiresAt);

        if (now >= expiresAt) {
            localStorage.removeItem('pledgesSession');
            return false;
        }

        return true;
    } catch (error) {
        localStorage.removeItem('pledgesSession');
        return false;
    }
}

// Module Access Control Functions
function checkModuleAccess(module) {
    const permissions = rolePermissions[currentUser.role];
    
    switch(module) {
        case 'pledges':
            return permissions.canViewPledges;
        case 'offerings':
            return permissions.canViewOfferings;
        case 'tithes':
            return permissions.canViewTithes;
        case 'reports':
            return permissions.canViewReports;
        case 'notifications':
            return permissions.canEditAnnouncements;
        case 'settings':
            return permissions.canAccessSettings;
        default:
            return true;
    }
}

function openModuleAccessModal(module) {
    const modalMap = {
        'pledges': 'pledgesAccessModal',
        'offerings': 'offeringsAccessModal',
        'tithes': 'thesAccessModal',
        'reports': 'reportsAccessModal',
        'notifications': 'announcementsAccessModal',
        'settings': 'settingsAccessModal'
    };

    const modalId = modalMap[module];
    if (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
}

function closeModuleAccessModal(module) {
    const modalMap = {
        'pledges': 'pledgesAccessModal',
        'offerings': 'offeringsAccessModal',
        'tithes': 'thesAccessModal',
        'reports': 'reportsAccessModal',
        'notifications': 'announcementsAccessModal',
        'settings': 'settingsAccessModal'
    };

    const modalId = modalMap[module];
    if (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

function handleModuleLogin(event, module) {
    event.preventDefault();

    // Get email and password based on module
    const emailInputId = module + 'Email';
    const passwordInputId = module + 'Password';
    
    const email = document.getElementById(emailInputId).value.trim();
    const password = document.getElementById(passwordInputId).value;

    if (!email || !password) {
        showAdminSuccessMessage('Error', 'Please enter email and password.');
        return;
    }

    const registeredUsers = getAllUsers();
    const user = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
        showAdminSuccessMessage('Error', 'Invalid email or password.');
        return;
    }

    // Check if user has permission for this module
    const permissions = rolePermissions[user.role];
    let hasPermission = false;

    switch(module) {
        case 'pledges':
            hasPermission = permissions.canViewPledges;
            break;
        case 'offerings':
            hasPermission = permissions.canViewOfferings;
            break;
        case 'tithes':
            hasPermission = permissions.canViewTithes;
            break;
        case 'reports':
            hasPermission = permissions.canViewReports;
            break;
        case 'notifications':
            hasPermission = permissions.canEditAnnouncements;
            break;
        case 'settings':
            hasPermission = permissions.canAccessSettings;
            break;
        default:
            hasPermission = true;
    }

    if (!hasPermission) {
        showAdminSuccessMessage('Access Denied', 'Your role does not have permission to access this module.');
        return;
    }

    // Create module session
    const moduleSession = {
        userId: user.id,
        email: user.email,
        role: user.role,
        module: module,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour
    };

    const moduleSessions = JSON.parse(localStorage.getItem('moduleSessions')) || {};
    moduleSessions[module] = moduleSession;
    localStorage.setItem('moduleSessions', JSON.stringify(moduleSessions));

    closeModuleAccessModal(module);
    showAdminSuccessMessage('Access Granted', `You have been granted access to the ${module} module.`);

    // Navigate to the module
    setTimeout(() => {
        const navItem = document.querySelector(`[data-page="${module}"]`);
        if (navItem) {
            navItem.click();
        }
    }, 500);
}
