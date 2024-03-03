import { fetchProfile } from './fetchUserProfile.js';

let userProfile;

document.addEventListener('DOMContentLoaded', async (event) => {
    const userProfile = await fetchProfile();
    if (userProfile) {
        console.log("Profile Data:", userProfile);
        
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
    const bidAmount = Number(document.getElementById('newBid').value);
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
        alert('Please enter a valid bid amount.');
        return;
    }
    
    
    // Optionally check if user has enough credits
    var credits = `${userProfile.data.credits}`;
    const currentCredits = Number(credits);
    const bidAmountNum = Number(bidAmount);
            if (currentCredits < bidAmountNum) {
                alert('You do not have enough credits to make this bid.');
                return;
            }
        
            try {
                const data = await fetchWithToken(`https://v2.api.noroff.dev/auction/listings/${listingId}/bids`, {
                    method: 'POST',
                    body: JSON.stringify({
                        amount: bidAmount,
                    }),
                });
        
                if (data && data.status === 'success') {
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
