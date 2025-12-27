// API Configuration - Easy to modify for backend integration
const API_BASE_URL = 'http://localhost:3000/api'; // Change this to your backend URL

const API_ENDPOINTS = {
    registerDonor: `${API_BASE_URL}/register-donor`,
    registerHospital: `${API_BASE_URL}/register-hospital`,
    updateInventory: `${API_BASE_URL}/update-hospital-inventory`,
    createRequest: `${API_BASE_URL}/create-request`,
    plateletHospitals: `${API_BASE_URL}/platelet-hospitals`
};

// Location Data
const LOCATION_DATA = {
    'Barishal': ['Barishal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur', 'Barguna'],
    'Chattogram': ['Chattogram', 'Cox\'s Bazar', 'Rangamati', 'Bandarban', 'Khagrachhari', 'Cumilla', 'Feni', 'Lakshmipur', 'Noakhali', 'Chandpur', 'Brahmanbaria'],
    'Dhaka': ['Dhaka', 'Gazipur', 'Kishoreganj', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Tangail', 'Faridpur', 'Gopalganj', 'Madaripur', 'Rajbari', 'Shariatpur'],
    'Khulna': ['Khulna', 'Bagerhat', 'Chuadanga', 'Jashore', 'Jhenaidah', 'Khustia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'],
    'Mymensingh': ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'],
    'Rajshahi': ['Rajshahi', 'Bogura', 'Joypurhat', 'Naogaon', 'Natore', 'Chapainawabganj', 'Pabna', 'Sirajganj'],
    'Rangpur': ['Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon'],
    'Sylhet': ['Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj']
};

// Hospital List (Predefined)
const HOSPITALS = {
    'Dhaka Medical College Hospital': 'Bakshibazar, Dhaka-1000',
    'Bangabandhu Sheikh Mujib Medical University': 'Shahbag, Dhaka-1000',
    'Square Hospital': 'Panthapath, Dhaka-1205',
    'United Hospital': 'Gulshan-2, Dhaka-1212',
    'Apollo Hospitals Dhaka': 'Bashundhara, Dhaka-1229',
    'Chittagong Medical College Hospital': 'Panchlaish, Chattogram-4203',
    'Rajshahi Medical College Hospital': 'Laxmipur, Rajshahi-6100',
    'Sylhet MAG Osmani Medical College Hospital': 'Chowhatta, Sylhet-3100',
    'Khulna Medical College Hospital': 'Khan Jahan Ali Road, Khulna-9100',
    'Mymensingh Medical College Hospital': 'Charpara, Mymensingh-2200'
};

// Utility Functions
function showElement(element) {
    if (element) element.classList.remove('hidden');
}

function hideElement(element) {
    if (element) element.classList.add('hidden');
}

function showLoading(loadingId) {
    const loading = document.getElementById(loadingId);
    showElement(loading);
}

function hideLoading(loadingId) {
    const loading = document.getElementById(loadingId);
    hideElement(loading);
}

function showError(errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
        errorEl.textContent = message;
        showElement(errorEl);
    }
}

function hideError(errorId) {
    const errorEl = document.getElementById(errorId);
    hideElement(errorEl);
}

function showSuccess(successId, message) {
    const successEl = document.getElementById(successId);
    if (successEl) {
        successEl.textContent = message;
        showElement(successEl);
    }
}

// Initialize Division Dropdowns
function initializeDivisions() {
    const divisionSelects = document.querySelectorAll('select[name="division"]');
    
    divisionSelects.forEach(select => {
        Object.keys(LOCATION_DATA).forEach(division => {
            const option = document.createElement('option');
            option.value = division;
            option.textContent = division;
            select.appendChild(option);
        });

        select.addEventListener('change', function() {
            const districtSelect = this.closest('form').querySelector('select[name="district"]');
            loadDistricts(this.value, districtSelect);
        });
    });
}

// Load Districts Based on Division
function loadDistricts(division, districtSelect) {
    if (!districtSelect) return;

    districtSelect.innerHTML = '<option value="">Select District</option>';
    
    if (division && LOCATION_DATA[division]) {
        districtSelect.disabled = false;
        LOCATION_DATA[division].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    } else {
        districtSelect.disabled = true;
    }
}

// Initialize Hospital Dropdown
function initializeHospitals() {
    const hospitalSelect = document.getElementById('hospitalName');
    if (!hospitalSelect) return;

    Object.keys(HOSPITALS).forEach(hospital => {
        const option = document.createElement('option');
        option.value = hospital;
        option.textContent = hospital;
        hospitalSelect.appendChild(option);
    });

    hospitalSelect.addEventListener('change', function() {
        const addressField = document.getElementById('hospitalAddress');
        if (this.value && HOSPITALS[this.value]) {
            addressField.value = HOSPITALS[this.value];
        } else {
            addressField.value = '';
        }
    });
}

