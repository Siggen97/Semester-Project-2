const apiBase = "https://v2.api.noroff.dev";
const apiRegister = "/auth/register";
const apiLogin = "/auth/login";

document.getElementById('registrationForm').addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateCreateProfileForm()) {
        return false;
    }

    const newUser = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }

    let response = await registerUser(`${apiBase}${apiRegister}`, newUser);
    if (response.statusCode === 400) {
        if (response.errors && response.errors.length > 0) {
            alert(response.errors[0].message);
        }
        return false;
    }

    // LoginUser Returns the accessToken and Users Profile info
    response = await loginUser(`${apiBase}${apiLogin}`, newUser);
    if (response.statusCode === 401) {
        if (response.errors && response.errors.length > 0) {
            alert(response.errors[0].message);
        }
        return false;
    }

    // Response Name and Email
    localStorage.setItem('userName', response.name); // Saving Name for Profile
    window.location.href = `/view/profile.html?name=${encodeURIComponent(response.name)}&email=${encodeURIComponent(response.email)}`;
    return true;
});


/**
 * Registers a user 
 * @param {string} url 
 * @param {object} data 
 * @returns request response/error
 */

async function registerUser(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}



/**
 * name, email and password validation from the registration form
 * @returns True if form values are valid
 */


function validateCreateProfileForm() {
  let x = document.forms["createProfile"]["name"].value;
  if (x.length <= 5) {
    alert("Username must be more than 5 characters");
    return false;
  }

  if (x.split(" ").length >= 2) {
    alert("Username cannot contain spaces ");
    return false;
  }

  x = document.forms["createProfile"]["name"].value;
  if (!validateName(x)) {
      alert("Name can not contain symbols");
      return false; 
  }

  if (!validateNoroffEmail(x)) {
      alert("Email must be of type @stud.noroff.no or @noroff.no");
      return false;
  }

  x = document.forms["createProfile"]["password"].value;
  if (x.length < 8) {
    alert("Password must be at least 8 characters");
    return false;
  }
  return true;
}



/**
 * Name validation, can not contain certain symbols
 * @param {string} name
 * @returns True if email is valid
 */
function validateName(name) {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(name);
}


/**
 * Email validation: must be to be a stud.noroff.no
 * @param {string} email 
 * @returns True if email noroff type
 */
function validateNoroffEmail(email) {
    const validEmailDomains = ["stud.noroff.no"];
    const emailParts = email.split("@"); 
    const lastEmailPart = emailParts[emailParts.length-1]; 
    return validEmailDomains.includes(lastEmailPart);
  }