const form = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    location: document.getElementById('location').value,
    role: document.getElementById('role').value
  };

  try {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(data.message, 'success');
      setTimeout(() => {
        window.location.href = data.redirect;
      }, 1500);
    } else {
      showMessage(data.message, 'error');
    }
  } catch (error) {
    showMessage('An error occurred. Please try again.', 'error');
  }
});

function showMessage(message, type) {
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';
}
