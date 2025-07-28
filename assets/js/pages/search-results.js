// ========== SEARCH RESULTS PAGE FUNCTIONALITY ==========
// Functions specific to search-results.html page

// Simulated search data
const searchData = {
    flights: [], // Will be generated dynamically
    hotels: [
        {
            id: 1,
            name: "Grand Plaza Hotel",
            rating: 4.5,
            reviews: 1247,
            location: "Downtown Los Angeles",
            amenities: ["Free WiFi", "Pool", "Gym", "Restaurant"],
            price: 189,
            priceUnit: "per night"
        },
        {
            id: 2,
            name: "Oceanview Resort",
            rating: 4.8,
            reviews: 892,
            location: "Santa Monica",
            amenities: ["Beach Access", "Spa", "Free Parking", "Bar"],
            price: 245,
            priceUnit: "per night"
        },
        {
            id: 3,
            name: "City Center Inn",
            rating: 4.2,
            reviews: 634,
            location: "Hollywood",
            amenities: ["Free WiFi", "Business Center", "24/7 Front Desk"],
            price: 129,
            priceUnit: "per night"
        }
    ],
    villas: [
        {
            id: 1,
            name: "Luxury Beachfront Villa",
            rating: 4.9,
            reviews: 156,
            location: "Malibu, CA",
            bedrooms: 4,
            guests: 8,
            amenities: ["Private Pool", "Ocean View", "Full Kitchen", "WiFi"],
            price: 450,
            priceUnit: "per night"
        },
        {
            id: 2,
            name: "Mountain Retreat Villa",
            rating: 4.7,
            reviews: 89,
            location: "Big Sur, CA",
            bedrooms: 3,
            guests: 6,
            amenities: ["Hot Tub", "Fireplace", "Hiking Trails", "Pet Friendly"],
            price: 320,
            priceUnit: "per night"
        }
    ]
};

let currentSearchType = 'flights';
let currentResults = [];

function generateFlightResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from') || 'NYC';
    const to = urlParams.get('to') || 'LAX';
    const fromCode = from.substring(0, 3).toUpperCase();
    const toCode = to.substring(0, 3).toUpperCase();
    
    return [
        {
            id: 1,
            airline: "American Airlines",
            from: fromCode, 
            fromName: from,
            to: toCode, 
            toName: to,
            departure: "08:30", arrival: "11:45",
            duration: "5h 15m", stops: "Non-stop",
            price: 299, class: "Economy"
        },
        {
            id: 2,
            airline: "Delta Air Lines",
            from: fromCode, 
            fromName: from,
            to: toCode, 
            toName: to,
            departure: "14:20", arrival: "17:50",
            duration: "5h 30m", stops: "Non-stop",
            price: 356, class: "Economy"
        },
        {
            id: 3,
            airline: "United Airlines",
            from: fromCode, 
            fromName: from,
            to: toCode, 
            toName: to,
            departure: "19:15", arrival: "22:40",
            duration: "5h 25m", stops: "1 Stop",
            price: 278, class: "Economy"
        },
        {
            id: 4,
            airline: "JetBlue Airways",
            from: fromCode, 
            fromName: from,
            to: toCode, 
            toName: to,
            departure: "06:45", arrival: "10:15",
            duration: "5h 30m", stops: "Non-stop",
            price: 312, class: "Economy"
        }
    ];
}

function detectSearchType() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'flights';
    return type;
}

function loadResults() {
    currentSearchType = detectSearchType();
    
    // Generate dynamic flight data based on search parameters
    if (currentSearchType === 'flights') {
        searchData.flights = generateFlightResults();
    }
    
    currentResults = searchData[currentSearchType] || searchData.flights;
    
    updateSearchSummary();
    displayResults();
}

function updateSearchSummary() {
    const title = document.getElementById('search-title');
    const resultsCount = document.getElementById('results-count');
    const searchParams = document.getElementById('search-params');
    
    if (!title || !resultsCount || !searchParams) return; // Exit if elements don't exist
    
    const titles = {
        'flights': 'Flight Search Results',
        'hotels': 'Hotel Search Results', 
        'villas': 'Villa Search Results'
    };
    
    title.textContent = titles[currentSearchType];
    resultsCount.textContent = `Found ${currentResults.length} results`;
    
    // Update search parameters display with actual URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    updateSearchParamsDisplay(urlParams);
    
    updateAdditionalFilter();
}

