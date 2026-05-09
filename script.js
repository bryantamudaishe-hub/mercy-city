// Modal Management

// Utility Functions
const ADMIN_DATA_KEY = 'mercyCityAdminData';
const VISITOR_PLANS_KEY = 'mercyCityVisitorPlans';
const DAILY_GOSPEL_KEY = 'mercyCityDailyGospelShown';

const dailyGospelMessages = [
    {
        title: 'The Word Was God',
        verseRef: 'John 1:1-2 (NIV)',
        verseText: 'In the beginning was the Word, and the Word was with God, and the Word was God. He was with God in the beginning.',
        teaching: 'Jesus is eternal, present before creation, and fully God. His life is the source of truth for every season.',
        prayerPoints: [
            'Praise Jesus as the eternal Word.',
            'Pray for deeper trust in His presence today.',
            'Ask God to reveal His nature in your life.'
        ]
    },
    {
        title: 'Life and Light',
        verseRef: 'John 1:4-5 (NIV)',
        verseText: 'In him was life, and that life was the light of all mankind. The light shines in the darkness, and the darkness has not overcome it.',
        teaching: 'Christ brings life and light that darkness cannot defeat. When you feel overwhelmed, remember God’s light is always shining.',
        prayerPoints: [
            'Pray for light to overcome any darkness in your heart.',
            'Ask God to reveal His life in every area of your day.',
            'Pray that you would share His light with others.'
        ]
    },
    {
        title: 'Children of God',
        verseRef: 'John 1:12 (NIV)',
        verseText: 'Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God.',
        teaching: 'Through faith in Jesus, you become part of God’s family. This is a powerful identity that changes how you live and pray.',
        prayerPoints: [
            'Thank God for making you His child.',
            'Pray for faith to receive Jesus more fully.',
            'Ask for a greater sense of belonging in His family.'
        ]
    },
    {
        title: 'The Word Became Flesh',
        verseRef: 'John 1:14 (NIV)',
        verseText: 'The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.',
        teaching: 'Jesus came to live with us and reveal the Father’s glory. His grace and truth bring healing to our brokenness.',
        prayerPoints: [
            'Pray for a fresh sense of Christ’s presence.',
            'Ask God to help you reflect His grace to others.',
            'Pray for strength to live in truth and love.'
        ]
    },
    {
        title: 'Grace Upon Grace',
        verseRef: 'John 1:16-17 (NIV)',
        verseText: 'Out of his fullness we have all received grace in place of grace already given. For the law was given through Moses; grace and truth came through Jesus Christ.',
        teaching: 'Jesus brings overflowing grace and true freedom. His gift is greater than any effort, and it transforms the way we relate to God.',
        prayerPoints: [
            'Pray for a life shaped by grace, not guilt.',
            'Ask God for growing truth in your heart.',
            'Thank Jesus for making the Father known.'
        ]
    },
    {
        title: 'Jesus Reveals the Father',
        verseRef: 'John 1:18 (NIV)',
        verseText: 'No one has ever seen God, but the one and only Son, who is himself God and is in closest relationship with the Father, has made him known.',
        teaching: 'Jesus reveals who God the Father is. When you need to know God, look to Christ and trust His love for you.',
        prayerPoints: [
            'Pray for a clearer picture of God’s heart.',
            'Ask Jesus to reveal the Father to you today.',
            'Pray for a faith that rests in God’s love.'
        ]
    },
    {
        title: 'Witness to the Light',
        verseRef: 'John 1:7-8 (NIV)',
        verseText: 'He came as a witness to testify concerning that light, so that through him all might believe. He himself was not the light; he came only as a witness to the light.',
        teaching: 'John the Baptist points to Jesus as the true light. You are also called to be a witness, pointing others to Christ’s life and love.',
        prayerPoints: [
            'Pray for opportunities to point others to Jesus.',
            'Ask God to make your testimony faithful and bold.',
            'Pray that Christ’s light would shine through you.'
        ]
    }
];

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function readAdminData() {
    const saved = localStorage.getItem(ADMIN_DATA_KEY);
    if (!saved) return { pledges: [], offerings: [], tithes: [], users: [], notifications: [] };
    try {
        const parsed = JSON.parse(saved);
        return {
            pledges: parsed.pledges || [],
            offerings: parsed.offerings || [],
            tithes: parsed.tithes || [],
            users: parsed.users || [],
            notifications: parsed.notifications || []
        };
    } catch (error) {
        return { pledges: [], offerings: [], tithes: [], users: [], notifications: [] };
    }
}

