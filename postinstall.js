const readline = require('readline');
const fs = require('fs');
const path = require('path');

const filesAndFolders = [
  'pages/api/auth/[...nextauth].js',
  'models/User.js',
  'lib/dbConnect.js',
  'pages/auth/form.js'
];

function createFiles() {
  // Your logic to create files/folders here
  console.log('\nCreating files and folders...');
  filesAndFolders.forEach(file => {
    // Example: just create empty files for demo
    const fullPath = path.join(process.cwd(), file);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, '// Created by rujit_auth\n');
    }
  });
  console.log('Done!');
}

console.log('\nThis library will create the following files and folders:');
filesAndFolders.forEach(f => console.log(' - ' + f));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('\nWould you like to continue? (y/n): ', (answer) => {
  if (answer.toLowerCase() === 'y') {
    createFiles();
  } else {
    console.log('Installation aborted by user.');
  }
  rl.close();
});
