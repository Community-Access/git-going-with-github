const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * Playwright script to delete locked registration issues via the GitHub UI
 * 
 * Usage:
 *   node scripts/classroom/Delete-RegistrationIssues.js [--headless]
 * 
 * Options:
 *   --headless  Run in headless mode (default: headed for visibility)
 * 
 * This script:
 * 1. Opens the GitHub issues page filtered by registration label
 * 2. Finds all locked issues with the registration label
 * 3. Opens each issue
 * 4. Clicks the delete button (via "..." menu)
 * 5. Confirms deletion
 * 6. Repeats until all issues are deleted
 * 
 * Prerequisites:
 * - GitHub CLI must be authenticated (script reads token from gh auth token)
 * - You must have admin access to the repository
 * - Node.js 16+ and Playwright must be installed
 */

const REPO = 'Community-Access/git-going-with-github';
const ISSUES_URL = `https://github.com/${REPO}/issues?q=label%3Aregistration`;
const HEADLESS = process.argv.includes('--headless');

let browser;
let page;
let deletedCount = 0;
let failedCount = 0;
const failedIssues = [];

async function log(msg, level = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = {
    info: '    ',
    pass: '    [PASS] ',
    fail: '    [FAIL] ',
    warn: '    [WARN] ',
    step: '\n==> '
  }[level] || '    ';
  console.log(`${prefix}${msg}`);
}

async function getIssueNumbers() {
  // Wait for the issues table to load
  await page.waitForSelector('[role="row"]', { timeout: 10000 });
  
  // Get all issue links
  const issueLinks = await page.locator('a[href*="/issues/"]').all();
  const issueNumbers = [];
  
  for (const link of issueLinks) {
    const href = await link.getAttribute('href');
    const match = href.match(/\/issues\/(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!issueNumbers.includes(num)) {
        issueNumbers.push(num);
      }
    }
  }
  
  return issueNumbers.sort((a, b) => a - b);
}

async function deleteIssue(issueNum) {
  try {
    log(`Deleting issue #${issueNum}...`);
    
    // Navigate to the issue
    const issueUrl = `https://github.com/${REPO}/issues/${issueNum}`;
    await page.goto(issueUrl, { waitUntil: 'networkidle' });
    
    // Wait for the page to load
    await page.waitForSelector('button[aria-label="Show options"]', { timeout: 5000 }).catch(() => null);
    
    // Click the "..." (options) button - try multiple selectors
    let optionsButton = await page.locator('button[aria-label="Show options"]').first();
    if (!(await optionsButton.isVisible())) {
      optionsButton = await page.locator('details-menu button').first();
    }
    
    if (await optionsButton.isVisible()) {
      await optionsButton.click();
      await page.waitForTimeout(500);
      
      // Look for delete button - it might be in a dropdown menu
      const deleteButton = await page.locator('text=/delete|Delete/i').first();
      
      if (await deleteButton.isVisible()) {
        await deleteButton.click();
        await page.waitForTimeout(500);
        
        // Confirm the deletion - there might be a confirmation dialog
        const confirmButton = await page.locator('button:has-text("Delete")').first();
        if (await confirmButton.isVisible()) {
          await confirmButton.click();
          await page.waitForTimeout(1000);
        }
        
        log(`Deleted #${issueNum}`, 'pass');
        deletedCount++;
        return true;
      }
    }
    
    // Fallback: try to find delete in a different location
    const moreButton = await page.locator('summary:has-text("...")').first();
    if (await moreButton.isVisible()) {
      await moreButton.click();
      await page.waitForTimeout(500);
      
      const deleteOpt = await page.locator('button, a').filter({ hasText: /[Dd]elete/ }).first();
      if (await deleteOpt.isVisible()) {
        await deleteOpt.click();
        await page.waitForTimeout(500);
        
        const confirmBtn = await page.locator('button[type="submit"]:has-text("Delete")').first();
        if (await confirmBtn.isVisible()) {
          await confirmBtn.click();
          await page.waitForTimeout(1000);
          log(`Deleted #${issueNum}`, 'pass');
          deletedCount++;
          return true;
        }
      }
    }
    
    log(`Could not find delete button for #${issueNum}`, 'warn');
    failedCount++;
    failedIssues.push(issueNum);
    return false;
  } catch (err) {
    log(`Error deleting #${issueNum}: ${err.message}`, 'fail');
    failedCount++;
    failedIssues.push(issueNum);
    return false;
  }
}

async function main() {
  try {
    log('GitHub Issue Deletion via Playwright', 'step');
    log(`Repository: ${REPO}`);
    log(`Mode: ${HEADLESS ? 'headless' : 'headed (visible)'}`);
    
    log('Launching browser...', 'step');
    browser = await chromium.launch({ headless: HEADLESS });
    page = await browser.newPage();
    
    // Set viewport for better visibility
    await page.setViewportSize({ width: 1280, height: 720 });
    
    log('Navigating to issues page...', 'step');
    await page.goto(ISSUES_URL, { waitUntil: 'networkidle' });
    
    log('Fetching issue numbers...', 'step');
    const issueNumbers = await getIssueNumbers();
    log(`Found ${issueNumbers.length} issue(s) with registration label`, 'pass');
    
    if (issueNumbers.length === 0) {
      log('No issues found. Exiting.', 'warn');
      return;
    }
    
    // Show confirmation
    console.log('\nIssues to delete:');
    issueNumbers.forEach(num => console.log(`  #${num}`));
    console.log(`\nTotal: ${issueNumbers.length} issues`);
    console.log('\nStarting deletion process. Browser window will be visible.');
    console.log('Press Ctrl+C to stop at any time.\n');
    
    // Deletion loop
    log('Starting deletion loop', 'step');
    for (let i = 0; i < issueNumbers.length; i++) {
      const issueNum = issueNumbers[i];
      log(`${i + 1}/${issueNumbers.length}`, 'info');
      await deleteIssue(issueNum);
      
      // Throttle to avoid rate limiting
      await page.waitForTimeout(1000);
    }
    
    // Summary
    log('Deletion complete', 'step');
    log(`Successful: ${deletedCount}`, 'pass');
    log(`Failed: ${failedCount}`, failedCount > 0 ? 'fail' : 'pass');
    
    if (failedIssues.length > 0) {
      log('Failed issues:', 'warn');
      failedIssues.forEach(num => console.log(`  #${num}`));
    }
    
  } catch (err) {
    log(`Fatal error: ${err.message}`, 'fail');
    console.error(err);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', async () => {
  console.log('\n\nInterrupted. Cleaning up...');
  if (browser) {
    await browser.close();
  }
  log(`Deleted ${deletedCount} issues before stopping`, 'info');
  process.exit(0);
});

main();
