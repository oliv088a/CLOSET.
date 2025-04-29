import { device, element, by, expect, waitFor } from 'detox';
import { beforeAll, beforeEach, afterAll } from '@jest/globals';

// Increase the default timeout for all tests
jest.setTimeout(120000);

// Common test utilities
export const waitForElement = async (id: string, timeout = 5000): Promise<void> => {
  await waitFor(element(by.id(id)))
    .toBeVisible()
    .withTimeout(timeout);
};

export const waitForElementToBeGone = async (id: string, timeout = 5000): Promise<void> => {
  await waitFor(element(by.id(id)))
    .not.toBeVisible()
    .withTimeout(timeout);
};

export const tapElement = async (id: string): Promise<void> => {
  await element(by.id(id)).tap();
};

export const typeText = async (id: string, text: string): Promise<void> => {
  await element(by.id(id)).typeText(text);
};

export const clearText = async (id: string): Promise<void> => {
  await element(by.id(id)).clearText();
};

export const scrollToElement = async (
  id: string,
  direction: 'up' | 'down' = 'down'
): Promise<void> => {
  await element(by.id(id)).scrollTo(direction === 'up' ? 'top' : 'bottom');
};

// Common test setup
beforeAll(async () => {
  // Launch the app
  await device.launchApp({
    newInstance: true,
    permissions: {
      notifications: 'YES',
      camera: 'YES',
      photos: 'YES',
      location: 'always',
      contacts: 'YES',
      calendar: 'YES',
    },
  });
});

beforeEach(async () => {
  // Relaunch the app before each test to ensure a clean state
  await device.reloadReactNative();
});

afterAll(async () => {
  // Clean up after all tests
  await device.terminateApp();
});
