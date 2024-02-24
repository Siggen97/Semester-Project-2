const apiKey = '1abc51fd-82d4-45d5-94a2-ce70eee31165';

async function registerUser(email, password) {
    if (!email.endsWith('@stud.noroff.no')) {
        alert('Registration allowed for stud.noroff.no emails only.');
        return;
    }

    const response = await fetch('https://api.noroff.dev/v2/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Noroff-API-Key': apiKey
        },
        body: JSON.stringify({ email, password })
    });

    if(response.ok) {
        const data = await response.json();
        console.log('Registration successful', data);
        alert('Registration successful');
    } else {
        console.error('Registration failed');
        alert('Registration failed');
    }
}
