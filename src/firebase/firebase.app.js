/* eslint-disable no-undef */
import firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'
import env from '../../environment'

if (!firebase.apps.length) {
  firebase.initializeApp(env.firebaseConfig)
}

const firestore = firebase.firestore()

export { firebase, firestore }
