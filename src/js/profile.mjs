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
async function updateAvatar() {
    document.getElementById("updateAvatarBtn").addEventListener("click", async function (evt) {
        evt.preventDefault(); 
        const newAvatarUrl = document.getElementById("newAvatarUrl").value;
        if (!newAvatarUrl) {
            alert("Please enter a URL for the new avatar.");
            return;
        }

        const userData = {
            avatar: {
                url: newAvatarUrl,
                alt: "user avatar", 
            },
        };

        const username = localStorage.getItem("userName");
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await fetchWithToken(`${apiBase}${apiProfile}${username}`, {
                method: "PUT",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                
            }
            const profileData = localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null;
            if (profileData) {
                profileData.data.avatar.url = userData.avatar.url;
                localStorage.setItem("profile", JSON.stringify(profileData));
            }
            alert("Avatar updated successfully");
            window.location.reload(); // Reload the page to reflect the avatar change
        } catch (error) {
            if (error.status === 400 && error.data && error.data.errors) {
                const errorMessage = error.data.errors.map((err) => err.message).join("\n");
                alert(`Error updating avatar:\n${errorMessage}`);
            } else {
                console.error("Error updating avatar:", error);
                alert(`Error updating avatar: ${error}.`);
            }
        }
    });
}

// Call updateAvatar function after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", updateAvatar);

// LOGOUT
window.logoutUser = function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName'); 
    window.location.href = '/index.html';
};