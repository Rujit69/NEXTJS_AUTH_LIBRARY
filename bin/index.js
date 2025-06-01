#!/usr/bin/env node
const path = require("path");
const fs = require("fs-extra");
const { execSync } = require("child_process");

const cwd = process.cwd();
const templateDir = path.join(__dirname, "../template");

async function setupProject() {
  try {
    console.log("📦 Copying rujit_form template files...");

    // Copy template files to the current working directory
    await fs.copy(templateDir, cwd, { overwrite: true });
    console.log("✅ rujit_form setup complete!");

    console.log("📦 Installing required dependencies...");
    // Install required dependencies in the current project.
    execSync("npm install next-auth fs-extra mongoose bcryptjs", {
      stdio: "inherit",
    });
    console.log("✅ Dependencies installed!");
  } catch (err) {
    console.error("❌ Failed to setup project:", err);
  }
}

setupProject();