function saveAdminData(data) {
    const existing = JSON.parse(localStorage.getItem(ADMIN_DATA_KEY) || '{}');
    const merged = { ...existing, ...data };
    localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(merged));
}

function storePledgeRecord(record) {
    const data = readAdminData();
    data.pledges = data.pledges || [];
    data.pledges.push(record);
    saveAdminData(data);
}

function storeOfferingRecord(record) {
    const data = readAdminData();
    data.offerings = data.offerings || [];
    data.offerings.push(record);
    saveAdminData(data);
}

function storeTitheRecord(record) {
    const data = readAdminData();
    data.tithes = data.tithes || [];
    data.tithes.push(record);
    saveAdminData(data);
}

function submitVisitRequest(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('visitorName').value.trim(),
        email: document.getElementById('visitorEmail').value.trim(),
        phone: document.getElementById('visitorPhone').value.trim(),
        date: document.getElementById('visitDate').value,
        people: document.getElementById('visitPeople').value
    };

    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.people) {
        alert('Please fill in all required fields for your visit request.');
        return;
    }

    const visitRequests = JSON.parse(localStorage.getItem(VISITOR_PLANS_KEY) || '[]');
    visitRequests.push({
        id: Date.now(),
        ...formData,
        requestedAt: new Date().toISOString()
    });
    localStorage.setItem(VISITOR_PLANS_KEY, JSON.stringify(visitRequests));

    showSuccessMessage(
        '📍 Visit Request Sent',
        `Thank you, ${formData.name}! We have received your plan to visit on ${new Date(formData.date).toLocaleDateString()}. Our team will contact you at ${formData.phone}.`
    );

    document.getElementById('visitForm').reset();
}