function updateSearchParamsDisplay(urlParams) {
    const routeSpan = document.getElementById('route');
    const datesSpan = document.getElementById('dates');
    const passengersSpan = document.getElementById('passengers');
    const classSpan = document.getElementById('class');
    
    if (!routeSpan || !datesSpan || !passengersSpan || !classSpan) return;
    
    if (currentSearchType === 'flights') {
        const from = urlParams.get('from') || 'NYC';
        const to = urlParams.get('to') || 'LAX';
        const departure = urlParams.get('departure') || 'Jul 27';
        const returnDate = urlParams.get('return') || 'Jul 30';
        const passengers = urlParams.get('passengers') || '2 Adults';
        const flightClass = urlParams.get('class') || 'Economy';
        
        routeSpan.textContent = `${from} → ${to}`;
        datesSpan.textContent = `${formatDisplayDate(departure)} - ${formatDisplayDate(returnDate)}`;
        passengersSpan.textContent = passengers;
        classSpan.textContent = flightClass;
    } else if (currentSearchType === 'hotels') {
        const destination = urlParams.get('destination') || 'Los Angeles';
        const checkin = urlParams.get('checkin') || 'Jul 27';
        const checkout = urlParams.get('checkout') || 'Jul 30';
        const guests = urlParams.get('guests') || '2 Guests';
        const rooms = urlParams.get('rooms') || '1 Room';
        
        routeSpan.textContent = destination;
        datesSpan.textContent = `${formatDisplayDate(checkin)} - ${formatDisplayDate(checkout)}`;
        passengersSpan.textContent = guests;
        classSpan.textContent = rooms;
    } else if (currentSearchType === 'villas') {
        const location = urlParams.get('location') || 'Malibu';
        const checkin = urlParams.get('checkin') || 'Jul 27';
        const checkout = urlParams.get('checkout') || 'Jul 30';
        const guests = urlParams.get('guests') || '4 Guests';
        const bedrooms = urlParams.get('bedrooms') || '2 Bedrooms';
        
        routeSpan.textContent = location;
        datesSpan.textContent = `${formatDisplayDate(checkin)} - ${formatDisplayDate(checkout)}`;
        passengersSpan.textContent = guests;
        classSpan.textContent = bedrooms;
    }
}

function updateAdditionalFilter() {
    const additionalFilter = document.getElementById('additional-filter');
    if (!additionalFilter) return;
    
    const filterLabel = additionalFilter.querySelector('label');
    const filterSelect = additionalFilter.querySelector('select');
    
    if (currentSearchType === 'flights') {
        filterLabel.textContent = 'Airlines';
        filterSelect.innerHTML = `
            <option>All Airlines</option>
            <option>American Airlines</option>
            <option>Delta</option>
            <option>United</option>
        `;
    } else if (currentSearchType === 'hotels') {
        filterLabel.textContent = 'Star Rating';
        filterSelect.innerHTML = `
            <option>All Ratings</option>
            <option>5 Stars</option>
            <option>4+ Stars</option>
            <option>3+ Stars</option>
        `;
    } else {
        filterLabel.textContent = 'Bedrooms';
        filterSelect.innerHTML = `
            <option>Any Bedrooms</option>
            <option>1-2 Bedrooms</option>
            <option>3-4 Bedrooms</option>
            <option>5+ Bedrooms</option>
        `;
    }
}

