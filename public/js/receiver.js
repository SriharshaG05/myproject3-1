// Load user info
async function loadUserInfo() {
  try {
    const response = await fetch('/receiver/info');
    const data = await response.json();
    
    document.getElementById('userName').textContent = `Welcome, ${data.name}!`;
  } catch (error) {
    console.error('Error loading user info:', error);
  }
}

// Load available food
async function loadAvailableFood() {
  try {
    const location = document.getElementById('searchLocation').value;
    const search = document.getElementById('searchFood').value;
    
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (search) params.append('search', search);
    
    const response = await fetch(`/receiver/available-food?${params}`);
    const foods = await response.json();
    
    const container = document.getElementById('availableFood');
    
    if (foods.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No food available at the moment.</p></div>';
      return;
    }
    
    container.innerHTML = foods.map(food => `
      <div class="food-card">
        <h3>${food.food_name}</h3>
        <p><strong>Quantity:</strong> ${food.quantity}</p>
        <p><strong>Prepared:</strong> ${formatDateTime(food.prepared_time)}</p>
        <p><strong>Available Until:</strong> ${formatDateTime(food.available_until)}</p>
        <p><strong>Location:</strong> ${food.location}</p>
        <p><strong>Donor:</strong> ${food.donor_id.name}</p>
        <span class="status-badge status-${food.status}">${food.status.toUpperCase()}</span>
        <div class="actions">
          <button onclick="requestFood('${food._id}')" class="btn btn-primary btn-sm">Request</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading food:', error);
  }
}

// Request food
async function requestFood(foodId) {
  try {
    const response = await fetch(`/receiver/request-food/${foodId}`, {
      method: 'POST'
    });
    
    const data = await response.json();
    const messageDiv = document.getElementById('message');
    
    if (response.ok) {
      showMessage('Request sent successfully!', 'success');
      loadAvailableFood();
      loadMyRequests();
    } else {
      showMessage(data.message, 'error');
    }
  } catch (error) {
    showMessage('An error occurred.', 'error');
  }
}

// Load receiver's requests
async function loadMyRequests() {
  try {
    const response = await fetch('/receiver/my-requests');
    const requests = await response.json();
    
    const container = document.getElementById('myRequests');
    
    if (requests.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>You haven\'t made any requests yet.</p></div>';
      return;
    }
    
    container.innerHTML = requests.map(req => `
      <div class="request-item">
        <div class="request-info">
          <h4>${req.food_id.food_name}</h4>
          <p><strong>Quantity:</strong> ${req.food_id.quantity}</p>
          <p><strong>Location:</strong> ${req.food_id.location}</p>
          <p><strong>Donor:</strong> ${req.donor_id.name}</p>
          <p><strong>Contact:</strong> ${req.donor_id.email}</p>
          <p><strong>Donor Location:</strong> ${req.donor_id.location}</p>
          <p><strong>Status:</strong> <span class="status-badge status-${req.status}">${req.status.toUpperCase()}</span></p>
          ${req.status === 'accepted' ? '<p style="color: #28a745; font-weight: bold;">✓ Your request has been accepted! Please contact the donor.</p>' : ''}
          ${req.status === 'rejected' ? '<p style="color: #dc3545;">✗ Request was not accepted.</p>' : ''}
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading requests:', error);
  }
}

// Logout
async function logout() {
  try {
    const response = await fetch('/auth/logout', { method: 'POST' });
    const data = await response.json();
    
    if (response.ok) {
      window.location.href = data.redirect;
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
}

function showMessage(message, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';
  
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
  loadUserInfo();
  loadAvailableFood();
  loadMyRequests();
});
