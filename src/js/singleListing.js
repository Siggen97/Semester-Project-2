import { fetchProfile } from './fetchUserProfile.js';

document.addEventListener('DOMContentLoaded', async (event) => {
    const profileData = await fetchProfile();
    if (profileData) {
        console.log("Profile Data:", profileData);
    }
});


const params = new URLSearchParams(window.location.search);
        const listingId = params.get('id');
        const listingDetailsContainer = document.getElementById('listingDetails');

        async function fetchListingDetails() {
            const apiURL = `https://v2.api.noroff.dev/auction/listings/${listingId}`;
            try {
                const response = await fetch(apiURL);
                const data = await response.json();
                displayListingDetails(data.data);
            } catch (error) {
                console.error('Failed to fetch listing details:', error);
            }
        }

        function displayListingDetails(listing) {
            document.getElementById('listingMedia').src = listing.media[0]?.url || 'default-placeholder-image-url.jpg';
            document.getElementById('listingMedia').alt = listing.media[0]?.alt || 'listing media';
            document.getElementById('listingTitle').textContent = listing.title;
            document.getElementById('listingDescription').textContent = listing.description;
            document.getElementById('listingCurrentBid').textContent = `Current Bid: ${listing._count.bids}`;
            document.getElementById('listingDeadline').textContent = `Ends: ${new Date(listing.endsAt).toLocaleDateString()}`;
        }


        // BID SUBMISSION
        document.getElementById('submitBidBtn').addEventListener('click', async () => {
            const bidAmount = document.getElementById('newBid').value;
            if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
                alert('Please enter a valid bid amount.');
                return;
            }
            try {
                const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${listingId}/bids`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        amount: Number(bidAmount),
                    }),
                });
        
                const data = await response.json();
        
                if (response.ok) {
                    alert('Bid submitted successfully.');
                    fetchListingDetails();
                } else {
                    alert(`Failed to submit bid: ${data.message}`);
                }
            } catch (error) {
                console.error('Error submitting bid:', error);
                alert('Error submitting bid. Please try again.');
            }
         });
        
         fetchListingDetails();
