/* eslint-disable no-undef */
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
import jsdom from 'jsdom'

function setUpDomEnvironment() {
  const { JSDOM } = jsdom
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'http://localhost/'})
  const { window } = dom

  global.window = window
  global.document = window.document
  global.navigator = {
    userAgent: 'node.js',
  }
  copyProps(window, global)
}

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop))
  Object.defineProperties(target, props)
}

setUpDomEnvironment()

configure({ adapter: new Adapter() })

// #region AsyncStorage
/**
 * Async Storage module is tightly coupled with its NativeModule part.
 * It needs a running React Native application to work properly.
 * In order to use it in tests, you have to provide its separate implementation.
 * https://react-native-community.github.io/async-storage/docs/advanced/jest/#with-jest-setup-file
 */
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
// #endregion AsyncStorage

// #region ReactNavigation
/**
 * Testing code using React Navigation takes some setup since we need
 * to mock some native dependencies used in the navigators.
 * https://reactnavigation.org/docs/testing/#mocking-native-modules
 */
import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {}

  return Reanimated
})

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
// #endregion ReactNavigation