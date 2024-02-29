const apiBase = "https://v2.api.noroff.dev";
const apiLogin = "/auth/login";

document.getElementById('loginForm').addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateLoginForm()) {
        return false;
    }

    const user = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value,
    };

    const response = await loginUser(`${apiBase}${apiLogin}`, user);

    if (response && response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('userName', response.name); 
        localStorage.setItem('email', response.email); 

        // Redirect to profile with userName and email
        window.location.href = `profile.html?name=${encodeURIComponent(response.name)}&email=${encodeURIComponent(response.email)}`;
    } else {
        // Unsuccessful Login Err
        alert("Login unsuccessful. Please check your credentials.");
    }
});

/**
 * Log in user with provided credentials authenticate 
 * Stores JWT access token, user email and name. 
 * @param {string} url 
 * @param {object} data 
 * @returns login request response/error
 */

async function loginUser(url, data) {
    console.log("Attempting to log in with:", data);
    try {
        const postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, postData);
        const json = await response.json(); // JSON response
        console.log("Login response:", json); 

        if (!response.ok) {
            throw new Error('Login request failed with status ' + response.status);
        }
        
        const { accessToken } = json.data;

        // Return Response and AccessToken
        return {
            accessToken,
            ...json.data 
        };
    } catch (error) {
        console.error("Error during login:", error);
        return null; 
    }
}

/**
 * Validates email and password in login form.
 */

function validateLoginForm() {
    const email = document.getElementById("loginEmail").value;
    if (!validateEmail(email)) {
        alert("Email address must be valid");
        return false;
    }

    const password = document.getElementById("loginPassword").value;
    if (password.length < 8) {
        alert("Password must be at least 8 characters");
        return false;
    }
    return true;
}

function validateEmail(email) {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}
