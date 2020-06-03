import React, { useState } from 'react'

import { useStore } from 'store'
import { SET_TOKEN } from 'store/auth'
import { firebase, googleProvider, facebookProvider } from 'utils/firebase'

import { BorderButton } from 'components/Button'
import Tooltip from 'components/Tooltip'

const GoogleSignIn = () => {
  // eslint-disable-next-line no-unused-vars
  const [store, dispatch] = useStore()
  const [error, setError] = useState('')

  const signInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        dispatch({ type: SET_TOKEN, payload: result.credential.accessToken })
      })
      .catch((error) => {
        // Handle Errors here.
        switch (error.code) {
          case '': {
            break
          }

          case 'auth/account-exists-with-different-credential': {
            // Account exists with different credential. To recover both accounts
            // have to be linked but the user must prove ownership of the original account.
            const existingEmail = error.email
            const pendingCred = error.credential
            // Lookup existing account’s provider ID.
            return firebase
              .auth()
              .fetchSignInMethodsForEmail(existingEmail)
              .then((providers) => {
                if (providers.indexOf(firebase.auth.EmailAuthProvider.PROVIDER_ID) > -1) {
                  // Password account already exists with the same email.
                  // Ask user to provide password associated with that account.
                  const password = window.prompt('Please provide the password for ' + existingEmail)

                  return firebase
                    .auth()
                    .signInWithEmailAndPassword(error.email, password)
                    .then((user) => {
                      return user.linkWithCredential(error.credential)
                    })
                } else if (providers.indexOf(firebase.auth.FacebookAuthProvider.PROVIDER_ID) > -1) {
                  facebookProvider.setCustomParameters({ login_hint: existingEmail })
                  return firebase
                    .auth()
                    .signInWithPopup(facebookProvider)
                    .then((result) => result.user)
                }
              })
              .then(({ user }) => {
                console.log('signInWithGoogle -> user', user)
                // Link Facebook OAuth credential to existing account.
                return user.linkWithCredential(pendingCred)
              })
          }

          default:
            setError(error.message)
            setTimeout(() => setError(''), 5 * 1000)
        }
      })
  }

  return (
    <Tooltip placement='top' visible={!!error} title={error}>
      <BorderButton onClick={signInWithGoogle} type='button' color='#DB4437' fontWeight='bold'>
        GOOGLE
      </BorderButton>
    </Tooltip>
  )
}

export default GoogleSignIn
