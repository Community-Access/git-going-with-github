const { chromium } = require('playwright');
const { execSync } = require('child_process');

/**
 * Playwright script to delete locked registration issues via the GitHub UI
 * 
 * Usage:
 *   node scripts/classroom/Delete-RegistrationIssues-v2.js [--headless]
 */

const REPO = 'Community-Access/git-going-with-github';
const ISSUES_URL = `https://github.com/${REPO}/issues?q=label%3Aregistration`;
const HEADLESS = process.argv.includes('--headless');
const MAX_ARG_INDEX = process.argv.indexOf('--max');
const MAX_TO_DELETE = MAX_ARG_INDEX > -1 && process.argv[MAX_ARG_INDEX + 1]
  ? Number.parseInt(process.argv[MAX_ARG_INDEX + 1], 10)
  : null;

let browser;
let page;
let deletedCount = 0;
let failedCount = 0;

function log(msg, level = 'info') {
  const prefix = {
    info: '    ',
    pass: '    [PASS] ',
    fail: '    [FAIL] ',
    warn: '    [WARN] ',
    step: '\n==> '
  }[level] || '    ';
  console.log(`${prefix}${msg}`);
}

async function authenticate() {
  log('Getting GitHub auth context', 'step');
  try {
    const token = execSync('gh auth token', { encoding: 'utf-8' }).trim();
    log('GitHub authentication ready', 'pass');
    return token;
  } catch (err) {
    throw new Error('GitHub CLI not authenticated. Run: gh auth login');
  }
}

async function deleteIssue(issueNum) {
  try {
    log(`Deleting issue #${issueNum}...`);
    
    const issueUrl = `https://github.com/${REPO}/issues/${issueNum}`;
    await page.goto(issueUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    
    // Wait a moment for dynamic content
    await page.waitForTimeout(1000);
    
    // Look for the actions button (three dots) on the issue
    // GitHub usually has this in the top right or in an actions menu
    const detailsMenu = await page.locator('details-menu, details > summary').first();
    
    // Try clicking on various elements that might open the menu
    const actionButtons = [
      'button[aria-label="Show options"]',
      'button[aria-label="Show more"]', 
      'button:has-text("...")',
      'details > summary'
    ];
    
    let clicked = false;
    for (const selector of actionButtons) {
      const btn = await page.locator(selector).first();
      if (await btn.isVisible()) {
        await btn.click();
        await page.waitForTimeout(500);
        clicked = true;
        break;
      }
    }
    
    if (!clicked) {
      log(`No action menu found for #${issueNum}`, 'warn');
      failedCount++;
      return false;
    }
    
    // Look for delete option in the menu
    const deleteOption = await page.locator('button, a, [role="menuitem"]').filter({ 
      hasText: /delete|Delete/i 
    }).first();
    
    if (await deleteOption.isVisible()) {
      await deleteOption.click();
      await page.waitForTimeout(800);
      
      // Handle confirmation dialog
      const confirmButton = await page.locator('button').filter({ 
        hasText: /delete|Delete/ 
      }).filter({ hasText: /confirm/i }).first();
      
      if (await confirmButton.isVisible()) {
        await confirmButton.click();
        await page.waitForTimeout(1500);
        log(`Deleted #${issueNum}`, 'pass');
        deletedCount++;
        return true;
      } else {
        // Try any button that says delete as confirmation
        const anyDelete = await page.locator('button').filter({ 
          hasText: /^Delete$/i 
        }).first();
        if (await anyDelete.isVisible()) {
          await anyDelete.click();
          await page.waitForTimeout(1500);
          log(`Deleted #${issueNum}`, 'pass');
          deletedCount++;
          return true;
        }
      }
    }
    
    log(`Could not find delete option for #${issueNum}`, 'warn');
    failedCount++;
    return false;
  } catch (err) {
    log(`Error deleting #${issueNum}: ${err.message}`, 'fail');
    failedCount++;
    return false;
  }
}

async function main() {
  try {
    log('GitHub Issue Deletion via Playwright', 'step');
    log(`Repository: ${REPO}`);
    log(`Mode: ${HEADLESS ? 'headless' : 'headed (visible in browser)'}`);
    
    await authenticate();
    
    log('Launching Chromium browser...', 'step');
    browser = await chromium.launch({ headless: HEADLESS });
    page = await browser.newPage();
    
    await page.setViewportSize({ width: 1280, height: 720 });
    
    log('Navigating to issues page...', 'step');
    log(`URL: ${ISSUES_URL}`);
    await page.goto(ISSUES_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    log('Scanning for issue links...', 'step');
    const issueLinks = await page.locator(`a[href*="/${REPO}/issues/"]`).all();
    const issueNumbers = new Set();
    
    for (const link of issueLinks) {
      try {
        const href = await link.getAttribute('href');
        const match = href.match(/\/issues\/(\d+)/);
        if (match) {
          issueNumbers.add(parseInt(match[1], 10));
        }
      } catch (e) {
        // Skip
      }
    }
    
    let issues = Array.from(issueNumbers).sort((a, b) => a - b);

    if (Number.isInteger(MAX_TO_DELETE) && MAX_TO_DELETE > 0) {
      issues = issues.slice(0, MAX_TO_DELETE);
      log(`Limiting deletion to first ${MAX_TO_DELETE} issue(s) due to --max`, 'warn');
    }
    
    log(`Found ${issues.length} issue(s) with registration label`, 'pass');
    
    if (issues.length === 0) {
      log('No issues found to delete.', 'warn');
      return;
    }
    
    console.log('\nIssues to delete:');
    issues.slice(0, 20).forEach(num => console.log(`  #${num}`));
    if (issues.length > 20) {
      console.log(`  ... and ${issues.length - 20} more`);
    }
    console.log(`\nTotal: ${issues.length} issues\n`);
    
    log('Starting deletion sequence (browser will be visible)', 'step');
    log('This will take a few minutes. Press Ctrl+C to stop.\n');
    
    for (let i = 0; i < issues.length; i++) {
      const issueNum = issues[i];
      process.stdout.write(`[${i + 1}/${issues.length}] `);
      await deleteIssue(issueNum);
      
      // Rate limit throttle
      await page.waitForTimeout(800);
    }
    
    log('Deletion sequence complete', 'step');
    log(`Successfully deleted: ${deletedCount}`, deletedCount > 0 ? 'pass' : 'warn');
    log(`Failed: ${failedCount}`, failedCount > 0 ? 'fail' : 'pass');
    
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

process.on('SIGINT', async () => {
  console.log('\n\nStopping gracefully...');
  if (browser) await browser.close();
  log(`Deleted ${deletedCount} issues before stopping`, 'info');
  process.exit(0);
});

main();
