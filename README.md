# 🏋️ CalorieTracker — Full-Stack Health & Fitness App

A production-ready calorie and fitness tracking web application inspired by MyFitnessPal, built with React + TypeScript + Node.js + PostgreSQL.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 Authentication | Register, Login, Forgot/Reset Password, JWT sessions |
| 👤 User Profile | BMR/TDEE calculation, goal setting with realism validation |
| 🍎 Food Database | 200+ foods including Nepali, Indian, Asian cuisine |
| 📝 Food Logging | Log meals by type (Breakfast/Lunch/Dinner/Snacks) |
| 💧 Water Tracker | Track daily water intake with progress ring |
| ⚖️ Weight Tracker | Log weights, BMI, goal progress, trend charts |
| 💪 Activity Log | Gym, running, cycling, swimming, 10+ activities with MET calorie calc |
| 📊 Progress Charts | Weekly/monthly interactive charts for all metrics |
| ⚙️ Settings | Dark mode, units, notifications, password change |
| 🔧 Admin Panel | Manage users, foods, view statistics |

---

## 🛠 Tech Stack

**Frontend**
- React 18 + TypeScript + Vite
- Tailwind CSS (dark mode, glassmorphism, responsive)
- Recharts (interactive charts)
- React Hook Form + Zod (validation)
- Zustand (state management)
- Phosphor Icons

**Backend**
- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL
- JWT Authentication
- Zod validation
- Bcrypt, Helmet, Rate limiting

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ running locally

### 1. Clone & Install

```bash
git clone <repo-url>
cd calorie-tracker
npm run install:all
```

### 2. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/calorie_tracker"
JWT_SECRET="your-very-long-random-secret-key"
PORT=5000
FRONTEND_URL="http://localhost:5173"
```

### 3. Set Up Database

```bash
# From /backend directory:
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations
npm run db:seed        # Seed foods + demo users
```

### 4. Start Development Servers

**Option A — From root (runs both simultaneously):**
```bash
cd ..   # back to root
npm install   # installs concurrently
npm run dev
```

**Option B — Manually in two terminals:**

Terminal 1 (backend):
```bash
cd backend
npm run dev
# → API running at http://localhost:5000
```

Terminal 2 (frontend):
```bash
cd frontend
npm run dev
# → App running at http://localhost:5173
```

### 5. Login

Open **http://localhost:5173** and use:

| Role  | Email                        | Password       |
|-------|------------------------------|----------------|
| Admin | admin@calorietracker.com     | admin123456    |
| Demo  | demo@calorietracker.com      | demo123456     |

---

## 🐳 Docker Setup (Recommended for Production)

```bash
docker-compose up -d
```

This starts PostgreSQL, the backend API, and the frontend Nginx server.

After containers are healthy, seed the database:
```bash
docker-compose exec backend npm run db:seed
```

App is available at **http://localhost:5173**

---

## 📁 Project Structure

```
calorie-tracker/
├── frontend/
│   ├── src/
│   │   ├── pages/           # All page components
│   │   ├── components/
│   │   │   └── layout/      # Sidebar layout
│   │   ├── lib/
│   │   │   └── api.ts       # Axios API client
│   │   ├── store/
│   │   │   └── authStore.ts # Zustand auth + theme
│   │   └── App.tsx          # Router
│   └── ...
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── routes/          # Express routers
│   │   ├── middleware/       # Auth, error handling
│   │   ├── utils/           # Calorie calculations
│   │   ├── lib/
│   │   │   └── prisma.ts    # Prisma singleton
│   │   └── index.ts         # Express app
│   └── prisma/
│       ├── schema.prisma    # Database schema
│       └── seed.ts          # Food database seed
├── docker-compose.yml
└── README.md
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET  | `/api/auth/me` | Get current user |
| POST | `/api/auth/complete-profile` | Complete onboarding |
| POST | `/api/auth/forgot-password` | Request reset link |
| POST | `/api/auth/reset-password` | Reset with token |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Full daily summary |

