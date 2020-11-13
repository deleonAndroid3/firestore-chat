/* eslint-disable no-undef */

import React from 'react'
import { act } from 'react-test-renderer'
import { shallow } from 'enzyme'
import ChatScreen from '../src/screens/ChatScreen/ChatScreen'
import { firebase } from '../src/firebase/firebase.app'
import FirestoreMock from '../__tests-util__/firestoreMock.mock'


const user = {
  _id: '93nJbIsNNRMezRIXoIgKUg9PKh42',
  email: 'apappas1129@gmail.com',
  name: 'Ts Xs',
}

const chat = shallow(<ChatScreen userData={user} theme={themes[0]}/> )


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

  it('should mock Firestore adding message', (done) => {
    firestoreMock.mockAddReturn = { id: 'test-id' }
    firebase.firestore.collection('chats')
      .add({message: 'Hello World'})
      .then(res => {
        expect(firestoreMock.mockCollection).toBeCalledWith('chats')
        expect(firestoreMock.mockAdd).toBeCalledWith({message: 'Hello World'})
        expect(res.id).toEqual('test-id')
        done()
      })
      .catch(done)
  })

})

