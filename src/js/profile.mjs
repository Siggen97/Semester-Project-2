import { fetchWithToken } from "./token.js";

// Base API URL
const apiBase = "https://v2.api.noroff.dev";

// Retrieve the username from localStorage
const username = localStorage.getItem('userName'); // Ensure username is saved during login/registration

// Elements from the DOM
const newAvatarUrlInput = document.getElementById("newAvatarUrl");
const updateAvatarBtn = document.getElementById("updateAvatarBtn");
const profileImgElement = document.getElementById("profileImg");
const usernameElement = document.getElementById("username");
const creditAmountElement = document.getElementById("creditAmount");

// Fetch User Profile and display it
async function fetchUserProfile() {
    try {
        const profileResponse = await fetchWithToken(`${apiBase}/auction/profiles/${username}`);
        if (profileResponse) {
            usernameElement.textContent = profileResponse.name || 'Username not found';
            creditAmountElement.textContent = `Your Credits: ${profileResponse.credits}` || '0';
            profileImgElement.src = profileResponse.avatar.url || '/src/img/default-avatar.png';
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
}

// Update User Avatar
async function updateAvatar(newAvatarUrl) {
    try {
        await fetchWithToken(`${apiBase}/auction/profiles/${username}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatar: { url: newAvatarUrl, alt: "User's new avatar" } })
        });
        alert("Avatar updated successfully!");
        profileImgElement.src = newAvatarUrl + '?' + new Date().getTime(); // Bypass cache
    } catch (error) {
        console.error("Error updating avatar:", error);
        alert("Failed to update avatar.");
    }
}

// Attach event listener to Update Avatar button
updateAvatarBtn.addEventListener("click", () => {
    const newAvatarUrl = newAvatarUrlInput.value;
    if (newAvatarUrl) {
        updateAvatar(newAvatarUrl);
    } else {
        alert("Please enter a URL for the new avatar.");
    }
});

// Call fetchUserProfile on page load
fetchUserProfile();





// LOGOUT
window.logoutUser = function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    // Redirect to home page
    window.location.href = '/index.html';
};