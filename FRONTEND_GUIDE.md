# 🍲 FoodShare - Food Management System

**Sharing Surplus, Serving Hope**

FoodShare is a compassionate web platform that bridges the gap between food abundance and need. We connect donors who have surplus food with receivers who need nutritious meals, reducing food waste while fighting hunger in our communities.

![FoodShare Banner](https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=400&fit=crop)

---

## ✨ Features

### 🏠 Beautiful Home Page
- **Hero Section**: Stunning imagery with inspiring quotes
- **Live Statistics**: Real-time stats on meals shared, donors, and receivers
- **How It Works**: Clear 4-step process for users
- **Testimonials**: Stories of impact from real community members
- **Responsive Design**: Looks great on all devices

### 👥 User Roles

#### 🍽️ **Donors**
- Post available surplus food with details
- Track food donations and their status
- Manage pickup requests from receivers
- Earn reward points for contributions
- View delivery history

#### 🤲 **Receivers**
- Browse available food listings
- Filter by location and food type
- Request food pickups
- Track request status
- Access nutritious meals with dignity

#### 🔐 **Admin**
- Verify new user registrations
- Monitor platform activity
- Ensure quality and trust
- Manage user accounts

### 🎨 Modern Design
- **Color Palette**: Soft greens and beige tones representing freshness and warmth
- **Typography**: Poppins font for modern, clean readability
- **Animations**: Smooth transitions and hover effects
- **Quotes**: Inspirational messages throughout the platform
- **Icons**: Emoji-based icons for universal understanding

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project3-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/food_management
   SESSION_SECRET=your_secret_key_here
   PORT=3000
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the application**
   ```bash
   npm start
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
project3-1/
├── models/              # Database models
│   ├── food.js         # Food item schema
│   ├── request.js      # Request schema
│   └── user.js         # User schema
├── routes/             # API routes
│   ├── auth.js         # Authentication routes
│   ├── donor.js        # Donor functionality
│   └── receiver.js     # Receiver functionality
├── views/              # Frontend HTML pages
│   ├── index.html      # Home page
│   ├── about.html      # About & Contact
│   ├── login.html      # Login page
│   ├── signup.html     # Registration page
│   ├── donor.html      # Donor dashboard
│   ├── receiver.html   # Receiver dashboard
│   ├── admin.html      # Admin panel
│   └── pending.html    # Pending verification
├── public/
│   ├── css/
│   │   ├── style.css       # Dashboard styles
│   │   └── home-style.css  # Home page styles
│   └── js/
│       ├── login.js
│       ├── signup.js
│       ├── donor.js
│       ├── receiver.js
│       └── admin.js
├── server.js           # Express server
├── package.json        # Dependencies
└── README.md           # This file
```

---

## 🎯 Usage Guide

### For Donors

1. **Register** as a donor on the signup page
2. **Wait** for admin verification
3. **Login** once approved
4. **Post Food**: Fill out the form with:
   - Food name and description
   - Quantity available
   - Preparation and expiry times
   - Pickup location
5. **Manage Requests**: Accept or decline requests from receivers
6. **Track**: View your donation history and reward points

### For Receivers

1. **Register** as a receiver
2. **Wait** for admin verification
3. **Login** once approved
4. **Browse** available food listings
5. **Filter** by location or food type
6. **Request** food items you need
7. **Track** your active requests

### For Admins

1. **Login** with admin credentials
2. **Review** pending user registrations
3. **Approve/Reject** users
4. **Monitor** platform activity

---

## 🛠️ Technology Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Session Management**: express-session
- **Authentication**: Custom implementation
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Google Fonts (Poppins)
- **Images**: Unsplash (placeholder images)

---

## 🌐 Deployment

### Deploy to Heroku

1. **Create a Heroku account** at [heroku.com](https://heroku.com)

2. **Install Heroku CLI**
   ```bash
   # Windows
   choco install heroku-cli
   
   # Mac
   brew tap heroku/brew && brew install heroku
   ```

3. **Login to Heroku**
   ```bash
   heroku login
   ```

4. **Create a new app**
   ```bash
   heroku create foodshare-app
   ```

5. **Set up MongoDB Atlas**
   - Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Get connection string
   - Add to Heroku config vars

6. **Configure environment variables**
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
   heroku config:set SESSION_SECRET="your_random_secret_key"
   ```

7. **Deploy**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

8. **Open your app**
   ```bash
   heroku open
   ```

### Deploy to Vercel/Netlify

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for other platforms.

---

## 🔐 Security Features

- Password hashing (implement bcrypt)
- Session-based authentication
- Input validation
- XSS protection
- CSRF protection (recommended to add)
- Secure cookie settings

---

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Unsplash**: For beautiful food and community images
- **Google Fonts**: For the Poppins font family
- **Community**: For inspiring this project

---

## 📞 Contact & Support

- **Email**: hello@foodshare.org
- **Website**: [foodshare.org](https://foodshare.org)
- **GitHub Issues**: For bug reports and feature requests

---

## 🌟 Quotes That Inspire Us

> "Every plate shared is a story continued."

> "Your leftovers could be someone's fresh start."

> "No one should go hungry while food goes to waste."

> "Food wasted is hope wasted."

> "Because compassion isn't a service — it's a habit."

---

## 📊 Impact Statistics (Demo)

- 🍱 **12,500+** Meals redistributed
- 👥 **850** Active donors
- ❤️ **3,200** Receivers helped
- 🌍 **24** Cities covered
- ⚖️ **8.5 tons** Food waste prevented

---

## 🎨 Design Philosophy

FoodShare is designed with these principles:

1. **Dignity & Respect**: Every interaction honors humanity
2. **Simplicity**: Easy to use for everyone
3. **Community**: Building connections between neighbors
4. **Sustainability**: Reducing waste, helping the planet
5. **Hope**: Every meal shared is a beacon of hope

---

## 🔜 Future Enhancements

- [ ] Real-time notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Integration with food banks
- [ ] Blockchain-based reward system
- [ ] AI-powered food matching
- [ ] Delivery partner integration

---

**Made with ❤️ for a hunger-free world**

*FoodShare - Because compassion isn't a service — it's a habit.*
