import { device, element, by, expect } from 'detox';
import { waitForElement, tapElement, typeText } from './setup';

describe('App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should show home screen after login', async () => {
    // Wait for the login screen to be visible
    await waitForElement('login-screen');

    // Type in email and password
    await typeText('email-input', 'test@example.com');
    await typeText('password-input', 'password123');

    // Tap the login button
    await tapElement('login-button');

    // Wait for the home screen to be visible
    await waitForElement('home-screen');
  });

  it('should navigate to profile screen', async () => {
    // Wait for the home screen to be visible
    await waitForElement('home-screen');

    // Tap the profile tab
    await tapElement('profile-tab');

    // Wait for the profile screen to be visible
    await waitForElement('profile-screen');
  });

  it('should show error message for invalid login', async () => {
    // Wait for the login screen to be visible
    await waitForElement('login-screen');

    // Type in invalid credentials
    await typeText('email-input', 'invalid@example.com');
    await typeText('password-input', 'wrongpassword');

    // Tap the login button
    await tapElement('login-button');

    // Wait for the error message to be visible
    await waitForElement('error-message');
  });
});
