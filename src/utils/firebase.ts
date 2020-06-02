// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

const provider = new firebase.auth.GoogleAuthProvider()

export { firebase, provider }

export function initFirebase() {
  const firebaseConfig = {
    apiKey: 'AIzaSyBS5a3RM4GrVK8f0T2uquHrMrePrBcG1V8',
    authDomain: 'hows-your-day-ddfb1.firebaseapp.com',
    databaseURL: 'https://hows-your-day-ddfb1.firebaseio.com',
    projectId: 'hows-your-day-ddfb1',
    storageBucket: 'hows-your-day-ddfb1.appspot.com',
    messagingSenderId: '74102058540',
    appId: '1:74102058540:web:db8fcf7ed86b3383e56b89',
    measurementId: 'G-X86B1GXHMX',
  }

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}
