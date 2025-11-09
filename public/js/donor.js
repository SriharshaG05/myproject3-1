// Load user info and stats
async function loadUserInfo() {
  try {
    const response = await fetch('/donor/stats');
    const data = await response.json();
    
    document.getElementById('userName').textContent = `Welcome, ${data.name}!`;
    document.getElementById('totalPosts').textContent = data.totalPosts;
    document.getElementById('deliveredCount').textContent = data.deliveredCount;
    document.getElementById('points').textContent = data.points;
  } catch (error) {
    console.error('Error loading user info:', error);
  }
}

// Post new food
const postFoodForm = document.getElementById('postFoodForm');
const messageDiv = document.getElementById('message');

postFoodForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    food_name: document.getElementById('food_name').value,
    quantity: document.getElementById('quantity').value,
    prepared_time: document.getElementById('prepared_time').value,
    available_until: document.getElementById('available_until').value,
    location: document.getElementById('location').value
  };

  try {
    const response = await fetch('/donor/post-food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      showMessage('Food posted successfully!', 'success');
      postFoodForm.reset();
      loadMyPosts();
      loadUserInfo();
    } else {
      showMessage(data.message, 'error');
    }
  } catch (error) {
    showMessage('An error occurred. Please try again.', 'error');
  }
});

// Load donor's food posts
async function loadMyPosts() {
  try {
    const response = await fetch('/donor/my-posts');
    const posts = await response.json();
    
    const container = document.getElementById('myPosts');
    
    if (posts.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No food posts yet. Post your first donation above!</p></div>';
      return;
    }
    
    container.innerHTML = posts.map(post => `
      <div class="food-card">
        <h3>${post.food_name}</h3>
        <p><strong>Quantity:</strong> ${post.quantity}</p>
        <p><strong>Prepared:</strong> ${formatDateTime(post.prepared_time)}</p>
        <p><strong>Available Until:</strong> ${formatDateTime(post.available_until)}</p>
        <p><strong>Location:</strong> ${post.location}</p>
        <span class="status-badge status-${post.status}">${post.status.toUpperCase()}</span>
        ${post.status === 'reserved' ? `
          <div class="actions">
            <button onclick="markDelivered('${post._id}')" class="btn btn-success btn-sm">Mark as Delivered</button>
          </div>
        ` : ''}
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading posts:', error);
  }
}

// Load requests
async function loadRequests() {
  try {
    const response = await fetch('/donor/requests');
    const requests = await response.json();
    
    const container = document.getElementById('requests');
    
    if (requests.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No requests yet.</p></div>';
      return;
    }
    
    container.innerHTML = requests.map(req => `
      <div class="request-item">
        <div class="request-info">
          <h4>${req.food_id.food_name}</h4>
          <p><strong>Requested by:</strong> ${req.receiver_id.name}</p>
          <p><strong>Email:</strong> ${req.receiver_id.email}</p>
          <p><strong>Location:</strong> ${req.receiver_id.location}</p>
          <p><strong>Status:</strong> <span class="status-badge status-${req.status}">${req.status.toUpperCase()}</span></p>
        </div>
        ${req.status === 'pending' ? `
          <div class="request-actions">
            <button onclick="acceptRequest('${req._id}')" class="btn btn-success">Accept</button>
            <button onclick="rejectRequest('${req._id}')" class="btn btn-danger">Reject</button>
          </div>
        ` : ''}
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading requests:', error);
  }
}

// Accept request
async function acceptRequest(requestId) {
  try {
    const response = await fetch(`/donor/accept-request/${requestId}`, {
      method: 'POST'
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage('Request accepted!', 'success');
      loadRequests();
      loadMyPosts();
    } else {
      showMessage(data.message, 'error');
    }
  } catch (error) {
    showMessage('An error occurred.', 'error');
  }
}

// Reject request
async function rejectRequest(requestId) {
  try {
    const response = await fetch(`/donor/reject-request/${requestId}`, {
      method: 'POST'
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage('Request rejected.', 'success');
      loadRequests();
    } else {
      showMessage(data.message, 'error');
    }
  } catch (error) {
    showMessage('An error occurred.', 'error');
  }
}

// Mark as delivered
async function markDelivered(foodId) {
  try {
    const response = await fetch(`/donor/mark-delivered/${foodId}`, {
      method: 'POST'
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage(data.message, 'success');
      loadMyPosts();
      loadUserInfo();
    } else {
      showMessage(data.message, 'error');
    }
  } catch (error) {
    showMessage('An error occurred.', 'error');
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
  loadMyPosts();
  loadRequests();
});
