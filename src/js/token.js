/**
 * Fetches with token
 * @param {string} url 
 * @param {object} options  
 */

const apiKey = '151877f2-2a01-426b-bbfe-e15214725f71';

export async function fetchWithToken(url, options) {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const options_auth = {
            ...options,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Noroff-API-Key": apiKey
            },
        }
        const response = await fetch(url, options_auth);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

