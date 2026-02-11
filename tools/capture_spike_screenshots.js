/**
 * Captures screenshots of spike.html for each test case.
 * Run: npx playwright install chromium && node tools/capture_spike_screenshots.js
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '..', 'screenshots');
const BASE = 'http://localhost:8080';

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  try {
    await page.goto(`${BASE}/spike.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage .node, #stage .cluster-box', { timeout: 5000 });

    // Case 10 (default)
    await page.screenshot({ path: path.join(OUT_DIR, 'case10-default.png'), fullPage: true });
    console.log('Saved case10-default.png');

    // Case 8
    await page.click('#case8');
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT_DIR, 'case8.png'), fullPage: true });
    console.log('Saved case8.png');

    // Case 9
    await page.click('#case9');
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT_DIR, 'case9.png'), fullPage: true });
    console.log('Saved case9.png');

    // Case 6
    await page.click('#case6');
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT_DIR, 'case6.png'), fullPage: true });
    console.log('Saved case6.png');
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
