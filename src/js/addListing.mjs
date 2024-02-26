import { fetchWithToken } from './token.js';

const apiBase = "https://v2.api.noroff.dev";
const createListingEndpoint = "/auction/listings";

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
            // Send the POST request to create a new listing
            const response = await fetchWithToken(`${apiBase}${createListingEndpoint}`, {
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
