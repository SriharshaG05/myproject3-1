const http = require('http');

// Test contact form submission
const contactData = JSON.stringify({
  name: 'John Doe',
  email: 'your@email.com',
  subject: 'How can we help?',
  message: 'Tell us more...'
});

console.log('Testing Contact Form Submission...\n');

const contactReq = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': contactData.length
  }
}, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Contact Form Response:');
    console.log('Status:', res.statusCode);
    console.log('Body:', body);
    console.log('\n');
  });
});

contactReq.on('error', (e) => console.error('Contact Error:', e.message));
contactReq.write(contactData);
contactReq.end();
