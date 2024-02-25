/**
 * @param {string} url
 * @param {object} options
 */


export async function fetchWithToken(url, options) {
    try {
        const token = localStorage.getItem('accessToken');
        options.headers = {
            ...options.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}