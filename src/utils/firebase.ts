// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

export { firebase, googleProvider, facebookProvider }

function initFirebase() {
  const firebaseConfig = {
    apiKey: 'AIzaSyBITUXkz-otukn4Jpzke4ANwGHooyfgGFw',
    authDomain: 'year-in-pixels-af189.firebaseapp.com',
    databaseURL: 'https://year-in-pixels-af189.firebaseio.com',
    projectId: 'year-in-pixels-af189',
    storageBucket: 'year-in-pixels-af189.appspot.com',
    messagingSenderId: '777269983218',
    appId: '1:777269983218:web:177f594fee6a859b6f9d6b',
    measurementId: 'G-PMDWME95P1',
  }

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

initFirebase()

export const db = firebase.firestore()

export function getUsersProfile(user) {
  return {
    uid: user.uid,
    name: user.displayName,
    photoUrl: user.photoURL,
    email: user.email,
    emailVerified: user.emailVerified,
    providerData: user.providerData,
  }
}

export function signOut(onError = () => {}) {
  return firebase.auth().signOut().catch(onError)
}
