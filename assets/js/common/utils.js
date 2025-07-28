// ========== SHARED UTILITIES & FUNCTIONS ==========
// These functions are used across multiple pages

// Global variables
let currentTab = 'flights';

// Date utilities
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

function formatDisplayDate(dateString) {
    if (!dateString) return 'Jul 27';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Form validation utilities
function validateForm() {
    const requiredFields = document.querySelectorAll('#booking-form input[required], #booking-form select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });
    
    return isValid;
}

// Set default dates for forms
function setDefaultDates() {
    setTimeout(() => {
        const departureInput = document.getElementById('departure');
        const returnInput = document.getElementById('return');
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        
        if (departureInput) departureInput.value = formatDate(today);
        if (returnInput) returnInput.value = formatDate(tomorrow);
        if (checkinInput) checkinInput.value = formatDate(today);
        if (checkoutInput) checkoutInput.value = formatDate(tomorrow);
    });
}

// ========== SEARCH & BOOKING FUNCTIONS ==========
// These functions handle the core search functionality across pages

function switchTab(tab, event) {
    currentTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update form based on selected tab
    const form = document.getElementById('booking-form');
    
    if (tab === 'flights') {
        form.innerHTML = `
        <div class="form-group">
        <label for="from">From</label>
        <input type="text" id="from" placeholder="Departure city">
        </div>
        <div class="form-group">
        <label for="to">To</label>
        <input type="text" id="to" placeholder="Destination">
        </div>
        <div class="form-group">
        <label for="departure">Departure</label>
        <input type="date" id="departure">
        </div>
        <div class="form-group">
        <label for="return">Return</label>
        <input type="date" id="return">
        </div>
        <div class="form-group">
        <label for="passengers">Passengers</label>
        <select id="passengers">
        <option>1 Adult</option>
        <option>2 Adults</option>
        <option>3 Adults</option>
        <option>4+ Adults</option>
        </select>
        </div>
        <div class="form-group">
        <label for="class">Class</label>
        <select id="class">
        <option>Economy</option>
        <option>Business</option>
        <option>First Class</option>
        </select>
        </div>
        `;
    } else if (tab === 'hotels') {
        form.innerHTML = `
        <div class="form-group">
        <label for="destination">Destination</label>
        <input type="text" id="destination" placeholder="City or hotel name">
        </div>
        <div class="form-group">
        <label for="checkin">Check-in</label>
        <input type="date" id="checkin">
        </div>
        <div class="form-group">
        <label for="checkout">Check-out</label>
        <input type="date" id="checkout">
        </div>
        <div class="form-group">
        <label for="guests">Guests</label>
        <select id="guests">
        <option>1 Guest</option>
        <option>2 Guests</option>
        <option>3 Guests</option>
        <option>4+ Guests</option>
        </select>
        </div>
        <div class="form-group">
        <label for="rooms">Rooms</label>
        <select id="rooms">
        <option>1 Room</option>
        <option>2 Rooms</option>
        <option>3 Rooms</option>
        <option>4+ Rooms</option>
        </select>
        </div>
        <div class="form-group">
        <label for="rating">Rating</label>
        <select id="rating">
        <option>Any Rating</option>
        <option>3+ Stars</option>
        <option>4+ Stars</option>
        <option>5 Stars</option>
        </select>
        </div>
        `;
    } else if (tab === 'villas') {
        form.innerHTML = `
        <div class="form-group">
        <label for="location">Location</label>
        <input type="text" id="location" placeholder="City or region">
        </div>
        <div class="form-group">
        <label for="checkin">Check-in</label>
        <input type="date" id="checkin">
        </div>
        <div class="form-group">
        <label for="checkout">Check-out</label>
        <input type="date" id="checkout">
        </div>
        <div class="form-group">
        <label for="guests">Guests</label>
        <select id="guests">
        <option>1-2 Guests</option>
        <option>3-4 Guests</option>
        <option>5-6 Guests</option>
        <option>7+ Guests</option>
        </select>
        </div>
        <div class="form-group">
        <label for="bedrooms">Bedrooms</label>
        <select id="bedrooms">
        <option>1 Bedroom</option>
        <option>2 Bedrooms</option>
        <option>3 Bedrooms</option>
        <option>4+ Bedrooms</option>
        </select>
        </div>
        <div class="form-group">
        <label for="amenities">Amenities</label>
        <select id="amenities">
        <option>Any Amenities</option>
        <option>Pool</option>
        <option>Ocean View</option>
        <option>Kitchen</option>
        </select>
        </div>
        `;
    }
    
    // Set default dates after form is updated
    setDefaultDates();
}

function collectSearchParams() {
    const params = {
        type: currentTab
    };
    
    if (currentTab === 'flights') {
        params.from = document.getElementById('from')?.value || 'NYC';
        params.to = document.getElementById('to')?.value || 'LAX';
        params.departure = document.getElementById('departure')?.value;
        params.return = document.getElementById('return')?.value;
        params.passengers = document.getElementById('passengers')?.value || '1 Adult';
        params.class = document.getElementById('class')?.value || 'Economy';
    } else if (currentTab === 'hotels') {
        params.destination = document.getElementById('destination')?.value || 'Los Angeles';
        params.checkin = document.getElementById('checkin')?.value;
        params.checkout = document.getElementById('checkout')?.value;
        params.guests = document.getElementById('guests')?.value || '1 Guest';
        params.rooms = document.getElementById('rooms')?.value || '1 Room';
        params.rating = document.getElementById('rating')?.value;
    } else if (currentTab === 'villas') {
        params.location = document.getElementById('location')?.value || 'Malibu';
        params.checkin = document.getElementById('checkin')?.value;
        params.checkout = document.getElementById('checkout')?.value;
        params.guests = document.getElementById('guests')?.value || '1-2 Guests';
        params.bedrooms = document.getElementById('bedrooms')?.value || '1 Bedroom';
        params.amenities = document.getElementById('amenities')?.value;
    }
    
    return params;
}

function redirectToResults(params) {
    // Create search results page URL with parameters
    const searchUrl = 'search-results.html?' + new URLSearchParams(params).toString();
    
    // Navigate to the search results page
    window.location.href = searchUrl;
}

function searchBookings() {
    if (!validateForm()) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const btn = document.querySelector('.search-btn');
    const originalText = btn.textContent;
    
    btn.textContent = 'Searching...';
    btn.disabled = true;
    
    // Collect search parameters
    const searchParams = collectSearchParams();
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        
        // Navigate to search results page with parameters
        redirectToResults(searchParams);
    }, 2000);
}

function scrollToBooking() {
    document.querySelector('.hero').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// ========== COMMON UI EFFECTS ==========
// Header background effect on scroll
function initHeaderScrollEffect() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const nav_link_a = document.querySelectorAll('.nav-links a');
        
        if (!header) return; // Exit if header doesn't exist on current page
        
        if (window.scrollY > 200) {
            header.style.background = 'rgba(17, 17, 17, 1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.15)';
            nav_link_a.forEach(link => {
                link.style.color = 'white';
            });
        }
    });
}

// ========== COMMON INITIALIZATION ==========
// This runs on every page load
function initCommonFeatures() {
    // Initialize header scroll effect if header exists
    if (document.querySelector('.header')) {
        initHeaderScrollEffect();
    }
    
    // Set default dates for any forms that exist
    setDefaultDates();
}