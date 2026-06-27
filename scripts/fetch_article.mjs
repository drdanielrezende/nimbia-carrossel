import puppeteer from 'puppeteer';

(async () => {
  const url = process.argv[2];
  if (!url) {
    console.error("Please provide a URL");
    process.exit(1);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Wait for some content to be rendered in #root
    await page.waitForFunction(() => {
      const root = document.querySelector('#root');
      return root && root.innerText.length > 100;
    }, { timeout: 10000 }).catch(() => console.log('Timeout waiting for root content'));
    
    // Extract text
    const text = await page.evaluate(() => {
      // Basic extraction, trying to avoid headers/footers if possible, but innerText works
      return document.body.innerText;
    });
    
    console.log("--- START TEXT ---");
    console.log(text);
    console.log("--- END TEXT ---");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await browser.close();
  }
})();
