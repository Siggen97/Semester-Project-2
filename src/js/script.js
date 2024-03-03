

window.logoutUser = function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName'); 
    window.location.href = '/index.html';
};