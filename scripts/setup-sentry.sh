#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Setting up Sentry for your React Native app...${NC}"

# Check if Sentry CLI is installed
if ! command -v sentry-cli &> /dev/null; then
    echo "Installing Sentry CLI..."
    curl -sL https://sentry.io/get-cli/ | bash
fi

# Prompt for Sentry organization
read -p "Enter your Sentry organization name: " SENTRY_ORG

# Prompt for Sentry project
read -p "Enter your Sentry project name: " SENTRY_PROJECT

# Prompt for Sentry DSN
read -p "Enter your Sentry DSN: " SENTRY_DSN

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    touch .env
fi

# Add Sentry DSN to .env file
if ! grep -q "SENTRY_DSN" .env; then
    echo "SENTRY_DSN=$SENTRY_DSN" >> .env
else
    sed -i '' "s|SENTRY_DSN=.*|SENTRY_DSN=$SENTRY_DSN|" .env
fi

# Update sentry.properties
cat > sentry.properties << EOL
defaults.url=https://sentry.io/
defaults.org=$SENTRY_ORG
defaults.project=$SENTRY_PROJECT
EOL

echo -e "${GREEN}Sentry setup complete!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Make sure to add .env to your .gitignore file"
echo "2. Run 'npx react-native-sentry-wizard' to complete the native setup"
echo "3. Test error reporting by adding: Sentry.captureException(new Error('Test error'))" 