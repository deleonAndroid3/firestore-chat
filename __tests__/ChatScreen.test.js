/* eslint-disable no-undef */

import React from 'react'
import { act } from 'react-test-renderer'
import { shallow } from 'enzyme'
import ChatScreen from '../src/screens/ChatScreen/ChatScreen'

const user = {
  _id: '93nJbIsNNRMezRIXoIgKUg9PKh42',
  email: 'apappas1129@gmail.com',
  name: 'Ts Xs',
}

const chat = shallow(<ChatScreen userData={user} />)

describe('<ChatScreen />', () => {

  it('App renders without crashing', async () => {
    await act(async () => {
      expect(chat).toBeTruthy()
    })
  })

  it('App test against snapshot', async () => {
    await act(async () => {
      expect(chat).toMatchSnapshot()
    })
  })
})

