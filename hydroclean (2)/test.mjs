import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error));

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'load' });
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch(e) { console.error('GOTO ERROR:', e.message); }
  
  await browser.close();
})();
