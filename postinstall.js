// postinstall.js
const inquirer = require('inquirer');
const chalk = require('chalk');

console.log(chalk.greenBright('\n🎉 Thanks for installing rujit_auth!'));

inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'runSetup',
      message: 'Would you like to auto-generate the auth files and folders now?',
      default: true,
    },
  ])
  .then((answers) => {
    if (answers.runSetup) {
      require('./bin/index'); // Call your actual CLI logic
    } else {
      console.log(chalk.yellow('⚠️ You can manually run: rujit_auth later.'));
    }
  });
