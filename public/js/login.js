const form = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('roleInput').value;

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, role })
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(data.message, 'success');
      setTimeout(() => {
        window.location.href = data.redirect;
      }, 1000);
    } else {
      showMessage(data.message, 'error');
      if (data.redirect) {
        setTimeout(() => {
          window.location.href = data.redirect;
        }, 2000);
      }
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
