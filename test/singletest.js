var wd = require('wd')
var assert = require('assert')
var asserters = wd.asserters

var app = process.env.BROWSERSTACK_APP_ID

var desiredCaps = {
  'browserstack.user': 'johncarlodeleon1',
  'browserstack.key': 'EPnWvRvF8sxcKEC9xpat',
  'automationName': 'Appium',
  build: 'Node Android',
  name: 'single_test',
  device: 'Google Pixel 3',
  app: app,
  'browserstack.debug': true,
}
var driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub')

driver
  .init(desiredCaps)
  .then(function () {
    return driver.waitForElementByAccessibilityId(
      'Type a message...',
      asserters.isDisplayed && asserters.isEnabled,
      30000,
    )
  })
  .then(function (Input) {
    return Input.sendKeys('BrowserStack')
  })
  .fin(function () {
    return driver.quit()
  })
  .done()
