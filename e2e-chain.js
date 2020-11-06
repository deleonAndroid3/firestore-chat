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
  app: app || 'bs://c2b26c487cf2dec75e594fd790c52a3c857dfde0',
  'browserstack.debug': true,
  autoGrantPermissions: true
}
var driver = wd.promiseChainRemote('http://hub-cloud.browserstack.com/wd/hub')

driver
  .init(desiredCaps)
  .waitForElementByAccessibilityId('Email',asserters.isDisplayed && asserters.isEnabled,30000)
  .sendKeys('deleon.johncarlo2016@gmail.com')
  .waitForElementByAccessibilityId('Password',asserters.isDisplayed && asserters.isEnabled,30000)
  .sendKeys('Carlo123')
  .waitForElementByAccessibilityId('Login',asserters.isDisplayed && asserters.isEnabled,30000).click()
  .waitForElementByAccessibilityId('Type a message...',asserters.isDisplayed && asserters.isEnabled,30000)
  .sendKeys('Promise Chain Remote Test')
  .waitForElementByAccessibilityId('send',asserters.isDisplayed && asserters.isEnabled,30000).click()
  .waitForElementByAccessibilityId('Settings',asserters.isDisplayed && asserters.isEnabled,30000).click()
  .waitForElementByAccessibilityId('Change Theme',asserters.isDisplayed && asserters.isEnabled,30000).click()//Expect SASSY
  .waitForElementByAccessibilityId('Home, back',asserters.isDisplayed && asserters.isEnabled,30000).click()
  .waitForElementByAccessibilityId('Settings',asserters.isDisplayed && asserters.isEnabled,30000).click()
  .waitForElementByAccessibilityId('Change Theme',asserters.isDisplayed && asserters.isEnabled,30000).click()//Expect DARK
  .waitForElementByAccessibilityId('Home, back',asserters.isDisplayed && asserters.isEnabled,30000).click()
  .waitForElementByAccessibilityId('Settings',asserters.isDisplayed && asserters.isEnabled,30000).click()
  .waitForElementByAccessibilityId('Change Theme',asserters.isDisplayed && asserters.isEnabled,30000).click()//Expect Default
  .waitForElementByAccessibilityId('Home, back',asserters.isDisplayed && asserters.isEnabled,30000).click()
  .waitForElementByAccessibilityId('Type a message...',asserters.isDisplayed && asserters.isEnabled,30000)
  .sendKeys('End of Promise Chain Remote Test')
  .waitForElementByAccessibilityId('send',asserters.isDisplayed && asserters.isEnabled,30000).click()
  .fin(function() { return driver.quit() })
  .done()

