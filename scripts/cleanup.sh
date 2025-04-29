#!/bin/bash

echo "🧹 Starting cleanup process..."

# Remove build directories
echo "Removing build directories..."
rm -rf ios/build
rm -rf android/build
rm -rf android/app/build
rm -rf .expo
rm -rf coverage

# Clean iOS simulators and derived data
echo "Cleaning iOS simulators and derived data..."
# List all simulators except iPhone 16
xcrun simctl list devices | grep -v "iPhone 16" | grep -v "unavailable" | grep -v "Shutdown" | grep -v "Booted" | cut -d "(" -f2 | cut -d ")" -f1 | while read -r uuid; do
    echo "Deleting simulator: $uuid"
    xcrun simctl delete "$uuid"
done

# Clean derived data but keep iPhone 16 related files
echo "Cleaning derived data..."
find ~/Library/Developer/Xcode/DerivedData/* -maxdepth 0 -type d -not -name "*iPhone16*" -exec rm -rf {} +

# Clean npm/yarn caches
echo "Cleaning npm and yarn caches..."
yarn cache clean
npm cache clean --force

# Remove node_modules and reinstall
echo "Removing node_modules..."
rm -rf node_modules
yarn install

# Clean iOS build artifacts
echo "Cleaning iOS build artifacts..."
cd ios
xcodebuild clean
cd ..

# Clean Android build artifacts
echo "Cleaning Android build artifacts..."
cd android
./gradlew clean
cd ..

echo "✨ Cleanup complete!" 