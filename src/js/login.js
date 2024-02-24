const apiKey = '1abc51fd-82d4-45d5-94a2-ce70eee31165';

async function loginUser(email, password) {
    const response = await fetch('https://api.noroff.dev/v2/auth/login', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey
          },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Login successful', data);
        localStorage.setItem('accessToken', data.accessToken);
        window.location.href = '/view/profile.html'; // Redirect to profile page
    } else {
        console.error('Login failed');
        alert('Login failed');
    }
}