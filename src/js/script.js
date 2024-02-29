

// LOGOUT
window.logoutUser = function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    // Redirect to home page
    window.location.href = '/index.html';
};



