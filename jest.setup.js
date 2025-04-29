import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';

// Mock window for React Native Web
global.window = global;
global.window.addEventListener = () => {};
global.window.removeEventListener = () => {};

// Mock FormData
global.FormData = class FormData {
  append() {}
  set() {}
  get() {}
  getAll() {}
  delete() {}
  entries() {}
  values() {}
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    blob: () => Promise.resolve(new Blob()),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  })
);

// Mock React Native modules
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.SettingsManager = {
    settings: {
      AppleLocale: 'en_US',
      AppleLanguages: ['en'],
    },
  };

  // Create a simple mock for ActivityIndicator
  const ActivityIndicator = jest.fn(({ size, color, ...props }) => ({
    type: 'ActivityIndicator',
    props: {
      size: size || 'small',
      color: color || '#999999',
      ...props,
    },
  }));
  ActivityIndicator.displayName = 'ActivityIndicator';

  return {
    ...RN,
    ActivityIndicator,
    Platform: {
      ...RN.Platform,
      OS: 'ios',
      Version: 13,
      select: jest.fn((obj) => obj.ios),
    },
    NativeModules: RN.NativeModules,
    NativeEventEmitter: jest.fn(() => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
    Dimensions: {
      ...RN.Dimensions,
      get: jest.fn(() => ({ width: 375, height: 812 })),
    },
    StyleSheet: {
      ...RN.StyleSheet,
      create: jest.fn((styles) => styles),
    },
    Animated: {
      Value: jest.fn(() => ({
        setValue: jest.fn(),
        interpolate: jest.fn(),
      })),
      timing: jest.fn(() => ({
        start: jest.fn(),
      })),
      spring: jest.fn(() => ({
        start: jest.fn(),
      })),
      decay: jest.fn(() => ({
        start: jest.fn(),
      })),
      sequence: jest.fn(),
      parallel: jest.fn(),
      loop: jest.fn(),
      event: jest.fn(),
      createAnimatedComponent: jest.fn((component) => component),
    },
    Image: {
      ...RN.Image,
      getSize: jest.fn((uri, success) => success(100, 100)),
    },
  };
});

// Mock EventEmitter
jest.mock('react-native/Libraries/vendor/emitter/EventEmitter', () => {
  return class MockEventEmitter {
    constructor() {
      this.listeners = new Map();
    }

    addListener(eventType, listener) {
      if (!this.listeners.has(eventType)) {
        this.listeners.set(eventType, new Set());
      }
      this.listeners.get(eventType).add(listener);
      return {
        remove: () => {
          this.listeners.get(eventType).delete(listener);
        },
      };
    }

    emit(eventType, ...args) {
      const listeners = this.listeners.get(eventType);
      if (listeners) {
        listeners.forEach((listener) => listener(...args));
      }
    }

    removeAllListeners(eventType) {
      if (eventType) {
        this.listeners.delete(eventType);
      } else {
        this.listeners.clear();
      }
    }
  };
});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
  return class MockNativeEventEmitter {
    constructor() {
      this.listeners = new Map();
    }

    addListener(eventType, listener) {
      if (!this.listeners.has(eventType)) {
        this.listeners.set(eventType, new Set());
      }
      this.listeners.get(eventType).add(listener);
      return {
        remove: () => {
          this.listeners.get(eventType).delete(listener);
        },
      };
    }

    emit(eventType, ...args) {
      const listeners = this.listeners.get(eventType);
      if (listeners) {
        listeners.forEach((listener) => listener(...args));
      }
    }

    removeAllListeners(eventType) {
      if (eventType) {
        this.listeners.delete(eventType);
      } else {
        this.listeners.clear();
      }
    }
  };
});

// Mock Expo modules
jest.mock('expo-modules-core', () => ({
  EventEmitter: class MockEventEmitter {
    constructor() {
      this.listeners = new Map();
    }

    addListener(eventType, listener) {
      if (!this.listeners.has(eventType)) {
        this.listeners.set(eventType, new Set());
      }
      this.listeners.get(eventType).add(listener);
      return {
        remove: () => {
          this.listeners.get(eventType).delete(listener);
        },
      };
    }

    emit(eventType, ...args) {
      const listeners = this.listeners.get(eventType);
      if (listeners) {
        listeners.forEach((listener) => listener(...args));
      }
    }

    removeAllListeners(eventType) {
      if (eventType) {
        this.listeners.delete(eventType);
      } else {
        this.listeners.clear();
      }
    }
  },
  Platform: { OS: 'ios' },
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
  isLoading: jest.fn(() => false),
}));

jest.mock('expo-asset', () => ({
  Asset: {
    loadAsync: jest.fn(() => Promise.resolve()),
    fromModule: jest.fn(() => ({ uri: 'test-uri' })),
  },
}));

