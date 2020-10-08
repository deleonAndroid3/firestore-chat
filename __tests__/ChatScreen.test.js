/* eslint-disable no-undef */

import React from 'react'
import { act } from 'react-test-renderer'
import { shallow } from 'enzyme'
import ChatScreen from '../src/screens/ChatScreen/ChatScreen'
import { firebase } from '../src/firebase/firebase.app'
import FirestoreMock from '../__tests__/test-utils/firestoreMock.mock'

const user = {
  _id: '93nJbIsNNRMezRIXoIgKUg9PKh42',
  email: 'apappas1129@gmail.com',
  name: 'Ts Xs',
}

const chat = shallow(<ChatScreen userData={user} />)

describe('<ChatScreen />', () => {
  const firestoreMock = new FirestoreMock()
  beforeEach(() => {
    firebase.firestore = firestoreMock
    firestoreMock.reset()
  })

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

  it('does something', (done) => {
    firestoreMock.mockAddReturn = { id: 'test-id' }
    firebase.firestore.collection('foobar')
      .add({foo: 'bar'})
      .then(res => {
        expect(firestoreMock.mockCollection).toBeCalledWith('foobar')
        expect(firestoreMock.mockAdd).toBeCalledWith({foo: 'bar'})
        expect(res.id).toEqual('test-id')
        done()
      })
      .catch(done)
  })

})

