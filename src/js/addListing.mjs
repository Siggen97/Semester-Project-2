import { fetchWithToken } from './token.js';

const apiBase = "https://v2.api.noroff.dev";
const createListing = "/auction/listings";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addListingForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

       
        const title = document.getElementById('listingTitle').value;
        const deadline = document.getElementById('listingDeadline').value;
        const mediaUrl = document.getElementById('listingMediaUrl').value;
        const description = document.getElementById('listingDescription').value;

       
        const listingData = {
            title,
            deadline,
            media: [{ url: mediaUrl, alt: title }],
            description,
        };

        try {
            // POST request to create a new listing
            const response = await fetchWithToken(`${apiBase}${createListing}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(listingData),
            });

            if (response.ok) {
                
                console.log('Listing created successfully');
                alert('Listing created successfully!');
                window.location.href = '/view/profile.html';
            } else {
            
                const error = await response.json();
                throw new Error(error.message || 'Failed to create listing');
            }
        } catch (error) {
            console.error('Error creating listing:', error);
            alert(`Error creating listing: ${error.message}`);
        }
    });
});


// Function to create a listing
async function createListing(title, deadline, mediaGallery, description) {
    // Assume there's an API endpoint to create a listing
    const response = await fetchWithToken(`${apiBase}/auction/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, deadline, mediaGallery, description }),
    });
    if (response.ok) {
        alert("Listing created successfully!");
    } else {
        alert("Failed to create listing.");
    }
}

// Function to add a bid to a listing
async function addBidToListing(listingId, bidAmount) {
    // Assume there's an API endpoint to add a bid
    const response = await fetchWithToken(`${apiBase}/auction/listings/${listingId}/bids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bidAmount }),
    });
    if (response.ok) {
        alert("Bid added successfully!");
    } else {
        alert("Failed to add bid.");
    }
}

// Function to view bids on a listing
async function viewBidsOnListing(listingId) {
    // Assume there's an API endpoint to get bids for a listing
    const response = await fetchWithToken(`${apiBase}/auction/listings/${listingId}/bids`);
    if (response.ok) {
        const bids = await response.json();
        // Update the HTML to display the bids
    } else {
        alert("Failed to retrieve bids.");
    }
}
