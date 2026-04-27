# PlantDoctor API

A comprehensive IoT-based plant monitoring and health assessment API built with Node.js, Express, and MongoDB. The system enables real-time monitoring of plant conditions through connected IoT devices, processes sensor data, and provides AI-powered inference results for plant health diagnostics.

## Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **IoT Device Management**: Register and manage connected plant monitoring devices
- **Real-time Telemetry**: Collect and process sensor data from IoT devices (temperature, humidity, soil moisture, etc.)
- **AI Inference Engine**: Process sensor data through machine learning models for plant health predictions
- **Dashboard Analytics**: Aggregated statistics and insights for plant monitoring
- **Real-time Communication**: Socket.io integration for live updates and alerts
- **Background Jobs**: Automated alert triggers and analytics processing
- **Admin Panel**: System-level management and monitoring capabilities

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with JWT and local strategies
- **Real-time**: Socket.io
- **Validation**: Joi
- **Security**: Helmet, CORS, bcrypt for password hashing
- **Scheduling**: Node-cron for background jobs
- **Email**: Resend for notifications

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CassimJT/PlantDoctor_API.git
   cd PlantDoctor_API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/plantdoctor
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_refresh_token_secret
   EMAIL_API_KEY=your_resend_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **For production**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Users
- `GET /api/users` - Get user profile
- `PUT /api/users` - Update user profile
- `DELETE /api/users` - Delete user account

### Devices
- `GET /api/devices` - List user's devices
- `POST /api/devices` - Register new device
- `GET /api/devices/:id` - Get device details
- `PUT /api/devices/:id` - Update device
- `DELETE /api/devices/:id` - Remove device

### Telemetry
- `POST /api/telemetry` - Submit sensor data (device auth required)
- `GET /api/telemetry/:deviceId` - Get telemetry data for device
- `GET /api/telemetry/:deviceId/latest` - Get latest readings

### Inference
- `GET /api/inference/:deviceId` - Get inference results for device
- `POST /api/inference/process` - Trigger inference processing (admin)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/alerts` - Get active alerts
- `GET /api/dashboard/analytics` - Get analytics data

### Admin (Admin role required)
- `GET /api/admin/users` - List all users
- `GET /api/admin/devices` - List all devices
- `GET /api/admin/system-status` - System health check
- `POST /api/admin/maintenance` - Run maintenance tasks

## Project Structure

```
src/
├── config/
│   ├── db.mjs                    # Database connection
│   └── passport/
│       ├── index.mjs            # Passport configuration
│       ├── jwt.strategy.mjs     # JWT strategy
│       ├── local.strategy.mjs   # Local auth strategy
│       └── refresh.strategy.mjs # Refresh token strategy
├── controllers/
│   ├── auth.controller.mjs      # Authentication logic
│   ├── user.controller.mjs      # User management
│   ├── device.controller.mjs    # Device management
│   ├── telemetry.controller.mjs # Sensor data handling
│   ├── inference.controller.mjs # AI inference results
│   ├── dashboard.controller.mjs # Dashboard data
│   └── admin.controller.mjs     # Admin operations
├── middleware/
│   ├── auth.middleware.mjs      # JWT authentication
│   ├── error.middleware.mjs     # Error handling
│   └── role.middleware.mjs      # Role-based access
├── models/
│   ├── User.mjs                 # User schema
│   ├── Device.mjs               # Device schema
│   ├── Telemetry.mjs            # Sensor data schema
│   ├── Inference.mjs            # Inference results schema
│   ├── RefreshToken.mjs         # Refresh token schema
│   └── AuditLog.mjs             # Audit logging schema
├── routes/
│   ├── auth.routes.mjs          # Auth endpoints
│   ├── user.routes.mjs          # User endpoints
│   ├── device.routes.mjs        # Device endpoints
│   ├── telemetry.routes.mjs     # Telemetry endpoints
│   ├── inference.routes.mjs     # Inference endpoints
│   ├── dashboard.routes.mjs     # Dashboard endpoints
│   └── admin.routes.mjs         # Admin endpoints
├── jobs/
│   ├── alert.job.mjs            # Alert processing
│   ├── analytics.job.mjs        # Analytics aggregation
│   └── cleanup.job.mjs          # Data cleanup
├── utils/
│   ├── jwt.mjs                  # JWT utilities
│   ├── password.mjs             # Password hashing
│   ├── validators.mjs           # Input validation
│   ├── constants.mjs            # App constants
│   ├── email.mjs                # Email utilities
│   ├── socket.mjs               # Socket.io handlers
│   └── helpers.mjs              # General helpers
└── index.mjs                    # Application entry point
```

## Usage

### Device Integration

IoT devices can submit telemetry data using device-specific API keys:

```bash
curl -X POST http://localhost:5000/api/telemetry \
  -H "Content-Type: application/json" \
  -H "X-Device-Key: your_device_api_key" \
  -d '{
    "temperature": 25.5,
    "humidity": 65.2,
    "soilMoisture": 45.8,
    "lightLevel": 1200
  }'
```

### Real-time Updates

The API supports real-time updates via Socket.io. Clients can listen for events like:
- `telemetry-update`: New sensor data received
- `alert-triggered`: Plant health alerts
- `inference-complete`: New AI predictions available

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (defaults to 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_REFRESH_SECRET` | Refresh token secret | Yes |
| `EMAIL_API_KEY` | Resend API key for notifications | No |

## Development

- Run tests: `npm test`
- Development server with auto-reload: `npm run dev`
- Production build: `npm start`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email the development team or create an issue in the GitHub repository.