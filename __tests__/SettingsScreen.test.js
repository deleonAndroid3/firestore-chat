/* eslint-disable no-undef */
import React from 'react'
import { act } from 'react-test-renderer'
import { shallow } from 'enzyme'
import SettingsScreen from '../src/screens/SettingsScreen/SettingsScreen'

const user = {
  _id: '93nJbIsNNRMezRIXoIgKUg9PKh42',
  email: 'apappas1129@gmail.com',
  name: 'Ts Xs',
}

const state = {
  chatTheme: 'default-theme',
  setChatTheme: ''
}

const settings = shallow(<SettingsScreen userData={user} state/>)

describe('<SettingsScreen />', () => {
  
  it('App renders without crashing', async () => {
    await act(async () => {
      expect(settings).toBeTruthy()
    })
  })
  
  it('App test against snapshot', async () => {
    await act(async () => {
      expect(settings).toMatchSnapshot()
    })
  })
  
})