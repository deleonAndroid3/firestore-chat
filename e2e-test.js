/* eslint-disable no-unused-vars */
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
  app: 'bs://22f9d051b81cd5c5eb3fe5878d20b3b22adef75e',
  'browserstack.debug': true,
  autoGrantPermissions: true
}
var driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub')

driver
  .init(desiredCaps)
  .then(function () {
    return driver.waitForElementByAccessibilityId('Email', asserters.isDisplayed && asserters.isEnabled,30000)
  })
  .then(function (username) {
    return username.sendKeys('deleon.johncarlo2016@gmail.com')
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('Password', asserters.isDisplayed && asserters.isEnabled,30000)
  })
  .then(function (password) {
    return password.sendKeys('Carlo123')
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('Login', asserters.isDisplayed && asserters.isEnabled,30000)
  })
  .then(function (login) {
    return login.click()
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('Type a message...', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (Input) {
    return Input.sendKeys('Demo')
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('send', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (send) {
    return send.click()
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('Type a message...', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (Input) {
    return Input.sendKeys('Hello World')
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('send', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (send) {
    return send.click()
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('Settings', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (SettingsButton) {
    return SettingsButton.click()
  })
  
  /**
   * Click Button to change theme to SASSY
   */
  .then(function () {
    return driver.waitForElementByAccessibilityId('Change Theme', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (ThemeButton) {
    return ThemeButton.click()
  })
  .then(function () {
    return driver.waitForElementByXPath('//android.widget.Button[@content-desc="Change Theme"]/android.widget.TextView', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (ButtonText) {
    return ButtonText.text().then(function (value) {
      if (value === 'SASSY') {
        assert(true)
      } else {
        assert(false)
      }
    })
  })
  /**
   *  End of SASSY
   */

  .then(function () {
    return driver.waitForElementByAccessibilityId('Home, back', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (BackButton) {
    return BackButton.click()
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('Settings', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (SettingsButton) {
    return SettingsButton.click()
  })

  /** 
   * Click Button to change theme to DARK
   */
  .then(function () {
    return driver.waitForElementByAccessibilityId('Change Theme', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (ThemeButton) {
    return ThemeButton.click()
  })
  .then(function () {
    return driver.waitForElementByXPath('//android.widget.Button[@content-desc="Change Theme"]/android.widget.TextView', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (ButtonText) {
    return ButtonText.text().then(function (value) {
      if (value === 'DARKTHEME') {
        assert(true)
      } else {
        assert(false)
      }
    })
  })
  /**
   *  End of DARK
   */

  .then(function () {
    return driver.waitForElementByAccessibilityId('Home, back', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (BackButton) {
    return BackButton.click()
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('Settings', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (SettingsButton) {
    return SettingsButton.click()
  })

  /** 
   * Click Button to change theme to DEFAULT
   */
  .then(function () {
    return driver.waitForElementByAccessibilityId('Change Theme', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (ThemeButton) {
    return ThemeButton.click()
  })
  .then(function () {
    return driver.waitForElementByXPath('//android.widget.Button[@content-desc="Change Theme"]/android.widget.TextView', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (ButtonText) {
    return ButtonText.text().then(function (value) {
      if (value === 'DEFAULT-THEME') {
        assert(true)
      } else {
        assert(false)
      }
    })
  })
  /**
   *  End of DEFAULT
   */

  .then(function () {
    return driver.waitForElementByAccessibilityId('Home, back', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (BackButton) {
    return BackButton.click()
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('Type a message...', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (Input) {
    return Input.sendKeys('End of Test')
  })
  .then(function () {
    return driver.waitForElementByAccessibilityId('send', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (send) {
    return send.click()
  })
  .fin(function () {
    return driver.quit()
  })
  .done()