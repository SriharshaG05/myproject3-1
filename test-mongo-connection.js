// Quick MongoDB Atlas connection test
require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB Atlas connection...');
console.log('URI:', process.env.MONGODB_URI ? 'Set (hidden)' : 'NOT SET');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('✅ SUCCESS: MongoDB Atlas connected!');
  process.exit(0);
})
.catch(err => {
  console.error('❌ FAILED: MongoDB connection error:');
  console.error('Error name:', err.name);
  console.error('Error message:', err.message);
  if (err.reason) console.error('Reason:', err.reason);
  process.exit(1);
});
