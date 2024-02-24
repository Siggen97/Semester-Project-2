function logoutUser() {
    localStorage.removeItem('accessToken');
    window.location.href = '/index.html'; 
}
