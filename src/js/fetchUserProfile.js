import { fetchWithToken } from "./token.js";

const apiBase = "https://v2.api.noroff.dev";
const apiProfile = "/auction/profiles/";


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
        } else {
            console.error("Failed to fetch profile:", json.message || "Unknown error");
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
}