# Stitches

**Full-stack MERN E-commerce Platform for Modern Clothing**

Stitches is a fully responsive e-commerce web application built using the MERN stack. It allows users to browse, search, and purchase men’s and women’s clothing with advanced filtering, sorting, and secure checkout options. The platform includes guest and authenticated user modes, an admin dashboard for managing products and orders, and an intuitive UI optimized for all screen sizes.

---

## Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Cloud Storage:** Cloudinary
- **Payment Integration:** PayPal (client-side integration via `@paypal/react-paypal-js`)

---

## Tech Highlights

- Responsive and mobile-first UI using **Tailwind CSS**
- **Redux Toolkit** for efficient global state management
- **JWT-based authentication** for users and admin
- **Cloudinary integration** for optimized image uploads and delivery
- **Secure checkout** with PayPal integration
- Modular **routes–controllers** architecture for clean and maintainable backend logic
- Separate **frontend and backend** with concurrent development setup

---

## Key Features

### User

- Sign up, log in, or continue as a guest
- Browse categorized products by gender, type, and collection
- Search, sort and filter products based on color, size, price and more
- Add multiple variations of a product (different sizes/colors)
- Secure payment through PayPal
- View order history and details

### Admin

- Add, edit, and delete products
- Manage users (view, edit, delete)
- Approve or cancel orders
- Access all order and product details through a dashboard

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/sanskritiigarg/Stitches.git
   cd stitches
   ```

2. **Install Dependencies**

   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. **Run the application**  
   Open two terminals or use a concurrent command:

   ```bash
   # Frontend
   cd frontend
   npm run dev

   # Backend
   cd backend
   npm run dev
   ```

4. The app will start at your configured ports default: `frontend:5173, backend:5000`.

## 🔑 Environment Variables

### Frontend

| Variable                | Description                              |
| ----------------------- | ---------------------------------------- |
| `VITE_BACKEND_URL`      | Base URL for backend API requests        |
| `VITE_PAYPAL_CLIENT_ID` | PayPal client ID for processing payments |

### Backend

| Variable               | Description                               |
| ---------------------- | ----------------------------------------- |
| `PORT`                 | Port number for the backend server        |
| `MONGO_URI`            | MongoDB connection string                 |
| `JWT_SECRET`           | Secret key for generating JSON Web Tokens |
| `CLOUDINARY_NAME`      | Cloudinary account name                   |
| `CLOUDINARY_APIKEY`    | Cloudinary API key                        |
| `CLOUDINARY_APISECRET` | Cloudinary API secret                     |

## Project Structure

```bash
├── .gitignore
├── .husky
│   └── pre-commit
├── .prettierignore
├── .prettierrc.js
├── README.md
├── backend
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── seeder.js
│   └── server.js
├── frontend
│   ├── public/
│   ├── redux/
│   ├── src/
│   ├── index.html
│   └── vite.config.js
├── package-lock.json
└── package.json
```

## License

This project is licensed under the MIT License – you’re free to use, modify, and distribute it with attribution.