jest.mock('expo-localization', () => ({
  locale: 'en-US',
  locales: ['en-US'],
  isRTL: false,
  timezone: 'America/Los_Angeles',
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock FileSystem
jest.mock('expo-file-system', () => ({
  cacheDirectory: 'file://cache/',
  documentDirectory: 'file://documents/',
  downloadAsync: jest.fn(() => Promise.resolve({ uri: 'downloaded-file' })),
  getInfoAsync: jest.fn(() =>
    Promise.resolve({ exists: true, uri: 'test-uri', size: 1000, isDirectory: false })
  ),
  makeDirectoryAsync: jest.fn(() => Promise.resolve()),
  moveAsync: jest.fn(() => Promise.resolve()),
  copyAsync: jest.fn(() => Promise.resolve()),
  writeAsStringAsync: jest.fn(() => Promise.resolve()),
  readAsStringAsync: jest.fn(() => Promise.resolve('test-content')),
  deleteAsync: jest.fn(() => Promise.resolve()),
  EncodingType: {
    Base64: 'base64',
    UTF8: 'utf8',
  },
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return {
    ...Reanimated,
    useAnimatedStyle: () => ({}),
    withSpring: () => 1,
    withTiming: () => 1,
    withDelay: () => 1,
    withSequence: () => 1,
    withRepeat: () => 1,
    SlideInDown: {
      delay: () => ({ springify: () => ({}) }),
      springify: () => ({}),
    },
    FadeInDown: {
      delay: () => ({}),
    },
    FadeIn: {
      delay: () => ({}),
    },
  };
});

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
}));

// Mock @react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useIsFocused: () => true,
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, size, color }) => `Ionicons-${name}-${size}-${color}`,
}));

// Mock NetInfo
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
}));

// Mock i18n-js
jest.mock('i18n-js', () => ({
  I18n: class {
    locale = 'en';
    defaultLocale = 'en';
    enableFallback = true;
    translations = {
      en: {
        common: {
          save: 'Save',
          cancel: 'Cancel',
        },
        auth: {
          welcome: 'Welcome {{name}}',
        },
      },
      es: {
        common: {
          save: 'Guardar',
          cancel: 'Cancelar',
        },
        auth: {
          welcome: 'Bienvenido {{name}}',
        },
      },
    };

    t(key, params) {
      const locale = (params && params.locale) || this.locale;
      const keys = key.split('.');
      let translation = this.translations[locale];

      for (const k of keys) {
        translation = translation && translation[k];
        if (!translation) break;
      }

      if (!translation) {
        if (this.enableFallback && locale !== this.defaultLocale) {
          // Try default locale
          translation = this.translations[this.defaultLocale];
          for (const k of keys) {
            translation = translation && translation[k];
            if (!translation) break;
          }
        }
        if (!translation) return key;
      }

      if (params) {
        return translation.replace(/\{\{(\w+)\}\}/g, (match, key) => {
          return params[key] || match;
        });
      }

      return translation;
    }
  },
}));

// Mock translations
jest.mock(
  './src/services/i18n/translations/en.json',
  () => ({
    common: {
      save: 'Save',
      cancel: 'Cancel',
    },
  }),
  { virtual: true }
);

jest.mock(
  './src/services/i18n/translations/de.json',
  () => ({
    common: {
      save: 'Speichern',
      cancel: 'Abbrechen',
    },
  }),
  { virtual: true }
);

jest.mock(
  './src/services/i18n/translations/es.json',
  () => ({
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
    },
  }),
  { virtual: true }
);

jest.mock(
  './src/services/i18n/translations/fr.json',
  () => ({
    common: {
      save: 'Enregistrer',
      cancel: 'Annuler',
    },
  }),
  { virtual: true }
);

jest.mock(
  './src/services/i18n/translations/ja.json',
  () => ({
    common: {
      save: '保存',
      cancel: 'キャンセル',
    },
  }),
  { virtual: true }
);

jest.mock(
  './src/services/i18n/translations/ko.json',
  () => ({
    common: {
      save: '저장',
      cancel: '취소',
    },
  }),
  { virtual: true }
);

jest.mock(
  './src/services/i18n/translations/zh.json',
  () => ({
    common: {
      save: '保存',
      cancel: '取消',
    },
  }),
  { virtual: true }
);

// Mock environment variables
process.env.EXPO_PUBLIC_APP_VERSION = '1.0.0';
process.env.WEATHERSTACK_API_KEY = 'test_key';
process.env.GOOGLE_GEMINI_API_KEY = 'test_key';
process.env.FIREBASE_API_KEY = 'test_key';
process.env.FIREBASE_AUTH_DOMAIN = 'test_domain';
process.env.FIREBASE_PROJECT_ID = 'test_project';
process.env.FIREBASE_STORAGE_BUCKET = 'test_bucket';
process.env.FIREBASE_MESSAGING_SENDER_ID = 'test_sender';
process.env.FIREBASE_APP_ID = 'test_app_id';
process.env.SENTRY_DSN = 'test_dsn';

// Mock Firebase
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/analytics', () => ({
  getAnalytics: jest.fn(),
  logEvent: jest.fn(),
  setUserProperties: jest.fn(),
  isSupported: jest.fn().mockResolvedValue(true),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

// Mock Expo modules
jest.mock('expo-av', () => ({
  Video: jest.fn(),
  ResizeMode: {
    CONTAIN: 'contain',
    COVER: 'cover',
  },
}));

jest.mock('expo-updates', () => ({
  reloadAsync: jest.fn(),
}));

// Mock React Native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

// Mock safe area context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
  SafeAreaProvider: ({ children }) => children,
}));
