// Load pending users
async function loadPendingUsers() {
  try {
    const response = await fetch('/auth/admin/pending-users');
    const users = await response.json();
    
    const container = document.getElementById('pendingUsers');
    
    if (users.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No pending verifications.</p></div>';
      return;
    }
    
    container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Location</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(user => `
            <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.role.toUpperCase()}</td>
              <td>${user.location}</td>
              <td>${formatDate(user.createdAt)}</td>
              <td class="actions">
                <button onclick="verifyUser('${user._id}')" class="btn btn-success btn-sm">Verify</button>
                <button onclick="rejectUser('${user._id}')" class="btn btn-danger btn-sm">Reject</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error('Error loading pending users:', error);
  }
}

// Verify user
async function verifyUser(userId) {
  if (!confirm('Are you sure you want to verify this user?')) return;
  
  try {
    const response = await fetch(`/auth/admin/verify/${userId}`, {
      method: 'POST'
    });
    
    const data = await response.json();
    const messageDiv = document.getElementById('message');
    
    if (response.ok) {
      showMessage('User verified successfully!', 'success');
      loadPendingUsers();
    } else {
      showMessage(data.message, 'error');
    }
  } catch (error) {
    showMessage('An error occurred.', 'error');
  }
}

// Reject user
async function rejectUser(userId) {
  if (!confirm('Are you sure you want to reject and delete this user?')) return;
  
  try {
    const response = await fetch(`/auth/admin/reject/${userId}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    const messageDiv = document.getElementById('message');
    
    if (response.ok) {
      showMessage('User rejected and deleted.', 'success');
      loadPendingUsers();
    } else {
      showMessage(data.message, 'error');
    }
  } catch (error) {
    showMessage('An error occurred.', 'error');
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

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Load all users with IP tracking information
async function loadAllUsers(page = 1) {
  try {
    const roleFilter = document.getElementById('userRoleFilter')?.value || '';
    const verifiedFilter = document.getElementById('userVerifiedFilter')?.value || '';
    
    let url = `/admin/users?page=${page}`;
    if (roleFilter) url += `&role=${roleFilter}`;
    if (verifiedFilter) url += `&verified=${verifiedFilter}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error loading users');
      return;
    }
    
    const container = document.getElementById('allUsers');
    
    if (data.users.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No users found.</p></div>';
      return;
    }
    
    container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Location</th>
            <th>Status</th>
            <th>Last Login IP</th>
            <th>Last Login</th>
            <th>Login History</th>
            <th>Registered</th>
          </tr>
        </thead>
        <tbody>
          ${data.users.map(user => `
            <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td><span class="badge badge-${user.role}">${user.role.toUpperCase()}</span></td>
              <td>${user.location}</td>
              <td><span class="badge badge-${user.verified ? 'success' : 'warning'}">${user.verified ? 'Verified' : 'Pending'}</span></td>
              <td><code>${user.lastLoginIP || 'N/A'}</code></td>
              <td>${user.lastLoginDate ? formatDate(user.lastLoginDate) : 'Never'}</td>
              <td>
                ${user.loginHistory && user.loginHistory.length > 0 
                  ? `<button class="btn btn-sm btn-info" onclick="showLoginHistory('${user._id}', ${JSON.stringify(user.loginHistory).replace(/"/g, '&quot;')})">
                      View (${user.loginHistory.length})
                    </button>` 
                  : 'None'}
              </td>
              <td>${formatDate(user.createdAt)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      ${data.pagination.totalPages > 1 ? `
        <div class="pagination">
          ${data.pagination.hasPrev ? 
            `<button onclick="loadAllUsers(${page - 1})" class="btn btn-sm">← Previous</button>` : 
            '<button class="btn btn-sm" disabled>← Previous</button>'}
          <span>Page ${data.pagination.currentPage} of ${data.pagination.totalPages}</span>
          ${data.pagination.hasNext ? 
            `<button onclick="loadAllUsers(${page + 1})" class="btn btn-sm">Next →</button>` : 
            '<button class="btn btn-sm" disabled>Next →</button>'}
        </div>
      ` : ''}
    `;
  } catch (error) {
    console.error('Error loading all users:', error);
  }
}

// Show login history modal
function showLoginHistory(userId, loginHistory) {
  const historyHtml = loginHistory.map(entry => `
    <div class="login-entry">
      <strong>IP:</strong> <code>${entry.ipAddress}</code><br>
      <strong>Time:</strong> ${formatDate(entry.loginTime)}<br>
      <strong>User Agent:</strong> <small>${entry.userAgent || 'N/A'}</small>
    </div>
    <hr>
  `).join('');
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Login History</h3>
        <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
      </div>
      <div class="modal-body">
        ${historyHtml}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// Statistics Dashboard
async function loadStatistics() {
  try {
    const response = await fetch('/admin/statistics');
    const data = await response.json();

    if (data.success) {
      document.getElementById('donorCount').textContent = data.statistics.users.donors || 0;
      document.getElementById('receiverCount').textContent = data.statistics.users.receivers || 0;
      document.getElementById('foodPostCount').textContent = data.statistics.food.total || 0;
      document.getElementById('requestCount').textContent = data.statistics.requests.total || 0;
      document.getElementById('todayActivity').textContent = data.statistics.activities.today || 0;
    }
  } catch (error) {
    console.error('Error loading statistics:', error);
  }
}

// Activity Monitor
let currentActivityPage = 1;
let currentRoleFilter = '';
let currentTypeFilter = '';

async function loadActivities(page = 1) {
  try {
    currentActivityPage = page;

    let url = `/admin/activities?page=${page}&limit=20`;
    if (currentRoleFilter) url += `&role=${currentRoleFilter}`;
    if (currentTypeFilter) url += `&type=${currentTypeFilter}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      showActivityMessage(data.message || 'Error loading activities', 'error');
      return;
    }

    const container = document.getElementById('activitiesContainer');

    if (data.activities.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No activities found.</p></div>';
      document.getElementById('activityPagination').innerHTML = '';
      return;
    }

    container.innerHTML = data.activities.map(activity => `
      <div class="activity-item ${activity.userRole}">
        <div class="activity-header">
          <div class="activity-user">
            ${activity.userName} 
            <span class="activity-type">${activity.userRole.toUpperCase()}</span>
          </div>
          <div class="activity-time">${formatDate(activity.createdAt)}</div>
        </div>
        <div class="activity-desc">${activity.description}</div>
        <span class="activity-type">${formatActivityType(activity.activityType)}</span>
      </div>
    `).join('');

    // Update pagination
    updateActivityPagination(data.pagination);

  } catch (error) {
    console.error('Error loading activities:', error);
    showActivityMessage('Error loading activities', 'error');
  }
}

function formatActivityType(type) {
  const typeMap = {
    'food_posted': '📦 Food Posted',
    'request_made': '🙋 Request Made',
    'request_accepted': '✅ Request Accepted',
    'request_rejected': '❌ Request Rejected',
    'request_completed': '🎉 Completed',
    'login': '🔑 Login',
    'profile_updated': '👤 Profile Updated'
  };
  return typeMap[type] || type;
}

function filterActivities() {
  currentRoleFilter = document.getElementById('roleFilter').value;
  currentTypeFilter = document.getElementById('typeFilter').value;
  loadActivities(1);
}

function updateActivityPagination(pagination) {
  const paginationDiv = document.getElementById('activityPagination');

  if (pagination.totalPages <= 1) {
    paginationDiv.innerHTML = '';
    return;
  }

  let buttons = '';

  if (pagination.hasPrev) {
    buttons += `<button onclick="loadActivities(${pagination.currentPage - 1})">Previous</button>`;
  }

  for (let i = 1; i <= Math.min(pagination.totalPages, 5); i++) {
    if (i === pagination.currentPage) {
      buttons += `<button disabled style="background: #ff5722; color: white;">${i}</button>`;
    } else {
      buttons += `<button onclick="loadActivities(${i})">${i}</button>`;
    }
  }

  if (pagination.hasNext) {
    buttons += `<button onclick="loadActivities(${pagination.currentPage + 1})">Next</button>`;
  }

  paginationDiv.innerHTML = buttons;
}

function showActivityMessage(message, type) {
  const messageDiv = document.getElementById('activityMessage');
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';

  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
  loadStatistics();
  loadPendingUsers();
  loadAllUsers(1);
  loadActivities(1);
  loadFoodItems(1);
  loadRequests(1);
  loadContactMessages();
});

// Food Items Management
let currentFoodPage = 1;
let currentFoodStatusFilter = '';

async function loadFoodItems(page = 1) {
  try {
    currentFoodPage = page;

    let url = `/admin/all-food?page=${page}&limit=20`;
    if (currentFoodStatusFilter) url += `&status=${currentFoodStatusFilter}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      showFoodMessage(data.message || 'Error loading food items', 'error');
      return;
    }

    const container = document.getElementById('foodContainer');

    if (data.foods.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No food items found.</p></div>';
      document.getElementById('foodPagination').innerHTML = '';
      return;
    }

    container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Quantity</th>
            <th>Donor</th>
            <th>Location</th>
            <th>Status</th>
            <th>Posted</th>
          </tr>
        </thead>
        <tbody>
          ${data.foods.map(food => `
            <tr>
              <td><strong>${food.food_name}</strong></td>
              <td>${food.quantity}</td>
              <td>${food.donor_id ? food.donor_id.name : 'Unknown'}</td>
              <td>${food.location}</td>
              <td><span class="status-${food.status}">${food.status.toUpperCase()}</span></td>
              <td>${formatDate(food.createdAt)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    updateFoodPagination(data.pagination);

  } catch (error) {
    console.error('Error loading food items:', error);
    showFoodMessage('Error loading food items', 'error');
  }
}

function filterFoodItems() {
  currentFoodStatusFilter = document.getElementById('foodStatusFilter').value;
  loadFoodItems(1);
}

function updateFoodPagination(pagination) {
  const paginationDiv = document.getElementById('foodPagination');

  if (pagination.totalPages <= 1) {
    paginationDiv.innerHTML = '';
    return;
  }

  let buttons = '';

  if (pagination.hasPrev) {
    buttons += `<button onclick="loadFoodItems(${pagination.currentPage - 1})">Previous</button>`;
  }

  for (let i = 1; i <= Math.min(pagination.totalPages, 5); i++) {
    if (i === pagination.currentPage) {
      buttons += `<button disabled style="background: #ff5722; color: white;">${i}</button>`;
    } else {
      buttons += `<button onclick="loadFoodItems(${i})">${i}</button>`;
    }
  }

  if (pagination.hasNext) {
    buttons += `<button onclick="loadFoodItems(${pagination.currentPage + 1})">Next</button>`;
  }

  paginationDiv.innerHTML = buttons;
}

function showFoodMessage(message, type) {
  const messageDiv = document.getElementById('foodMessage');
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';

  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

// Requests Management
let currentRequestPage = 1;
let currentRequestStatusFilter = '';

async function loadRequests(page = 1) {
  try {
    currentRequestPage = page;

    let url = `/admin/all-requests?page=${page}&limit=20`;
    if (currentRequestStatusFilter) url += `&status=${currentRequestStatusFilter}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      showRequestMessage(data.message || 'Error loading requests', 'error');
      return;
    }

    const container = document.getElementById('requestContainer');

    if (data.requests.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No requests found.</p></div>';
      document.getElementById('requestPagination').innerHTML = '';
      return;
    }

    container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Donor</th>
            <th>Receiver</th>
            <th>Location</th>
            <th>Status</th>
            <th>Requested</th>
          </tr>
        </thead>
        <tbody>
          ${data.requests.map(request => `
            <tr>
              <td><strong>${request.food_id ? request.food_id.food_name : 'N/A'}</strong></td>
              <td>${request.donor_id ? request.donor_id.name : 'Unknown'}</td>
              <td>${request.receiver_id ? request.receiver_id.name : 'Unknown'}<br><small>${request.receiver_id ? request.receiver_id.location : ''}</small></td>
              <td>${request.food_id ? request.food_id.location : 'N/A'}</td>
              <td><span class="status-${request.status}">${request.status.toUpperCase()}</span></td>
              <td>${formatDate(request.createdAt)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    updateRequestPagination(data.pagination);

  } catch (error) {
    console.error('Error loading requests:', error);
    showRequestMessage('Error loading requests', 'error');
  }
}

function filterRequests() {
  currentRequestStatusFilter = document.getElementById('requestStatusFilter').value;
  loadRequests(1);
}

function updateRequestPagination(pagination) {
  const paginationDiv = document.getElementById('requestPagination');

  if (pagination.totalPages <= 1) {
    paginationDiv.innerHTML = '';
    return;
  }

  let buttons = '';

  if (pagination.hasPrev) {
    buttons += `<button onclick="loadRequests(${pagination.currentPage - 1})">Previous</button>`;
  }

  for (let i = 1; i <= Math.min(pagination.totalPages, 5); i++) {
    if (i === pagination.currentPage) {
      buttons += `<button disabled style="background: #ff5722; color: white;">${i}</button>`;
    } else {
      buttons += `<button onclick="loadRequests(${i})">${i}</button>`;
    }
  }

  if (pagination.hasNext) {
    buttons += `<button onclick="loadRequests(${pagination.currentPage + 1})">Next</button>`;
  }

  paginationDiv.innerHTML = buttons;
}

function showRequestMessage(message, type) {
  const messageDiv = document.getElementById('requestMessage');
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';

  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

// Contact Messages Management
let currentPage = 1;
let currentStatus = '';

async function loadContactMessages(page = 1, status = '') {
  try {
    currentPage = page;
    currentStatus = status;

    const url = `/contact/messages?page=${page}&limit=10${status ? `&status=${status}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      showContactMessage(data.message || 'Error loading messages', 'error');
      return;
    }

    // Update stats
    document.getElementById('unreadCount').textContent = data.unreadCount || 0;
    document.getElementById('totalCount').textContent = data.pagination.totalMessages || 0;

    const container = document.getElementById('contactMessages');

    if (data.messages.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No contact messages found.</p></div>';
      document.getElementById('pagination').innerHTML = '';
      return;
    }

    container.innerHTML = data.messages.map(message => `
      <div class="message-item">
        <div class="message-header">
          <div class="message-sender">${message.name} &lt;${message.email}&gt;</div>
          <div class="message-date">${message.formattedDate}</div>
        </div>
        <div class="message-subject">${message.subject}</div>
        <div class="message-content">${message.message.replace(/\n/g, '<br>')}</div>
        <div class="message-actions">
          <span class="status-badge status-${message.status}">${message.status.toUpperCase()}</span>
          ${message.status === 'unread' ? `<button onclick="markAsRead('${message._id}')" class="btn-action btn-read">Mark Read</button>` : ''}
          ${message.status !== 'replied' ? `<button onclick="markAsReplied('${message._id}')" class="btn-action btn-replied">Mark Replied</button>` : ''}
          <button onclick="deleteMessage('${message._id}')" class="btn-action btn-delete">Delete</button>
        </div>
      </div>
    `).join('');

    // Update pagination
    updatePagination(data.pagination);

  } catch (error) {
    console.error('Error loading contact messages:', error);
    showContactMessage('Error loading messages', 'error');
  }
}

function updatePagination(pagination) {
  const paginationDiv = document.getElementById('pagination');

  if (pagination.totalPages <= 1) {
    paginationDiv.innerHTML = '';
    return;
  }

  let buttons = '';

  if (pagination.hasPrev) {
    buttons += `<button onclick="loadContactMessages(${pagination.currentPage - 1}, '${currentStatus}')">Previous</button>`;
  }

  for (let i = 1; i <= pagination.totalPages; i++) {
    if (i === pagination.currentPage) {
      buttons += `<button disabled style="background: #ff5722; color: white;">${i}</button>`;
    } else {
      buttons += `<button onclick="loadContactMessages(${i}, '${currentStatus}')">${i}</button>`;
    }
  }

  if (pagination.hasNext) {
    buttons += `<button onclick="loadContactMessages(${pagination.currentPage + 1}, '${currentStatus}')">Next</button>`;
  }

  paginationDiv.innerHTML = buttons;
}

async function markAsRead(messageId) {
  if (!confirm('Mark this message as read?')) return;

  try {
    const response = await fetch(`/contact/messages/${messageId}/read`, {
      method: 'PUT'
    });

    const data = await response.json();

    if (response.ok) {
      showContactMessage('Message marked as read', 'success');
      loadContactMessages(currentPage, currentStatus);
    } else {
      showContactMessage(data.message || 'Error updating message', 'error');
    }
  } catch (error) {
    showContactMessage('Error updating message', 'error');
  }
}

async function markAsReplied(messageId) {
  if (!confirm('Mark this message as replied?')) return;

  try {
    const response = await fetch(`/contact/messages/${messageId}/replied`, {
      method: 'PUT'
    });

    const data = await response.json();

    if (response.ok) {
      showContactMessage('Message marked as replied', 'success');
      loadContactMessages(currentPage, currentStatus);
    } else {
      showContactMessage(data.message || 'Error updating message', 'error');
    }
  } catch (error) {
    showContactMessage('Error updating message', 'error');
  }
}

async function deleteMessage(messageId) {
  if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) return;

  try {
    const response = await fetch(`/contact/messages/${messageId}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (response.ok) {
      showContactMessage('Message deleted successfully', 'success');
      loadContactMessages(currentPage, currentStatus);
    } else {
      showContactMessage(data.message || 'Error deleting message', 'error');
    }
  } catch (error) {
    showContactMessage('Error deleting message', 'error');
  }
}

function showContactMessage(message, type) {
  const messageDiv = document.getElementById('contactMessage');
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';

  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}
