// test.js

const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver'); // This makes sure chromedriver is available

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Go to Google
    await driver.get('https://www.google.com');

    // Find the search box, type a query, and press Enter
    await driver.findElement(By.name('q')).sendKeys('Selenium JavaScript', Key.RETURN);

    // Wait until the results are shown
    await driver.wait(until.titleContains('Selenium JavaScript'), 10000);

    console.log("Search complete!");

  } finally {
    // Close the browser
    await driver.quit();
  }
})();
