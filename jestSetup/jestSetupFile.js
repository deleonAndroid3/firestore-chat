/* eslint-disable no-undef */
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: props => props.children,
}))