function displayResults() {
    const container = document.getElementById('results-container');
    if (!container) return;
    
    // Show loading animation
    container.innerHTML = createLoadingSkeletons();
    
    setTimeout(() => {
        if (currentResults.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>No results found</h3>
                    <p>Try adjusting your search criteria</p>
                </div>
            `;
            return;
        }
        
        let resultsHTML = '';
        currentResults.forEach(result => {
            if (currentSearchType === 'flights') {
                resultsHTML += createFlightCard(result);
            } else if (currentSearchType === 'hotels') {
                resultsHTML += createHotelCard(result);
            } else {
                resultsHTML += createVillaCard(result);
            }
        });
        
        container.innerHTML = resultsHTML;
    }, 1500);
}

function createLoadingSkeletons() {
    let skeletons = '';
    for (let i = 0; i < 3; i++) {
        skeletons += `
            <div class="result-card">
                <div class="loading-skeleton" style="width: 30%; height: 24px;"></div>
                <div class="loading-skeleton" style="width: 60%; height: 16px; margin-top: 10px;"></div>
                <div class="loading-skeleton" style="width: 40%; height: 16px; margin-top: 5px;"></div>
                <div class="loading-skeleton" style="width: 20%; height: 20px; margin-top: 15px;"></div>
            </div>
        `;
    }
    return skeletons;
}

function createFlightCard(flight) {
    return `
        <div class="result-card">
            <div class="flight-card">
                <div class="flight-info">
                    <div class="airport-info">
                        <div class="airport-code">${flight.from}</div>
                        <div class="airport-name">${flight.fromName}</div>
                        <div style="margin-top: 10px; font-weight: 600;">${flight.departure}</div>
                    </div>
                    <div class="flight-path">
                        <div class="flight-duration">${flight.duration}</div>
                        <div class="flight-line"></div>
                        <div style="margin-top: 8px; font-size: 12px; color: #666;">${flight.stops}</div>
                    </div>
                    <div class="airport-info">
                        <div class="airport-code">${flight.to}</div>
                        <div class="airport-name">${flight.toName}</div>
                        <div style="margin-top: 10px; font-weight: 600;">${flight.arrival}</div>
                    </div>
                </div>
                <div class="price-section">
                    <div class="price">$${flight.price}</div>
                    <div class="price-per">per person</div>
                    <button class="book-btn" onclick="bookFlight(${flight.id})">Book Now</button>
                </div>
            </div>
            <div class="flight-details">
                <span><strong>${flight.airline}</strong></span>
                <span>•</span>
                <span>${flight.class}</span>
                <span>•</span>
                <span>Refundable</span>
            </div>
        </div>
    `;
}

function createHotelCard(hotel) {
    return `
        <div class="result-card">
            <div class="hotel-card">
                <div class="hotel-image">🏨</div>
                <div class="hotel-info">
                    <h3>${hotel.name}</h3>
                    <div class="hotel-rating">
                        <span class="stars">${'★'.repeat(Math.floor(hotel.rating))}${'☆'.repeat(5-Math.floor(hotel.rating))}</span>
                        <span class="rating-text">${hotel.rating} (${hotel.reviews} reviews)</span>
                    </div>
                    <p style="color: #666; margin-bottom: 10px;">${hotel.location}</p>
                    <div class="hotel-amenities">
                        ${hotel.amenities.map(amenity => `<span class="amenity">${amenity}</span>`).join('')}
                    </div>
                </div>
                <div class="price-section">
                    <div class="price">$${hotel.price}</div>
                    <div class="price-per">${hotel.priceUnit}</div>
                    <button class="book-btn" onclick="bookHotel(${hotel.id})">Book Now</button>
                </div>
            </div>
        </div>
    `;
}

function createVillaCard(villa) {
    return `
        <div class="result-card">
            <div class="villa-card">
                <div class="villa-image">🏖️</div>
                <div class="hotel-info">
                    <h3>${villa.name}</h3>
                    <div class="hotel-rating">
                        <span class="stars">${'★'.repeat(Math.floor(villa.rating))}${'☆'.repeat(5-Math.floor(villa.rating))}</span>
                        <span class="rating-text">${villa.rating} (${villa.reviews} reviews)</span>
                    </div>
                    <p style="color: #666; margin-bottom: 10px;">${villa.location}</p>
                    <p style="color: #666; margin-bottom: 10px;">${villa.bedrooms} bedrooms • Up to ${villa.guests} guests</p>
                    <div class="hotel-amenities">
                        ${villa.amenities.map(amenity => `<span class="amenity">${amenity}</span>`).join('')}
                    </div>
                </div>
                <div class="price-section">
                    <div class="price">$${villa.price}</div>
                    <div class="price-per">${villa.priceUnit}</div>
                    <button class="book-btn" onclick="bookVilla(${villa.id})">Book Now</button>
                </div>
            </div>
        </div>
    `;
}

// Filter and sort functions
function sortResults(sortBy) {
    const sortedResults = [...currentResults];
    
    switch(sortBy) {
        case 'price':
            sortedResults.sort((a, b) => a.price - b.price);
            break;
        case 'duration':
            if (currentSearchType === 'flights') {
                sortedResults.sort((a, b) => a.duration.localeCompare(b.duration));
            }
            break;
        case 'rating':
            sortedResults.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    currentResults = sortedResults;
    displayResults();
}

function filterByPrice(priceRange) {
    let filteredResults = [...searchData[currentSearchType]];
    
    if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(p => p.replace('', '').replace('+', ''));
        filteredResults = filteredResults.filter(result => {
            if (max) {
                return result.price >= parseInt(min) && result.price <= parseInt(max);
            } else {
                return result.price >= parseInt(min);
            }
        });
    }
    
    currentResults = filteredResults;
    displayResults();
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `Found ${currentResults.length} results`;
    }
}

// Booking functions
function bookFlight(id) {
    alert(`Booking flight ID: ${id}. Redirecting to booking page...`);
    // In a real app, you would redirect to a booking page with the flight details
}

function bookHotel(id) {
    alert(`Booking hotel ID: ${id}. Redirecting to booking page...`);
    // In a real app, you would redirect to a booking page with the hotel details
}

function bookVilla(id) {
    alert(`Booking villa ID: ${id}. Redirecting to booking page...`);
    // In a real app, you would redirect to a booking page with the villa details
}

function goBack() {
    window.history.back();
}

// Initialize search results page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the search results page
    if (window.location.pathname.includes('search-results.html')) {
        loadResults();
    }
});