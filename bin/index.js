#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");

const cwd = process.cwd();
const templateDir = path.join(__dirname, "../template");

async function copyTemplate() {
  try {
    console.log("📦 Copying rujit_auth template files...");

    await fs.copy(templateDir, cwd, { overwrite: true });
    console.log("✅ rujit_auth setup complete!");
  } catch (err) {
    console.error("❌ Failed to copy files:", err);
  }
}

copyTemplate();
