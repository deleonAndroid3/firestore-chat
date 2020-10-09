import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import { firebase } from '../../firebase/firebase.app'
import * as Facebook from 'expo-facebook'

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
            const user = firestoreDocument.data()
            navigation.navigate('Home', { user: user })
          })
          .catch((error) => {
            alert(error)
          })
      })
      .catch((error) => {
        alert(error)
      })
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
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
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
