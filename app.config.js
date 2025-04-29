module.exports = {
  name: 'Closet',
  slug: 'closet',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.oliv088a.closet',
    proguard: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.oliv088a.closet',
    proguard: true
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: [
    'expo-router'
  ],
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true
  },
  extra: {
    router: {
      origin: false
    },
    eas: {
      projectId: '67b2b622-de29-4112-bb29-db3c242b4169'
    }
  },
  runtimeVersion: {
    policy: 'sdkVersion'
  },
  updates: {
    url: process.env.EXPO_UPDATES_URL
  },
  developmentClient: {
    silentLaunch: true
  }
}; 