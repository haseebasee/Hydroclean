import { chromium } from "playwright";
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on("pageerror", (err) => console.log("ERROR MESSAGE:", err.message, err.stack));
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await browser.close();
})();
