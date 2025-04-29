const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const envExamplePath = path.join(__dirname, '../.env.example');
const envPath = path.join(__dirname, '../.env');

// Check if .env already exists
if (fs.existsSync(envPath)) {
    console.log('⚠️ .env file already exists. Do you want to overwrite it? (y/n)');
    rl.question('', (answer) => {
        if (answer.toLowerCase() === 'y') {
            setupEnv();
        } else {
            console.log('Setup cancelled.');
            rl.close();
        }
    });
} else {
    setupEnv();
}

function setupEnv() {
    // Read the example file
    const envExample = fs.readFileSync(envExamplePath, 'utf8');

    // Create a new .env file
    fs.writeFileSync(envPath, envExample);

    console.log(`
✅ .env file created successfully!

Next steps:
1. Open the .env file and fill in your credentials:
   - Firebase credentials from your Firebase Console
   - Sentry DSN from your Sentry project
   - API keys for WeatherStack, Google Gemini, and Remove.bg
   - Google Sign-In credentials
   - Facebook App credentials
   - Analytics keys (Appsflyer, Branch)
   - Weather API credentials

2. Make sure to keep your .env file secure and never commit it to version control.

3. Run the app with:
   npx expo start
  `);

    rl.close();
} 