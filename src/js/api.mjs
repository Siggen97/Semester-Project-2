
const apiBase = "https://v2.api.noroff.dev";
const apiRegister = "/auth/register";
const apiLogin = "/auth/login";


function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function load(key) {
    return JSON.parse(localStorage.getItem(key));
}



// EVENT LISTENER FOR FORM SUBMISSION
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value; 
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;
            register(name, email, password); 
        });
    }
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail') ? document.getElementById('loginEmail').value.trim().toLowerCase() : document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('loginPassword') ? document.getElementById('loginPassword').value : document.getElementById('password').value;
            login(email, password); 
        });
    }
});




// REGISTER USER
async function register(name, email, password) {
    email = email.trim().toLowerCase();
    if (!email.endsWith("@stud.noroff.no")) {
        alert('Registration allowed for @stud.noroff.no emails only.');
        window.location.href = "/view/login.html";
        return data;
        
    }
    try { 
    const registerResponse = await fetch(apiBase + apiRegister, {
            headers: {
                "Content-Type": "application/json",
                
            },
            method: "POST",
            body: JSON.stringify({ name, email, password })
        })
        if (registerResponse.ok) {
            return await registerResponse.json(); 
        } else {
            const error = await registerResponse.json();
            throw new Error("Account could not register");
        } 

    } catch (error) {
        alert(error.message);
        console.error("Registration Error:", error);
    }
}



// LOGIN USER
async function login(email, password) {
    try {
        const loginResponse = await fetch(`${apiBase}${apiLogin}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ email, password })
        });
        if (loginResponse.ok) {
            const { accessToken } = await loginResponse.json();
            save("token", accessToken);
            save("email", email)
            window.location.href = `profile.html?name=${loginResponse.email}&email=${loginResponse.email}`;
            return true;
        } else {
            const error = await loginResponse.json();
            throw new Error("User could not login");
        }
    } catch (error) {
        alert(error.message);
        console.error("Login Error:", error);
        return false;
    }
}

