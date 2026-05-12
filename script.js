// Modal Management

// Utility Functions
const ADMIN_DATA_KEY = 'mercyCityAdminData';
const VISITOR_PLANS_KEY = 'mercyCityVisitorPlans';
const DAILY_GOSPEL_KEY = 'mercyCityDailyGospelShown';

const countryCodes = [
    { name: 'Afghanistan', code: '+93' },
    { name: 'Albania', code: '+355' },
    { name: 'Algeria', code: '+213' },
    { name: 'Angola', code: '+244' },
    { name: 'Argentina', code: '+54' },
    { name: 'Australia', code: '+61' },
    { name: 'Austria', code: '+43' },
    { name: 'Bahamas', code: '+1-242' },
    { name: 'Bahrain', code: '+973' },
    { name: 'Bangladesh', code: '+880' },
    { name: 'Belgium', code: '+32' },
    { name: 'Belize', code: '+501' },
    { name: 'Benin', code: '+229' },
    { name: 'Bhutan', code: '+975' },
    { name: 'Bolivia', code: '+591' },
    { name: 'Bosnia & Herzegovina', code: '+387' },
    { name: 'Botswana', code: '+267' },
    { name: 'Brazil', code: '+55' },
    { name: 'Brunei', code: '+673' },
    { name: 'Bulgaria', code: '+359' },
    { name: 'Cambodia', code: '+855' },
    { name: 'Cameroon', code: '+237' },
    { name: 'Canada', code: '+1' },
    { name: 'Cape Verde', code: '+238' },
    { name: 'Chile', code: '+56' },
    { name: 'China', code: '+86' },
    { name: 'Colombia', code: '+57' },
    { name: 'Costa Rica', code: '+506' },
    { name: 'Croatia', code: '+385' },
    { name: 'Cyprus', code: '+357' },
    { name: 'Czech Republic', code: '+420' },
    { name: 'Denmark', code: '+45' },
    { name: 'Dominican Republic', code: '+1-809' },
    { name: 'Ecuador', code: '+593' },
    { name: 'Egypt', code: '+20' },
    { name: 'El Salvador', code: '+503' },
    { name: 'Estonia', code: '+372' },
    { name: 'Ethiopia', code: '+251' },
    { name: 'Finland', code: '+358' },
    { name: 'France', code: '+33' },
    { name: 'Germany', code: '+49' },
    { name: 'Ghana', code: '+233' },
    { name: 'Greece', code: '+30' },
    { name: 'Guatemala', code: '+502' },
    { name: 'Haiti', code: '+509' },
    { name: 'Honduras', code: '+504' },
    { name: 'Hong Kong', code: '+852' },
    { name: 'Hungary', code: '+36' },
    { name: 'Iceland', code: '+354' },
    { name: 'India', code: '+91' },
    { name: 'Indonesia', code: '+62' },
    { name: 'Ireland', code: '+353' },
    { name: 'Israel', code: '+972' },
    { name: 'Italy', code: '+39' },
    { name: 'Jamaica', code: '+1-876' },
    { name: 'Japan', code: '+81' },
    { name: 'Jordan', code: '+962' },
    { name: 'Kenya', code: '+254' },
    { name: 'Kuwait', code: '+965' },
    { name: 'Lebanon', code: '+961' },
    { name: 'Malaysia', code: '+60' },
    { name: 'Malawi', code: '+265' },
    { name: 'Maldives', code: '+960' },
    { name: 'Mali', code: '+223' },
    { name: 'Malta', code: '+356' },
    { name: 'Mauritius', code: '+230' },
    { name: 'Mexico', code: '+52' },
    { name: 'Moldova', code: '+373' },
    { name: 'Morocco', code: '+212' },
    { name: 'Mozambique', code: '+258' },
    { name: 'Myanmar', code: '+95' },
    { name: 'Namibia', code: '+264' },
    { name: 'Nepal', code: '+977' },
    { name: 'Netherlands', code: '+31' },
    { name: 'New Zealand', code: '+64' },
    { name: 'Nicaragua', code: '+505' },
    { name: 'Nigeria', code: '+234' },
    { name: 'Norway', code: '+47' },
    { name: 'Oman', code: '+968' },
    { name: 'Pakistan', code: '+92' },
    { name: 'Panama', code: '+507' },
    { name: 'Peru', code: '+51' },
    { name: 'Philippines', code: '+63' },
    { name: 'Poland', code: '+48' },
    { name: 'Portugal', code: '+351' },
    { name: 'Qatar', code: '+974' },
    { name: 'Romania', code: '+40' },
    { name: 'Russia', code: '+7' },
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'Senegal', code: '+221' },
    { name: 'Serbia', code: '+381' },
    { name: 'Singapore', code: '+65' },
    { name: 'Slovakia', code: '+421' },
    { name: 'Slovenia', code: '+386' },
    { name: 'South Africa', code: '+27' },
    { name: 'South Korea', code: '+82' },
    { name: 'Spain', code: '+34' },
    { name: 'Sri Lanka', code: '+94' },
    { name: 'Sweden', code: '+46' },
    { name: 'Switzerland', code: '+41' },
    { name: 'Tanzania', code: '+255' },
    { name: 'Thailand', code: '+66' },
    { name: 'Tunisia', code: '+216' },
    { name: 'Turkey', code: '+90' },
    { name: 'Uganda', code: '+256' },
    { name: 'Ukraine', code: '+380' },
    { name: 'United Arab Emirates', code: '+971' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'United States', code: '+1' },
    { name: 'Uruguay', code: '+598' },
    { name: 'Uzbekistan', code: '+998' },
    { name: 'Venezuela', code: '+58' },
    { name: 'Vietnam', code: '+84' },
    { name: 'Zambia', code: '+260' },
    { name: 'Zimbabwe', code: '+263' }
];

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

function populateCountryCodeSelect(selectId) {
    const selectElement = document.getElementById(selectId);
    if (!selectElement) return;
    selectElement.innerHTML = '<option value="">Select your country code</option>';
    countryCodes.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.name} (${country.code})`;
        selectElement.appendChild(option);
    });
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

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const pledgeModal = document.getElementById('pledgeModal');
    const givingModal = document.getElementById('givingModal');
    const memberModal = document.getElementById('memberModal');
    
    if (event.target === pledgeModal) {
        closePledgeModal();
    }
    if (event.target === givingModal) {
        closeGivingModal();
    }
    if (event.target === memberModal) {
        closeMemberModal();
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
