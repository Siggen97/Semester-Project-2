const listingsContainer = document.querySelector('.listingContainer');

// Fetch and Display Listings
async function fetchAndDisplayListings() {
    const apiURL = 'https://v2.api.noroff.dev/auction/listings';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        displayListings(data.data);
    } catch (error) {
        console.error('Failed to fetch listings:', error);
    }
}

// Display listings
function displayListings(listings) {
    listingsContainer.innerHTML = '';
    listings.forEach(listing => {
        const listingElement = document.createElement('div');
        listingElement.className = 'listing';
        listingElement.innerHTML = `
            <div class="card" style="width: 20rem;">
                <img src="${listing.media[0]?.url || 'placeholder-image-url.jpg'}" class="card-img-top" alt="${listing.media[0]?.alt}">
                <div class="card-body">
                    <h5 class="card-title">${listing.title}</h5>
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

// Fetch Listings 
fetchAndDisplayListings();

// Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredListings = listings.filter(listing => 
        listing.title.toLowerCase().includes(searchText) || 
        listing.description.toLowerCase().includes(searchText)
    );
    displayListings(filteredListings);
});
