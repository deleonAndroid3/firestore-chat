/* eslint-disable no-undef */
import { shallow } from 'enzyme'
import React from 'react'
import { act } from 'react-test-renderer'
import LoginScreen, { handleSignIn, handleSignOut } from '../src/screens/LoginScreen/LoginScreen'
import { firebase } from '../src/firebase/firebase.app'


describe('< LoginScreen />', () => {

  const user = {
    _id: '93nJbIsNNRMezRIXoIgKUg9PKh42',
    email: 'apappas1129@gmail.com',
    name: 'Ts Xs',
  }

  firebase.auth = jest.fn().mockReturnValue({
    currentUser: {
      displayName: 'Ts Xs',
      email: 'apappas1129@gmail.com',
      emailVerified: true
    },
    signOut: function() { return true },
    signInWithEmailAndPassword: function(email, password) { 
      if (email === 'apappas1129@gmail.com' && password === 'password') {
        return user 
      }else{
        return 'user not found'
      }
    },
  })

  let login =  shallow(<LoginScreen />)
 
  it('App renders without crashing', async () => {
    await act(async () => {
      expect(login).toBeTruthy()
    })
  })

  it('App test against snapshot', async () => {
    await act(async () => {
      expect(login).toMatchSnapshot()
    })
  })

  it('App should render components', () => {
    expect(login.find('Component[placeholder="E-mail"]').exists()).toBe(true)
    expect(login.find('Component[placeholder="Password"]').exists()).toBe(true)
    expect(login.find('ForwardRef').exists()).toBe(true)
  })

  it('signin should return user', () => {
    let result = handleSignIn('apappas1129@gmail.com', 'password')
    expect(result).toEqual(user)
  })

  it('signin should return error', () => {
    let result = handleSignIn('apappas1129@gmail.com', 'notapassword')
    expect(result).toEqual('user not found')
  })

  it('signout should return true', () => {
    let result = handleSignOut()
    expect(result).toBe(true)
  })
})
