
import { fetchWithToken } from "./token.js";

const apiBase = "https://v2.api.noroff.dev";
const apiProfile = "/auction/profiles/";


const name = localStorage.getItem('userName');
const username = document.getElementById("username");
username.innerHTML = name;
var credits = "0";

// Get username from URL
function getUsernameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name');
}
async function fetchProfile() {
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
            credits = json.data.credits;
        } else {
            console.error("Failed to fetch profile:", json.message || "Unknown error");
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
    document.getElementById("credits").textContent = `Your Credits: ${credits}` || 'Credits not available';

}


// Call fetchProfile on load
fetchProfile();



// LOGOUT
window.logoutUser = function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName'); 
    window.location.href = '/index.html';
};
