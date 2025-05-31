// postinstall.js

// postinstall.js
const fs = require("fs");
fs.writeFileSync(
  "RUJIT_FORM_INSTALL.txt",
  "Thanks for installing rujit_form!\nRun `npx rujit_form`..."
);
console.error("\n🎉 Thanks for installing rujit_form!");
console.error(
  "Run `npx rujit_form` or `rujit_form` command to create files and folders in your project.\n"
);
