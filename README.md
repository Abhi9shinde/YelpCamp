# YelpCamp

### A Full-Stack Web Application for Exploring and Reviewing Campgrounds

## Project Overview
YelpCamp is a dynamic web application that allows users to browse, review, and add campgrounds. It provides an interactive platform where outdoor enthusiasts can share experiences and find new camping spots. Users can authenticate, post reviews, and manage campground listings.

## Features
- User authentication & authorization (Register/Login)
- Add new campgrounds with images & descriptions
- Edit and delete campgrounds (only by the author)
- Post reviews and ratings for campgrounds
- Interactive map for campground locations
- Secure sessions using Passport.js

## Screenshots


| Home Page | Campground List | Campground Details |
|---|---|---|
| <img src="public/screenshots/home.png" alt="Home Page" width="400"> | <img src="public/screenshots/list.png" alt="Campground List" width="400"> | <img src="public/screenshots/details.png" alt="Campground Details" width="400"> |

| Add Campground | Edit Campground | User Authentication |
|---|---|---|
| <img src="public/screenshots/add.png" alt="Add Campground" width="400"> | <img src="public/screenshots/edit.png" alt="Edit Campground" width="400"> | <img src="public/screenshots/auth.png" alt="User Authentication" width="400"> |

## Installation

**1. Clone the Repository**

```bash
git clone <repository_url>
cd yelpcamp
```

**2. Install Dependencies**

```bash
npm install
```

**3. Set Up Environment Variables**
Create a `.env` file and configure the following variables:

```env
DATABASE_URL=<your_mongodb_connection_string>
SESSION_SECRET=<your_secret_key>
MAPBOX_TOKEN=<your_mapbox_api_token>
```

**4. Start the Development Server**

```bash
npm start
```

## Tech Stack

This project utilizes the following technologies:

* **Frontend:**
    * **EJS:** Embedded JavaScript templates for rendering dynamic pages.
    * **Bootstrap:** A CSS framework for responsive design.

* **Backend:**
    * **Node.js & Express.js:** Server-side framework for handling routes and requests.
    * **MongoDB & Mongoose:** NoSQL database and ORM for data storage.
    * **Passport.js:** Authentication middleware for user login.
    * **Mapbox API:** Interactive map integration for displaying campground locations.

* **Hosting & Deployment:**
    * **Cloudinary:** Image storage for campground photos.
    * **Heroku / Render:** Hosting platform for deployment.

## Usage

1. **Sign Up / Login** to access full features.
2. **Browse Campgrounds** and find details about each one.
3. **Add Your Own Campgrounds** with images and descriptions.
4. **Post Reviews** on campgrounds and rate them.
5. **Manage Your Listings** by editing or deleting your entries.

## Future Improvements
- Implement real-time chat for campers
- Add AI-powered campground recommendations
- Offline support for accessing saved campgrounds

## License
This project is licensed under the MIT License.

---
**Contributors:**
- **[Your Name]** - Full-Stack Developer

🚀 Happy Camping with YelpCamp! 🏕️

