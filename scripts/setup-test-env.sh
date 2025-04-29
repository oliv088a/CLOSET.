#!/bin/bash

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "Homebrew is already installed"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    brew install node@18
else
    echo "Node.js is already installed"
fi

# Check if Watchman is installed (required for React Native)
if ! command -v watchman &> /dev/null; then
    echo "Installing Watchman..."
    brew install watchman
else
    echo "Watchman is already installed"
fi

# Check if CocoaPods is installed
if ! command -v pod &> /dev/null; then
    echo "Installing CocoaPods..."
    brew install cocoapods
else
    echo "CocoaPods is already installed"
fi

# Check if applesimutils is installed
if ! brew list applesimutils &> /dev/null; then
    echo "Installing applesimutils..."
    brew tap wix/brew
    brew install applesimutils
else
    echo "applesimutils is already installed"
fi

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Install iOS dependencies
echo "Installing iOS dependencies..."
cd ios && pod install && cd ..

# Check Android SDK
if [ ! -d "$HOME/Library/Android/sdk" ]; then
    echo "Please install Android Studio and Android SDK from https://developer.android.com/studio"
    echo "After installation, open Android Studio, go to Preferences > Appearance & Behavior > System Settings > Android SDK"
    echo "Install the SDK platforms and tools you need"
else
    echo "Android SDK is installed"
fi

echo "Setup complete! You can now run:"
echo "npm test         # Run unit tests"
echo "npm run e2e:ios # Run E2E tests on iOS" 