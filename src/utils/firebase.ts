// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig)

const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

const db = firebase.firestore()

export { firebase, db, googleProvider, facebookProvider }

export function getUsersProfile(user: any) {
  return {
    uid: user.uid,
    name: user.displayName,
    photoUrl: user.photoURL,
    email: user.email,
    emailVerified: user.emailVerified,
    providerData: user.providerData,
  }
}

export async function signOut(onError = () => {}) {
  return firebase.auth().signOut().catch(onError)
}
