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
  os_version: '9.0',
  app: 'bs://03fcbfa118b1861b97e8c8a17b67b4fb00f63f2a',
  'browserstack.debug': true,
  autoGrantPermissions: true
}
var driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub')

// driver
//   .init(desiredCaps)
//   .then(function () {
//     return driver.waitForElementByAccessibilityId('Email',
//       asserters.isDisplayed && asserters.isEnabled,
//       30000,
//     )
//   })
//   .then(function (username) {
//     return username.sendKeys('deleon.johncarlo2016@gmail.com')
//   })
//   .then(function () {
//     return driver.waitForElementByAccessibilityId('Password',
//       asserters.isDisplayed && asserters.isEnabled,
//       30000,
//     )
//   })
//   .then(function (password) {
//     return password.sendKeys('Carlo123')
//   })
//   .then(function () {
//     return driver.waitForElementByAccessibilityId('Login',
//       asserters.isDisplayed && asserters.isEnabled,
//       30000,
//     )
//   })
//   .then(function (login) {
//     return login.click()
//   })
//   .then(function () {
//     return driver.waitForElementByAccessibilityId(
//       'Type a message...',
//       asserters.isDisplayed && asserters.isEnabled,
//       30000,
//     )
//   })
//   .then(function (Input) {
//     return Input.sendKeys('BrowserStack')
//   })
//   .fin(function () {
//     return driver.quit()
//   })
//   .done()

driver
  .init(desiredCaps)
  .then(function () {
    return driver.waitForElementByAccessibilityId('LoginFB',asserters.isDisplayed && asserters.isEnabled,30000)
  })
  .then(function (LoginFB) {
    return LoginFB.click()
  })
  .then(function () {
    // let contexts = driver.contexts()
    // driver.context(contexts[1])
    return driver.waitForElementByXPath('Username',asserters.isDisplayed && asserters.isEnabled,30000)
  })
  .then(function (Email) {
    return Email.sendKeys('carlzz74@yahoo.com')
  })
  .then(function () {
    // let contexts = driver.contexts()
    // driver.context(contexts[1])
    return driver.waitForElementByAccessibilityId('Password',asserters.isDisplayed && asserters.isEnabled,30000)
  })
  .then(function (Password) {
    return Password.sendKeys('Carlosniper123')
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('Log In',asserters.isDisplayed && asserters.isEnabled,30000)
  })
  .then(function (Login) {
    return Login.click()
  })
  .fin(function () {
    return driver.quit()
  })
  .done()
