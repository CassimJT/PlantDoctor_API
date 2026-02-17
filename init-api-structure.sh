#!/bin/bash

echo "🚀 Creating Inference + IoT API structure..."

# Root
mkdir -p src

# ------------------------------------------------
# CONFIG
# ------------------------------------------------
mkdir -p src/config/passport

touch src/config/passport/index.mjs
touch src/config/passport/jwt.strategy.mjs
touch src/config/passport/local.strategy.mjs
touch src/config/passport/refresh.strategy.mjs

touch src/config/db.mjs
touch src/config/session.mjs
touch src/config/roles.mjs
touch src/config/env.mjs

# ------------------------------------------------
# CONTROLLERS
# ------------------------------------------------
mkdir -p src/controllers

touch src/controllers/auth.controller.mjs
touch src/controllers/user.controller.mjs
touch src/controllers/inference.controller.mjs
touch src/controllers/device.controller.mjs
touch src/controllers/telemetry.controller.mjs
touch src/controllers/dashboard.controller.mjs
touch src/controllers/admin.controller.mjs

# ------------------------------------------------
# MIDDLEWARE
# ------------------------------------------------
mkdir -p src/middleware

touch src/middleware/auth.middleware.mjs
touch src/middleware/deviceAuth.middleware.mjs
touch src/middleware/role.middleware.mjs
touch src/middleware/error.middleware.mjs
touch src/middleware/rateLimit.middleware.mjs
touch src/middleware/audit.middleware.mjs

# ------------------------------------------------
# MODELS
# ------------------------------------------------
mkdir -p src/models

touch src/models/User.mjs
touch src/models/Inference.mjs
touch src/models/Device.mjs
touch src/models/Telemetry.mjs
touch src/models/RefreshToken.mjs
touch src/models/AuditLog.mjs

# ------------------------------------------------
# ROUTES
# ------------------------------------------------
mkdir -p src/routes

touch src/routes/auth.routes.mjs
touch src/routes/user.routes.mjs
touch src/routes/inference.routes.mjs
touch src/routes/device.routes.mjs
touch src/routes/telemetry.routes.mjs
touch src/routes/admin.routes.mjs

# ------------------------------------------------
# SERVICES
# ------------------------------------------------
mkdir -p src/services

touch src/services/auth.service.mjs
touch src/services/inference.service.mjs
touch src/services/device.service.mjs
touch src/services/telemetry.service.mjs
touch src/services/dashboard.service.mjs

# ------------------------------------------------
# UTILS
# ------------------------------------------------
mkdir -p src/utils

touch src/utils/jwt.mjs
touch src/utils/password.mjs
touch src/utils/validators.mjs
touch src/utils/constants.mjs
touch src/utils/helper.mjs

# ------------------------------------------------
# JOBS
# ------------------------------------------------
mkdir -p src/jobs

touch src/jobs/cleanup.job.mjs
touch src/jobs/alert.job.mjs
touch src/jobs/analytics.job.mjs

# ------------------------------------------------
# ROOT FILES
# ------------------------------------------------
touch .env
touch index.mjs


echo "✔ Inference + IoT API structure created successfully."
