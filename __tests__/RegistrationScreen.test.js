/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-test-renderer'
import { firebase } from '../src/firebase/firebase.app'
import RegistrationScreen, { register } from '../src/screens/RegistrationScreen/RegistrationScreen'

let registration = shallow(<RegistrationScreen />)

describe('<RegistrationScreen />', () => {

  const user = {
    _id: '93nJbIsNNRMezRIXoIgKUg9PKh42',
    email: 'apappas1129@gmail.com',
    name: 'Ts Xs',
  }

  firebase.auth = jest.fn().mockReturnValue({
    currentUser: {
      displayName: 'testDisplayName',
      email: 'test@test.com',
      emailVerified: true
    },
    createUserWithEmailAndPassword: function(email, password) { 
      if (email === 'apappas1129@gmail.com') {
        return 'User already exists'
      }else{    
        return user 
      }
    },
  })

  it('App renders without crashing', async () => {
    await act(async () => {
      expect(registration).toBeTruthy()
    })
  })

  it('App test against snapshot', async () => {
    await act(async () => {
      expect(registration).toMatchSnapshot()
    })
  })
  
  it('should return user', () => {
    let result = register('deleon.johncarlo2016@gmail.com', 'password')
    expect(result).toEqual(user)
  })

  it('should return an error', () => {
    let result = register('apappas1129@gmail.com', 'password')
    expect(result).toEqual('User already exists')
  })
})