// Pledge Modal Functions
function openPledgeModal() {
    document.getElementById('pledgeModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePledgeModal() {
    document.getElementById('pledgeModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Giving Modal Functions
function openGivingModal() {
    document.getElementById('givingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGivingModal() {
    document.getElementById('givingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Member Registration Modal Functions
function openMemberModal() {
    document.getElementById('memberModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeMemberModal() {
    document.getElementById('memberModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Admin Modal Functions
function openAdminModal() {
    document.getElementById('adminModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    showAdminRegistrationForm(); // Start with registration form
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showAdminRegistrationForm() {
    document.getElementById('adminRegistrationForm').style.display = 'block';
    document.getElementById('adminVerificationForm').style.display = 'none';
    document.getElementById('adminLoginForm').style.display = 'none';
}

function showAdminVerificationForm(email) {
    document.getElementById('adminRegistrationForm').style.display = 'none';
    document.getElementById('adminVerificationForm').style.display = 'block';
    document.getElementById('adminLoginForm').style.display = 'none';
    document.getElementById('verificationEmail').textContent = email;
}

function showAdminLoginForm() {
    document.getElementById('adminRegistrationForm').style.display = 'none';
    document.getElementById('adminVerificationForm').style.display = 'none';
    document.getElementById('adminLoginForm').style.display = 'block';
}

// Admin Registration Handler
function handleAdminRegistration(event) {
    event.preventDefault();

    const fullName = document.getElementById('adminFullName').value.trim();
    const contact = document.getElementById('adminContact').value.trim();
    const address = document.getElementById('adminAddress').value.trim();
    const role = document.getElementById('adminRole').value;
    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value;

    if (!fullName || !contact || !address || !role || !email || !password) {
        showSuccessMessage('Error', 'Please fill in all required fields.');
        return;
    }

    if (!validateEmail(email)) {
        showSuccessMessage('Error', 'Please enter a valid email address.');
        return;
    }

    if (password.length < 8) {
        showSuccessMessage('Error', 'Password must be at least 8 characters long.');
        return;
    }

    // Generate verification code
    const verificationCode = email.toLowerCase() === 'bryantamudaishe@gmail.com' ? '554433' : Math.floor(100000 + Math.random() * 900000).toString();

    // Store registration data temporarily
    const tempRegistration = {
        fullName,
        contact,
        address,
        role,
        email,
        password,
        verificationCode,
        timestamp: Date.now()
    };

    localStorage.setItem('tempAdminRegistration', JSON.stringify(tempRegistration));

    // Simulate sending verification code (in real app, this would be an API call)
    console.log(`Verification code for ${email}: ${verificationCode}`);
    alert(`🔐 VERIFICATION CODE\n\nA code has been sent to ${email}.\n\nYour code is: ${verificationCode}`);

    showSuccessMessage('Verification Code Sent', `A verification code has been sent to ${email}. Please check your email and enter the code below.`);
    showAdminVerificationForm(email);
}

// Admin Verification Handler
function handleAdminVerification(event) {
    event.preventDefault();

    const enteredCode = document.getElementById('verificationCode').value.trim();
    const tempRegistration = JSON.parse(localStorage.getItem('tempAdminRegistration'));

    if (!tempRegistration) {
        showSuccessMessage('Error', 'Registration session expired. Please register again.');
        showAdminRegistrationForm();
        return;
    }

    if (enteredCode !== tempRegistration.verificationCode && !(tempRegistration.email.toLowerCase() === 'bryantamudaishe@gmail.com' && enteredCode === '554433')) {
        showSuccessMessage('Error', 'Invalid verification code. Please try again.');
        return;
    }

    // Code is valid, complete registration
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Check if email already exists
    const existingUser = registeredUsers.find(user => user.email.toLowerCase() === tempRegistration.email.toLowerCase());
    if (existingUser) {
        showSuccessMessage('Error', 'This email is already registered. Please login instead.');
        showAdminLoginForm();
        localStorage.removeItem('tempAdminRegistration');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        username: tempRegistration.email.split('@')[0],
        email: tempRegistration.email,
        password: tempRegistration.password,
        role: tempRegistration.role,
        name: tempRegistration.fullName,
        phone: tempRegistration.contact,
        address: tempRegistration.address,
        idNumber: '',
        twoFactorEnabled: false,
        isProjectTeam: true,
        verified: true
    };

    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    localStorage.removeItem('tempAdminRegistration');

    showSuccessMessage('Registration Successful', 'Your account has been verified and created successfully. You can now login to access the admin dashboard.');
    showAdminLoginForm();
}

// Resend verification code
function resendVerificationCode() {
    const tempRegistration = JSON.parse(localStorage.getItem('tempAdminRegistration'));

    if (!tempRegistration) {
        showSuccessMessage('Error', 'Registration session expired. Please register again.');
        showAdminRegistrationForm();
        return;
    }

    // Generate new verification code
    const newCode = tempRegistration.email.toLowerCase() === 'bryantamudaishe@gmail.com' ? '554433' : Math.floor(100000 + Math.random() * 900000).toString();
    tempRegistration.verificationCode = newCode;
    tempRegistration.timestamp = Date.now();

    localStorage.setItem('tempAdminRegistration', JSON.stringify(tempRegistration));

    console.log(`New verification code for ${tempRegistration.email}: ${newCode}`);
    alert(`🔐 NEW VERIFICATION CODE\n\nA new code has been sent to ${tempRegistration.email}.\n\nYour code is: ${newCode}`);
    showSuccessMessage('Code Resent', `A new verification code has been sent to ${tempRegistration.email}.`);
}

// Admin Login Handler
function handleAdminLogin(event) {
    event.preventDefault();

    const email = document.getElementById('adminLoginEmail').value.trim();
    const password = document.getElementById('adminLoginPassword').value;

    if (!email || !password) {
        showSuccessMessage('Error', 'Please enter email and password.');
        return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const user = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
        if (email.toLowerCase() === 'bryantamudaishe@gmail.com' && password === '2006abc##') {
            const sessionData = {
                userId: -1,
                email,
                name: 'Bryant Amudaishe',
                role: 'admin',
                loginTime: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            };

            localStorage.setItem('adminSession', JSON.stringify(sessionData));
            showSuccessMessage('Login Successful', 'Redirecting to admin dashboard...');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1500);
            return;
        }

        showSuccessMessage('Error', 'Invalid email or password.');
        return;
    }

    if (!user.verified && !(email.toLowerCase() === 'bryantamudaishe@gmail.com' && password === '2006abc##')) {
        showSuccessMessage('Error', 'Your account is not verified. Please complete registration first.');
        showAdminRegistrationForm();
        return;
    }

    // Create admin session
    const sessionData = {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    localStorage.setItem('adminSession', JSON.stringify(sessionData));

    showSuccessMessage('Login Successful', 'Redirecting to admin dashboard...');
    setTimeout(() => {
        window.location.href = 'admin.html';
    }, 1500);
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const pledgeModal = document.getElementById('pledgeModal');
    const givingModal = document.getElementById('givingModal');
    const memberModal = document.getElementById('memberModal');
    const adminModal = document.getElementById('adminModal');
    
    if (event.target === pledgeModal) {
        closePledgeModal();
    }
    if (event.target === givingModal) {
        closeGivingModal();
    }
    if (event.target === memberModal) {
        closeMemberModal();
    }
    if (event.target === adminModal) {
        closeAdminModal();
    }
});

// Success Message Functions
function showSuccessMessage(title, message) {
    const successMsg = document.getElementById('successMessage');
    document.getElementById('successTitle').textContent = title;
    document.getElementById('successText').textContent = message;
    successMsg.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeSuccessMessage() {
    document.getElementById('successMessage').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close success message when clicking outside
window.addEventListener('click', function(event) {
    const successMsg = document.getElementById('successMessage');
    if (event.target === successMsg) {
        closeSuccessMessage();
    }
});

// Payment method visibility handler
document.addEventListener('DOMContentLoaded', function() {
    const paymentMethodSelect = document.getElementById('paymentMethod');
    if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener('change', function() {
            const bankDetailsGroup = document.getElementById('bankDetailsGroup');
            const ecocashGroup = document.getElementById('ecocashGroup');
            
            if (this.value === 'bank') {
                bankDetailsGroup.style.display = 'block';
                ecocashGroup.style.display = 'none';
            } else if (this.value === 'ecocash') {
                ecocashGroup.style.display = 'block';
                bankDetailsGroup.style.display = 'none';
            } else {
                bankDetailsGroup.style.display = 'none';
                ecocashGroup.style.display = 'none';
            }
        });
    }
    showDailyGospelPopup();
});

function openDailyGospelModal() {
    const index = Math.floor(Date.now() / 86400000) % dailyGospelMessages.length;
    const message = dailyGospelMessages[index];

    document.getElementById('dailyGospelTitle').textContent = message.title;
    document.getElementById('dailyGospelVerseRef').textContent = message.verseRef;
    document.getElementById('dailyGospelVerseText').textContent = message.verseText;
    document.getElementById('dailyGospelTeaching').textContent = message.teaching;

    const prayerList = document.getElementById('dailyGospelPrayerPoints');
    prayerList.innerHTML = '';
    message.prayerPoints.forEach(point => {
        const li = document.createElement('li');
        li.textContent = point;
        prayerList.appendChild(li);
    });

    document.getElementById('dailyGospelModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeDailyGospelModal() {
    document.getElementById('dailyGospelModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showDailyGospelPopup() {
    const lastShown = localStorage.getItem(DAILY_GOSPEL_KEY);
    const today = new Date().toISOString().split('T')[0];
    if (lastShown === today) return;
    openDailyGospelModal();
    localStorage.setItem(DAILY_GOSPEL_KEY, today);
}

// Form Submission Handlers

function submitPledge(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('pledgeName').value.trim(),
        email: document.getElementById('pledgeEmail').value.trim(),
        phone: document.getElementById('pledgePhone').value.trim(),
        type: document.getElementById('pledgeType').value,
        currency: document.getElementById('pledgeCurrency').value,
        amount: Number(document.getElementById('pledgeAmount').value),
        dueDate: document.getElementById('pledgeDueDate').value,
        whatsapp: document.getElementById('pledgeWhatsApp').value.trim()
    };
    
    const pledgeTypeMap = {
        building: 'Building Fund',
        missions: 'Missions',
        facility: 'Facility Upgrade',
        general: 'General Fund'
    };
    const pledgeType = pledgeTypeMap[formData.type] || formData.type;
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.type || !formData.currency || !formData.amount || !formData.whatsapp) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Validate WhatsApp number
    const whatsappRegex = /^\+263\s?\d{2}\s?\d{3}\s?\d{4}$|^\d{10}$|^\d{2}\s?\d{3}\s?\d{4}$/;
    if (!whatsappRegex.test(formData.whatsapp.replace(/\s/g, ''))) {
        alert('Please enter a valid WhatsApp number (e.g., +263 77 123 4567 or 0771234567)');
        return;
    }
    
    const dueDate = formData.dueDate ? new Date(formData.dueDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const dueDateString = dueDate.toISOString().split('T')[0];
    
    const pledgeRecord = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: pledgeType,
        amount: formData.amount,
        currency: formData.currency,
        dueDate: dueDateString,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        whatsapp: formData.whatsapp
    };

    storePledgeRecord(pledgeRecord);
    
    console.log('Pledge submitted:', pledgeRecord);
    
    // Close the modal
    closePledgeModal();
    
    // Show success message
    const currencySymbol = formData.currency === 'USD' ? '$' : formData.currency === 'RANDS' ? 'R' : 'ZWG';
    showSuccessMessage(
        '✅ Pledge Received!',
        `Thank you, ${formData.name}! Your pledge of ${currencySymbol} ${formData.amount.toLocaleString()} has been recorded. Your pledge is due on ${dueDate.toLocaleDateString()}. A confirmation email will be sent to ${formData.email}, and WhatsApp reminders will go to ${formData.whatsapp}.`
    );
    
    // Reset form
    document.getElementById('pledgeForm').reset();
}

function submitGiving(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('givingName').value.trim(),
        email: document.getElementById('givingEmail').value.trim(),
        phone: document.getElementById('givingPhone').value.trim(),
        category: document.getElementById('givingCategory').value,
        currency: document.getElementById('givingCurrency').value,
        amount: Number(document.getElementById('givingAmount').value),
        method: document.getElementById('paymentMethod').value
    };
    
    // Add payment-specific details
    if (formData.method === 'bank') {
        formData.bankDetails = document.getElementById('bankDetails').value.trim();
        if (!formData.bankDetails) {
            alert('Please provide bank details');
            return;
        }
    } else if (formData.method === 'ecocash') {
        formData.ecocashNumber = document.getElementById('ecocashNumber').value.trim();
        if (!formData.ecocashNumber) {
            alert('Please provide EcoCash phone number');
            return;
        }
    }
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.category || !formData.currency || !formData.amount || !formData.method) {
        alert('Please fill in all fields');
        return;
    }
    
    const recordDate = new Date().toISOString().split('T')[0];
    const offeringRecord = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        currency: formData.currency,
        amount: formData.amount,
        method: formData.method === 'ecocash' ? `EcoCash (${formData.ecocashNumber || ''})` : 'Bank Transfer',
        date: recordDate,
        receipt: false
    };

    if (formData.category === 'Tithe') {
        offeringRecord.status = 'paid';
        offeringRecord.dueDate = recordDate;
        offeringRecord.datePaid = recordDate;
        storeTitheRecord(offeringRecord);
    } else {
        storeOfferingRecord(offeringRecord);
    }
    
    console.log('Giving submitted:', offeringRecord);
    
    // Close the modal
    closeGivingModal();
    
    // Show success message
    const currencySymbol = formData.currency === 'USD' ? '$' : formData.currency === 'RANDS' ? 'R' : 'ZWG';
    const methodText = formData.method === 'ecocash' ? `EcoCash (${formData.ecocashNumber})` : 'Bank Transfer';
    showSuccessMessage(
        '💰 Thank You for Your Giving!',
        `Dear ${formData.name}, your ${formData.category.toLowerCase()} of ${currencySymbol} ${formData.amount.toLocaleString()} via ${methodText} has been recorded. A receipt will be emailed to ${formData.email}, and a WhatsApp confirmation will be sent to ${formData.phone}.`
    );
    
    // Reset form
    document.getElementById('givingForm').reset();
}

function submitMemberRegistration(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('memberName').value,
        email: document.getElementById('memberEmail').value,
        phone: document.getElementById('memberPhone').value,
        address: document.getElementById('memberAddress').value,
        interests: document.getElementById('memberInterests').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
        alert('Please fill in all required fields');
        return;
    }
    
    console.log('Member registration submitted:', formData);
    
    // Send notification to admin
    console.log('Sending registration notification to admin: bryantamudaishe@gmail.com');
    // In a real app, this would send an actual email notification
    
    // Close the modal
    closeMemberModal();
    
    // Show success message
    showSuccessMessage(
        '🙌 Welcome to Our Community!',
        `Thank you, ${formData.name}! Your membership registration has been received. A confirmation email will be sent to ${formData.email}, and our admin team will contact you soon. Welcome to AFMIZ Mercy City Assembly!`
    );
    
    // Reset form
    document.getElementById('memberForm').reset();
}

// Hamburger Menu Toggle (for mobile)
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Keep navigation open when a link is clicked on the homepage
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // no op: do not collapse nav on homepage clicks
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', function() {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form input validation
const pledgeForm = document.getElementById('pledgeForm');
const givingForm = document.getElementById('givingForm');

if (pledgeForm) {
    pledgeForm.addEventListener('input', function() {
        const amountInput = document.getElementById('pledgeAmount');
        if (amountInput.value < 100) {
            amountInput.value = 100;
        }
    });
}

if (givingForm) {
    givingForm.addEventListener('input', function() {
        const amountInput = document.getElementById('givingAmount');
        if (amountInput.value < 1) {
            amountInput.value = 1;
        }
    });
}

// Keyboard event to close modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePledgeModal();
        closeGivingModal();
        closeMemberModal();
        closeAdminModal();
        closeSuccessMessage();
    }
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards and intro cards
document.querySelectorAll('.service-card, .intro-card, .announcement-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Pray button engagement analytics (optional)
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // You can send this to an analytics service like Google Analytics
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent;
        trackEvent('Button Click', { button: text });
    });
});

// Initialize tooltips or other features
console.log('AFMIZ Mercy City Assembly website loaded successfully!');
