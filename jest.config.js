module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|@react-native-firebase|@sentry/react-native|react-native-reanimated|react-native-gesture-handler|react-native-safe-area-context|react-native-screens|@react-native-async-storage/async-storage|react-native-vector-icons|react-native-image-picker|react-native-document-picker|react-native-fs|react-native-share|react-native-calendar-events|react-native-weather-api|react-native-config|react-native-dotenv|react-native-google-signin|react-native-fbsdk-next|react-native-appsflyer|react-native-branch|react-native-deep-link|react-native-push-notification|react-native-permissions|react-native-camera|react-native-qrcode-scanner|react-native-barcode-scanner-google|react-native-maps|react-native-geolocation-service|react-native-weather-api|react-native-config|react-native-dotenv|react-native-google-signin|react-native-fbsdk-next|react-native-appsflyer|react-native-branch|react-native-deep-link|react-native-push-notification|react-native-permissions|react-native-camera|react-native-qrcode-scanner|react-native-barcode-scanner-google|react-native-maps|react-native-geolocation-service)/)',
  ],
  setupFiles: ['<rootDir>/src/test/setup.ts', '<rootDir>/src/test/setupReactNative.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setupAfterEnv.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/test/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/test/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
    '!src/**/types.ts',
    '!src/**/constants.ts',
    '!src/**/theme.ts',
    '!src/**/navigation.ts',
    '!src/**/App.tsx',
    '!src/**/index.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  verbose: true,
};
