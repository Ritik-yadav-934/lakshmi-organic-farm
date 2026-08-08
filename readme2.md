| Method | Path             | Auth        | Purpose                                                  |
| ------ | ---------------- | ----------- | -------------------------------------------------------- |
| GET    | `/products`      | Public      | List products. Optional `?category=` and `?search=`      |
| GET    | `/products/{id}` | Public      | Single product                                           |
| GET    | `/today`         | Public      | Products marked `fresh_today` and `available`            |
| POST   | `/products`      | Admin (JWT) | Create product                                           |
| PUT    | `/products/{id}` | Admin (JWT) | Update product (partial — send only changed fields)      |
| DELETE | `/products/{id}` | Admin (JWT) | Delete product                                           |
| POST   | `/upload`        | Admin (JWT) | Upload a product image to Cloudinary, returns `{ url }`  |
| POST   | `/auth/login`    | Public      | `{ email, password }` → `{ access_token }`               |
| GET    | `/auth/me`       | Admin (JWT) | Confirms the current token and returns the admin's email |
| GET    | `/health`        | Public      | Health check for deployment monitoring                   |


## Deployment 
# Current Production Deployment

| Component         | Platform            | Status       | Link                                                                                             |
| ----------------- | ------------------- | ------------ | ------------------------------------------------------------------------------------------------ |
| Frontend          | Vercel              | ✅ Live       | [https://lakshmi-organic-farm.vercel.app](https://lakshmi-organic-farm.vercel.app)               |
| Backend           | Render              | ✅ Live       | [https://lakshmi-organic-farm.onrender.com](https://lakshmi-organic-farm.onrender.com)           |
| API Documentation | FastAPI / Render    | ✅ Live       | [https://lakshmi-organic-farm.onrender.com/docs](https://lakshmi-organic-farm.onrender.com/docs) |
| Database          | Supabase PostgreSQL | ✅ Configured | Supabase                                                                                         |
| Image Storage     | Cloudinary          | ✅ Configured | Cloudinary                                                                                       |
