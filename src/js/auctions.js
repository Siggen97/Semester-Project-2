import { fetchProfile } from './fetchUserProfile.js';

document.addEventListener('DOMContentLoaded', async (event) => {
    const profileData = await fetchProfile();
    if (profileData) {
        console.log("Profile Data:", profileData);
    }
});


const listingsContainer = document.querySelector('.listingContainer');
let listings = []; 

// FETCH AND DISPLAY LISTINGS
async function fetchAndDisplayListings() {
    const apiURL = 'https://v2.api.noroff.dev/auction/listings';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        listings = data.data; // Store the fetched listings globally
        displayListings(listings); 
    } catch (error) {
        console.error('Failed to fetch listings:', error);
    }
}

// DISPLAY LISTINGS
function displayListings(listingsToDisplay) {
    listingsContainer.innerHTML = '';
    listingsToDisplay.forEach(listing => {
        const listingElement = document.createElement('div');
        listingElement.className = 'listing';
        listingElement.innerHTML = `
            <div class="card" style="width: 20rem;">
                <img src="${listing.media[0]?.url || 'placeholder-image-url.jpg'}" class="card-img-top" alt="${listing.media[0]?.alt}">
                <div class="card-body">
                    <h5 class="card-title"><a href="singleListing.html?id=${listing.id}" style="text-decoration: none;">${listing.title}</a></h5>
                    <p class="card-text">${listing.description}</p>
                    <p class="card-text"><small class="text-muted">Created: ${new Date(listing.created).toLocaleDateString()}</small></p>
                    <p class="card-text"><small class="text-muted">Ends: ${new Date(listing.endsAt).toLocaleDateString()}</small></p>
                    <p class="card-text">Tags: ${listing.tags.join(', ')}</p>
                    <p class="card-text">Bids: ${listing._count.bids}</p>
                </div>
            </div>
        `;
        listingsContainer.appendChild(listingElement);
    });
}

// FETCH AND DISPLAY LISTINGS
fetchAndDisplayListings();

// IMPLEMENT SEARCH FUNCTIONALITY
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    
    const filteredListings = listings.filter(listing => 
        listing.title.toLowerCase().includes(searchText) || 
        listing.description.toLowerCase().includes(searchText)
    );
    displayListings(filteredListings); // DISPLAY FILTERED LISTINGS
});