import React, { useState } from 'react'
import { CheckBox, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import { firebase } from '../../firebase/firebase.app'
import * as Facebook from 'expo-facebook'
import env from '../../../environment'

/**FOR Unit Testing */
export function handleSignIn(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
}

export function handleSignOut() {
  if (firebase.auth().currentUser) {
    return firebase.auth().signOut()
  }
}

export async function handleSignInWithCred(_type, _credential){
  
  try {
    /**
     * If the user or Facebook cancelled the login, returns { type: 'cancel' }.
     * Otherwise, returns { type: 'success' } & [FacebookAuthenticationCredential]
     * 
     * let us assume what the user does using the _type parameter  
     */
    // await Facebook.initializeAsync({
    //   appId: '821584115048039',
    // })
    // const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    //   permissions: ['public_profile', 'email'],
    // })
    if (_type === 'success') {
      // const credential = firebase.auth.FacebookAuthProvider.credential(token)
      return firebase
        .auth()
        .signInWithCredential(_credential)
    }else{
      return false
    }

  }catch (error){
    return error
  }
}
/**End Of Unit Testing */


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onFooterLinkPress = () => {
    navigation.navigate('Registration')
  }
  
  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert('User does not exist anymore.')
              return
            }
            // const user = firestoreDocument.data()
            // navigation.navigate('Home', { user: user })
          })
          .catch((error) => {
            alert(error)
          })
      })
      .catch((error) => {
        alert(error)
      })
  }

  async function loginWithFacebook() {
    try {
      await Facebook.initializeAsync({
        appId: env.facebookAppID,
      })
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      })
      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token)

        firebase
          .auth()
          .signInWithCredential(credential)
          .then(({ additionalUserInfo, user }) => {
            const { profile, providerId } = additionalUserInfo
            const data = {
              _id: user.uid,
              email: profile.email || user.email || user.providerData[0].email,
              name: profile.name || user.displayName,
              avatar:
                profile.picture?.data?.url ||
                user.photoURL ||
                user.providerData[0].photoURL,
              providerId,
              photo: `https://graph.facebook.com/${profile.id}/picture?height=500`,
            }
            const usersRef = firebase.firestore().collection('users')
            usersRef
              .doc(user.uid)
              .set(data)
              .then(() => {
                // navigation.navigate('Home', { user: data })
              })
              .catch((error) => {
                alert(error)
              })
          })
          .catch((error) => {
            alert(error)
          })
      }
    } catch (error) {
      console.warn('FB_LOGIN_FAILED', JSON.stringify(error))
      alert(`Facebook Login Error: ${error.message}`)
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps='always'
      >
        <Image
          style={styles.logo}
          source={require('../../../assets/icon.png')}
        />
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor='#aaaaaa'
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
          testID='Email'
          accessibilityLabel='Email'
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#aaaaaa'
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
          testID='Password'
          accessibilityLabel='Password'
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()} testID='Login' accessibilityLabel='Login'>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => loginWithFacebook()}testID='LoginFB' accessibilityLabel='LoginFB'>
          <Text style={styles.buttonTitle}>Log in With Facebook</Text>
        </TouchableOpacity>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don&apos;t have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}
