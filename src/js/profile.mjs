import { fetchWithToken } from './token.js'; 

const apiBase = "https://v2.api.noroff.dev";
const profileEndpoint = "/auction/profiles/";

document.addEventListener('DOMContentLoaded', async () => {
    
    const userName = localStorage.getItem('name');
    if (userName) {
        await fetchAndDisplayUserProfile(userName);
    } else {
        console.error("User name is not found in localStorage.");
    }
});

async function fetchAndDisplayUserProfile(userName) {
    try {
        const profile = await fetchWithToken(`${apiBase}${profileEndpoint}${userName}`);
        document.getElementById('username').textContent = profile.name || 'Username';
        document.getElementById('profileImg').src = profile.avatar.url || '/src/img/default-avatar.png';
        document.getElementById('creditAmount').textContent = profile.credits || '0';
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
}





const createListingEndpoint = "/auction/listings";

async function createListing(listingData) {
    const url = `${apiBase}${createListingEndpoint}`;
    
    try {
        const response = await fetchWithToken(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(listingData)
        });

        if (response.ok) {
            console.log("Listing created successfully");
        } else {
            console.error("Failed to create listing");
        }
    } catch (error) {
        console.error("Error creating listing:", error);
    }
}

const listingData = {
    title: "Vintage Lamp",
    description: "A beautiful vintage lamp in excellent condition.",
    media: [{ url: "https://url.com/image.jpg", alt: "Vintage Lamp" }],
    endsAt: "2023-12-31T23:59:59.000Z" 
};

createListing(listingData);
