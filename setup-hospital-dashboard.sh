#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
PROJECT_NAME="my-hospital-dashboard"

# --- Script Start ---
echo "🚀 Starting Hospital Dashboard Frontend Setup..."

# Step 1: Create Vite project
if [ -d "$PROJECT_NAME" ]; then
  echo "⚠️ Directory '$PROJECT_NAME' already exists. Skipping project creation."
else
  echo "1. Creating Vite + React project: $PROJECT_NAME"
  npm create vite@latest "$PROJECT_NAME" -- --template react
fi

cd "$PROJECT_NAME"

# Step 2: Install dependencies
echo "2. Installing base dependencies (react-router-dom, axios)..."
npm install react-router-dom axios

# Step 3: Install and configure Tailwind CSS
echo "3. Installing and configuring Tailwind CSS..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Step 4: Remove Vite boilerplate
echo "4. Removing default Vite boilerplate files..."
rm -f src/App.css src/index.css src/assets/react.svg src/App.jsx

# Step 5: Create the professional directory structure
echo "5. Creating professional directory structure..."
mkdir -p src/api \
         src/assets/images \
         src/assets/fonts \
         src/components/ui \
         src/components/common \
         src/config \
         src/contexts \
         src/features/authentication/components \
         src/features/adminDashboard/components \
         src/features/doctorDashboard \
         src/features/inventory \
         src/features/ert \
         src/hooks \
         src/layouts \
         src/pages \
         src/routes \
         src/styles \
         src/utils

echo "Directory structure created."

# Step 6: Create empty files for the entire architecture
echo "6. Creating placeholder files..."
touch .env \
      src/api/axiosInstance.js \
      src/api/authApi.js \
      src/api/adminApi.js \
      src/api/doctorApi.js \
      src/api/inventoryApi.js \
      src/assets/images/.gitkeep \
      src/assets/fonts/.gitkeep \
      src/components/ui/Alert.jsx \
      src/components/ui/Button.jsx \
      src/components/ui/Card.jsx \
      src/components/ui/Input.jsx \
      src/components/ui/Loader.jsx \
      src/components/common/Header.jsx \
      src/components/common/PageTitle.jsx \
      src/components/common/Sidebar.jsx \
      src/config/index.js \
      src/contexts/AuthContext.jsx \
      src/features/authentication/components/LoginForm.jsx \
      src/features/authentication/components/RegisterForm.jsx \
      src/features/authentication/useLogin.js \
      src/features/adminDashboard/components/SurgeForecastChart.jsx \
      src/features/adminDashboard/components/ReadinessGauge.jsx \
      src/features/adminDashboard/components/ActionItemsList.jsx \
      src/features/adminDashboard/AdminDashboard.jsx \
      src/features/doctorDashboard/DoctorDashboard.jsx \
      src/features/inventory/InventoryDashboard.jsx \
      src/features/ert/ERTDashboard.jsx \
      src/hooks/useAuth.js \
      src/hooks/useApi.js \
      src/layouts/AppLayout.jsx \
      src/layouts/AuthLayout.jsx \
      src/layouts/PublicLayout.jsx \
      src/pages/AdminDashboardPage.jsx \
      src/pages/DoctorDashboardPage.jsx \
      src/pages/InventoryPage.jsx \
      src/pages/ERTPage.jsx \
      src/pages/LoginPage.jsx \
      src/pages/RegisterPage.jsx \
      src/pages/PublicAdvisoryPage.jsx \
      src/pages/NotFoundPage.jsx \
      src/routes/index.jsx \
      src/routes/ProtectedRoute.jsx \
      src/styles/index.css \
      src/utils/constants.js \
      src/utils/dateFormatter.js \
      src/App.jsx \
      src/main.jsx

echo "Placeholder files created."
echo "✅ All done! Project '$PROJECT_NAME' is set up."
echo "Next steps:"
echo "1. Populate the configuration files (vite.config.js, tailwind.config.js, src/styles/index.css)."
echo "2. Start coding your components!"
echo "3. Run 'npm run dev' to start the development server."