// Donor Page Initialization
function initializeDonorPage() {
    const typeSection = document.getElementById('donorTypeSection');
    const formSection = document.getElementById('donorFormSection');
    const donorTypeInput = document.getElementById('donorType');
    const hospitalField = document.getElementById('hospitalDonorField');
    
    if (!typeSection) return;

    const cards = document.querySelectorAll('.selection-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            cards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            const type = this.dataset.type;
            donorTypeInput.value = type;
            
            showElement(formSection);
            
            if (type === 'hospital') {
                showElement(hospitalField);
            } else {
                hideElement(hospitalField);
            }

            formSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const form = document.getElementById('donorForm');
    if (form) {
        form.addEventListener('submit', handleDonorSubmit);
    }
}

// Handle Donor Form Submission
async function handleDonorSubmit(e) {
    e.preventDefault();
    
    hideError('errorMessage');
    hideElement(document.getElementById('successMessage'));
    showLoading('loadingMessage');

    const formData = new FormData(e.target);
    const data = {
        donorType: formData.get('donorType'),
        fullName: formData.get('fullName'),
        bloodGroup: formData.get('bloodGroup'),
        phone: formData.get('phone'),
        division: formData.get('division'),
        district: formData.get('district'),
        lastDonation: formData.get('lastDonation'),
        willingForHospital: formData.get('willingForHospital') === 'on'
    };

    try {
        const response = await fetch(API_ENDPOINTS.registerDonor, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        hideLoading('loadingMessage');

        if (response.ok) {
            showSuccess('successMessage', 'Registration successful! Thank you for becoming a donor.');
            e.target.reset();
            hideElement(document.getElementById('donorFormSection'));
            document.querySelectorAll('.selection-card').forEach(c => c.classList.remove('selected'));
        } else {
            const error = await response.json();
            showError('errorMessage', error.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        hideLoading('loadingMessage');
        showError('errorMessage', 'Unable to connect to server. Please check your connection and try again.');
    }
}

// Hospital Page Initialization
function initializeHospitalPage() {
    const form = document.getElementById('hospitalForm');
    if (!form) return;

    form.addEventListener('submit', handleHospitalSubmit);
}

// Handle Hospital Form Submission
async function handleHospitalSubmit(e) {
    e.preventDefault();
    
    hideError('errorMessage');
    hideElement(document.getElementById('successMessage'));
    showLoading('loadingMessage');

    const formData = new FormData(e.target);
    const data = {
        hospitalName: formData.get('hospitalName'),
        hospitalAddress: formData.get('hospitalAddress'),
        division: formData.get('division'),
        district: formData.get('district'),
        contactPhone: formData.get('contactPhone'),
        inventory: {
            'A+': parseInt(formData.get('aPos')) || 0,
            'A-': parseInt(formData.get('aNeg')) || 0,
            'B+': parseInt(formData.get('bPos')) || 0,
            'B-': parseInt(formData.get('bNeg')) || 0,
            'AB+': parseInt(formData.get('abPos')) || 0,
            'AB-': parseInt(formData.get('abNeg')) || 0,
            'O+': parseInt(formData.get('oPos')) || 0,
            'O-': parseInt(formData.get('oNeg')) || 0
        },
        acceptVoluntary: formData.get('acceptVoluntary') === 'on'
    };

    try {
        const response = await fetch(API_ENDPOINTS.registerHospital, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        hideLoading('loadingMessage');

        if (response.ok) {
            showSuccess('successMessage', 'Hospital registered successfully! Your blood inventory has been updated.');
            e.target.reset();
        } else {
            const error = await response.json();
            showError('errorMessage', error.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        hideLoading('loadingMessage');
        showError('errorMessage', 'Unable to connect to server. Please check your connection and try again.');
    }
}

// Request Page Initialization
function initializeRequestPage() {
    const form = document.getElementById('requestForm');
    if (!form) return;

    form.addEventListener('submit', handleRequestSubmit);
}

// Handle Request Form Submission
async function handleRequestSubmit(e) {
    e.preventDefault();
    
    hideError('errorMessage');
    hideElement(document.getElementById('resultsSection'));
    showLoading('loadingMessage');

    const formData = new FormData(e.target);
    const data = {
        bloodGroup: formData.get('bloodGroup'),
        units: parseInt(formData.get('units')),
        division: formData.get('division'),
        district: formData.get('district'),
        urgency: formData.get('urgency')
    };

    try {
        const response = await fetch(API_ENDPOINTS.createRequest, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        hideLoading('loadingMessage');

        if (response.ok) {
            const results = await response.json();
            displayRequestResults(results, data.urgency === 'emergency');
        } else {
            const error = await response.json();
            showError('errorMessage', error.message || 'Search failed. Please try again.');
        }
    } catch (error) {
        hideLoading('loadingMessage');
        showError('errorMessage', 'Unable to connect to server. Waiting for server response...');
        
        // Show empty results section
        showElement(document.getElementById('resultsSection'));
    }
}

// Display Request Results
function displayRequestResults(results, isEmergency) {
    const resultsSection = document.getElementById('resultsSection');
    const donorResults = document.getElementById('donorResults');
    const hospitalResults = document.getElementById('hospitalResults');

    showElement(resultsSection);

    // Display Donors
    if (results.donors && results.donors.length > 0) {
        donorResults.innerHTML = '';
        results.donors.slice(0, 40).forEach(donor => {
            const item = document.createElement('div');
            item.className = `result-item ${isEmergency ? 'emergency' : ''}`;
            item.innerHTML = `
                <h4>${donor.name}</h4>
                <p><strong>Blood Group:</strong> ${donor.bloodGroup}</p>
                <p><strong>Distance:</strong> ${donor.distance || 'N/A'}</p>
                <p><strong>Contact:</strong> ${donor.phone || 'Available on request'}</p>
            `;
            donorResults.appendChild(item);
        });
    } else {
        donorResults.innerHTML = '<p class="no-results">No donors found in your area.</p>';
    }

    // Display Hospitals
    if (results.hospitals && results.hospitals.length > 0) {
        hospitalResults.innerHTML = '';
        results.hospitals.slice(0, 30).forEach(hospital => {
            const item = document.createElement('div');
            item.className = `result-item ${isEmergency ? 'emergency' : ''}`;
            item.innerHTML = `
                <h4>${hospital.name}</h4>
                <p><strong>Address:</strong> ${hospital.address}</p>
                <p><strong>Distance:</strong> ${hospital.distance || 'N/A'}</p>
                <p><strong>Available Units:</strong> ${hospital.availableUnits || 'Check with hospital'}</p>
            `;
            hospitalResults.appendChild(item);
        });
    } else {
        hospitalResults.innerHTML = '<p class="no-results">No hospitals with available blood found.</p>';
    }

    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Platelet Page Initialization
function initializePlateletPage() {
    const form = document.getElementById('plateletForm');
    if (!form) return;

    form.addEventListener('submit', handlePlateletSubmit);
}

// Handle Platelet Form Submission
async function handlePlateletSubmit(e) {
    e.preventDefault();
    
    hideError('errorMessage');
    hideElement(document.getElementById('resultsSection'));
    showLoading('loadingMessage');

    const formData = new FormData(e.target);
    const division = formData.get('division');
    const district = formData.get('district');

    try {
        const response = await fetch(`${API_ENDPOINTS.plateletHospitals}?division=${division}&district=${district}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        hideLoading('loadingMessage');

        if (response.ok) {
            const results = await response.json();
            displayPlateletResults(results);
        } else {
            const error = await response.json();
            showError('errorMessage', error.message || 'Search failed. Please try again.');
        }
    } catch (error) {
        hideLoading('loadingMessage');
        showError('errorMessage', 'Unable to connect to server. Waiting for server response...');
        
        // Show empty results section
        showElement(document.getElementById('resultsSection'));
    }
}

// Display Platelet Results
function displayPlateletResults(results) {
    const resultsSection = document.getElementById('resultsSection');
    const plateletResults = document.getElementById('plateletResults');

    showElement(resultsSection);

    if (results.hospitals && results.hospitals.length > 0) {
        plateletResults.innerHTML = '';
        results.hospitals.slice(0, 20).forEach(hospital => {
            const item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <h4>${hospital.name}</h4>
                <p><strong>Full Address:</strong> ${hospital.address}</p>
            `;
            plateletResults.appendChild(item);
        });
    } else {
        plateletResults.innerHTML = '<p class="no-results">No platelet collection hospitals found in your area.</p>';
    }

    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize divisions on all pages
    initializeDivisions();
    
    // Initialize hospitals dropdown if on hospital page
    initializeHospitals();
    
    // Page-specific initializations
    if (document.getElementById('donorForm')) {
        initializeDonorPage();
    }
    
    if (document.getElementById('hospitalForm')) {
        initializeHospitalPage();
    }
    
    if (document.getElementById('requestForm')) {
        initializeRequestPage();
    }
    
    if (document.getElementById('plateletForm')) {
        initializePlateletPage();
    }
});