### Foods
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/foods?q=banana` | Search foods |
| GET | `/api/foods/categories` | All categories |
| GET | `/api/foods/barcode/:code` | Lookup by barcode |
| GET | `/api/foods/custom` | User's custom foods |
| POST | `/api/foods/custom` | Create custom food |
| PUT | `/api/foods/custom/:id` | Update custom food |
| DELETE | `/api/foods/custom/:id` | Delete custom food |

### Food Logs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/food-logs?date=2024-01-15` | Get logs for date |
| POST | `/api/food-logs` | Add food log |
| PUT | `/api/food-logs/:id` | Update log |
| DELETE | `/api/food-logs/:id` | Delete log |

### Water / Weight / Activities
All follow the same pattern: `GET /`, `POST /`, `DELETE /:id`

- `/api/water`
- `/api/weight`
- `/api/activities`
- `/api/activities/history?period=30`

### Settings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings` | Get user settings |
| PUT | `/api/settings` | Update settings |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get profile with BMR/TDEE |
| PUT | `/api/user/profile` | Update profile |
| PUT | `/api/user/password` | Change password |

### Admin (requires admin role)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Platform statistics |
| GET | `/api/admin/users` | List all users |
| DELETE | `/api/admin/users/:id` | Delete user |
| GET | `/api/admin/foods` | List all foods |
| POST | `/api/admin/foods` | Create food |
| PUT | `/api/admin/foods/:id` | Update food |
| DELETE | `/api/admin/foods/:id` | Delete food |

---

## 🧮 Calorie Science

The app uses the **Mifflin-St Jeor Equation** to calculate calorie needs:

**BMR (Men):** `10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5`

**BMR (Women):** `10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161`

**TDEE** = BMR × Activity Multiplier (1.2 – 1.9)

**Calorie targets:**
- Fat Loss: TDEE − 500 kcal
- Muscle Gain: TDEE + 300 kcal

**Goal safety validation:** Maximum safe weight change is ~1% body weight per week (capped at 1 kg/week).

---

## 🌏 Food Database Includes

- 🇳🇵 **Nepali**: Dal Bhat, Momo, Sel Roti, Gundruk, Dhido, Chowmein, Thukpa, Buff curry, Chatamari, Yomari, Sukuti, and more
- 🇮🇳 **Indian**: Chicken Tikka Masala, Biryani, Palak Paneer, Dal, Samosa, Idli, Dosa
- 🌏 **Asian**: Sushi, Fried Rice, Pad Thai, Ramen, Dumplings
- 🍔 **Fast Food**: Big Mac, KFC, Pizza, Subway, Hot Dog
- 🥩 **Proteins**: Chicken, Beef, Fish, Eggs, Tofu
- 🥦 **Fresh**: 30+ fruits & vegetables
- 🥛 **Dairy**: Milk, Yogurt, Cheese, Butter
- 🌾 **Grains**: Rice, Pasta, Quinoa, Oats, Bread

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/calorie_tracker
JWT_SECRET=your-jwt-secret-min-32-chars
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
SMTP_HOST=smtp.gmail.com      # optional, for password reset emails
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-app-password
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Deployment

### Vercel + Railway (Recommended)
1. Deploy backend to Railway with PostgreSQL add-on
2. Set `DATABASE_URL` and `JWT_SECRET` environment variables
3. Run `npm run db:migrate && npm run db:seed` via Railway CLI
4. Deploy frontend to Vercel, set `VITE_API_URL` to your Railway URL

### VPS (Ubuntu)
```bash
# Install Node.js 20, PostgreSQL, PM2, Nginx
npm run install:all
cd backend && npm run db:migrate && npm run db:seed
pm2 start npm --name "api" -- run start
cd ../frontend && npm run build
# Serve dist/ via Nginx
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push and open a Pull Request

---

## 📄 License

MIT License — feel free to use this for personal or commercial projects.

---

Built with ❤️ using React, Node.js, and PostgreSQL.
