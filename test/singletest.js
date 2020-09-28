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
    return driver.elementByXPath(
      '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.EditText[1]',
      asserters.isDisplayed && asserters.isEnabled,
      30000,
    )
  })
  .then(function (username) {
    return username.sendKeys('deleon.johncarlo2016@gmail.com')
  })
  .then(function () {
    return driver.elementByXPath(
      '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.EditText[2]',
      asserters.isDisplayed && asserters.isEnabled,
      30000,
    )
  })
  .then(function (password) {
    return password.sendKeys('Carlo123')
  })
  .then(function () {
    return driver.elementByXPath(
      '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup',
      asserters.isDisplayed && asserters.isEnabled,
      30000,
    )
  })
  .then(function (login) {
    return login.click()
  })
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
