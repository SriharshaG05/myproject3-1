const http = require('http');

const data = JSON.stringify({
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Subject',
  message: 'This is a test message to verify the contact form functionality.'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('Testing contact form endpoint...');

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response Headers:', res.headers);
    try {
      const response = JSON.parse(body);
      console.log('Response Body:', JSON.stringify(response, null, 2));
    } catch (e) {
      console.log('Raw Response:', body);
    }
  });
});

req.on('error', (e) => {
  console.error('Request Error:', e.message);
});

req.write(data);
req.end();