const { remote } = require("webdriverio");

const capabilities = {
  platformName: "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Android",
  //   'appium:appPackage': 'com.android.settings',
  //   'appium:appActivity': '.Settings',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || "localhost",
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: "info",
  capabilities,
};


async function runTest() {
  const driver = await remote(wdOpts);

  try {
    const element = await driver.$("~todayweather");
    await element.click();
    const closeEle = await driver.$("~closebutton");
    await closeEle.click()

  } finally {
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
