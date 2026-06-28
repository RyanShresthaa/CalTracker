# CalorieTracker API Documentation

Base URL: `http://localhost:5000/api`

All protected endpoints require `Authorization: Bearer <token>` header.

---

## Authentication

### POST /auth/register
Create a new user account.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```
**Response:** `{ token, user }`

---

### POST /auth/login
**Body:** `{ email, password }`
**Response:** `{ token, user }`

---

### POST /auth/complete-profile
Complete onboarding after registration.

**Body:**
```json
{
  "age": 28,
  "sex": "male",
  "height": 175,
  "currentWeight": 75,
  "goalWeight": 70,
  "activityLevel": "moderately_active",
  "goal": "lose_weight",
  "goalDate": "2024-06-01"
}
```
Activity levels: `sedentary | lightly_active | moderately_active | very_active | athlete`

Goals: `lose_weight | maintain_weight | gain_weight`

---

## Dashboard

### GET /dashboard
Returns the full daily summary.

**Response:**
```json
{
  "calories": { "goal": 1800, "consumed": 1200, "burned": 300, "remaining": 900 },
  "macros": {
    "protein": { "consumed": 85, "goal": 135 },
    "carbs": { "consumed": 160, "goal": 200 },
    "fat": { "consumed": 40, "goal": 50 }
  },
  "water": { "consumed": 1500, "goal": 2000 },
  "streak": 5,
  "weeklyData": [...],
  "activities": [...]
}
```

---

## Foods

### GET /foods
Search the food database.

**Query params:** `q` (search), `category`, `page`, `limit`

**Response:** `{ foods: [...], total, page, pages }`

Each food:
```json
{
  "id": "uuid",
  "name": "Momo (steamed)",
  "category": "Nepali Food",
  "servingSize": 200,
  "servingUnit": "g",
  "calories": 280,
  "protein": 16,
  "carbs": 36,
  "fat": 7,
  "fiber": 2,
  "sugar": 2,
  "sodium": 480
}
```

---

### GET /foods/barcode/:barcode
Look up food by barcode.

---

### POST /foods/custom
Create a custom food (authenticated).

**Body:** Same as food object (without id)

---

## Food Logs

### POST /food-logs
Log a food entry.

**Body:**
```json
{
  "foodId": "uuid-of-food",
  "mealType": "lunch",
  "amount": 250,
  "logDate": "2024-01-15"
}
```
Use `customFoodId` instead of `foodId` for custom foods.

---

### GET /food-logs?date=2024-01-15
Get all logs for a date, grouped by meal.

**Response:**
```json
{
  "logs": [...],
  "byMeal": {
    "breakfast": [...],
    "lunch": [...],
    "dinner": [...],
    "snacks": [...]
  },
  "totals": { "calories": 1200, "protein": 85, "carbs": 160, "fat": 40 }
}
```

---

## Water

### POST /water
```json
{ "amount": 500 }
```

### GET /water?date=2024-01-15
Returns `{ logs, total, history }`

---

## Weight

### POST /weight
```json
{ "weight": 70.5, "note": "Morning weight" }
```

### GET /weight?period=30
Returns `{ logs, currentWeight, goalWeight }`

---

## Activities

### POST /activities
```json
{
  "activityType": "running",
  "name": "Morning run",
  "duration": 45,
  "distance": 6.5,
  "speed": 8.7
}
```

For gym:
```json
{
  "activityType": "gym",
  "name": "Bench Press",
  "duration": 60,
  "sets": 4,
  "reps": 10,
  "weightUsed": 80
}
```

### GET /activities?date=2024-01-15
Returns `{ logs, totalCaloriesBurned, totalDuration }`

### GET /activities/history?period=30
Returns array of all activity logs in the period.

---

## User Profile

### GET /user/profile
Returns user data + calculated BMR, TDEE, BMI, and body fat estimate.

### PUT /user/profile
Update: name, age, height, currentWeight, goalWeight, activityLevel, goal

### PUT /user/password
```json
{
  "currentPassword": "oldpass",
  "newPassword": "newpass123"
}
```

---

## Settings

### GET /settings
### PUT /settings
```json
{
  "waterGoal": 2500,
  "units": "metric",
  "darkMode": true,
  "notifWater": true,
  "notifMeals": true,
  "notifWorkout": false
}
```

---

## Admin Endpoints

All require admin role.

### GET /admin/stats
### GET /admin/users?page=1&q=john
### DELETE /admin/users/:id
### GET /admin/foods?page=1&q=momo
### POST /admin/foods
### PUT /admin/foods/:id
### DELETE /admin/foods/:id

---

## Error Responses

```json
{ "error": "Human-readable error message" }
```

Validation errors:
```json
{
  "error": "Validation failed",
  "details": [{ "field": "email", "message": "Invalid email" }]
}
```

HTTP status codes: 200, 201, 400, 401, 403, 404, 500
