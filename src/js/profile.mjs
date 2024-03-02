
import { fetchWithToken } from "./token.js";

const apiBase = "https://v2.api.noroff.dev";
const apiProfile = "/auction/profiles/";


const name = localStorage.getItem('userName');
const username = document.getElementById("username");
username.innerHTML = name;

document.addEventListener('DOMContentLoaded', (event) => {
    fetchProfile();
});


// Get username from URL
function getUsernameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name');
}
export async function fetchProfile() {
    const username = getUsernameFromURL() || localStorage.getItem('userName');
    if (!username) {
        console.error("Username not found.");
        return;
    }
    try {
        const url = `${apiBase}${apiProfile}${username}`; 
        const json = await fetchWithToken(url); 
    
        if (json) { 
            console.log("response:", json);
            var credits = json.data.credits;
            var avatar = json.data.avatar.url;
            var bio = json.data.bio;
            var listings = json.data._count.listings;
            var wins = json.data._count.wins;
        } else {
            console.error("Failed to fetch profile:", json.message || "Unknown error");
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
    document.getElementById("credits").textContent = `Your Credits: ${credits}` || 'Credits not available';
    document.getElementById("avatar").src =  avatar || 'Credits not available';
    document.getElementById("bio").textContent = bio || 'Bio not available';
    document.getElementById("listings").textContent = `Your Listings: ${listings}` || 'Listings not available';
    document.getElementById("wins").textContent = `Your Wins: ${wins}` || 'Wins not available';

}




/**
 * Updates the avatar for a specified user.
 * @param {string} username The username of the profile to update.
 * @param {string} newAvatarUrl
 * @param {object} data
 */
async function updateAvatar(username, newAvatarUrl) {
    const url = `${apiBase}${apiProfile}${username}`;
    try {
        const response = await fetchWithToken(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: {
                    url: newAvatarUrl,
                },
            }),
        });
        if (response && response.ok) {
            console.log("Avatar updated successfully");
            document.getElementById("avatar").src = newAvatarUrl; 
        } else {
            console.error("Failed to update avatar");
        }
    } catch (error) {
        console.error("Error updating avatar:", error);
    }
}


// Event listener
document.getElementById("updateAvatarBtn").addEventListener("click", () => {
    const newAvatarUrl = document.getElementById("newAvatarUrl").value;
    if (newAvatarUrl) {
        const username = getUsernameFromURL() || localStorage.getItem('userName');
        updateAvatar(username, newAvatarUrl);
    } else {
        alert("Please enter a URL for the new avatar.");
    }
});








// LOGOUT
window.logoutUser = function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName'); 
    window.location.href = '/index.html';
};
