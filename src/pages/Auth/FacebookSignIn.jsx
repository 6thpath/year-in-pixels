import React, { useState } from 'react'

import { useStore } from 'store'
import { SET_AUTH_USER } from 'store/auth'
import { SET_GLOBAL_MESSAGE } from 'store/ui'
import { firebase, googleProvider, facebookProvider } from 'utils/firebase'

import { BorderButton } from 'components/Button'
import Tooltip from 'components/Tooltip'

import Prompt from './PwdPrompt'

const FacebookSignIn = () => {
  // eslint-disable-next-line no-unused-vars
  const [store, dispatch] = useStore()
  const [error, setError] = useState('')

  const signInWithFacebook = () => {
    dispatch({ type: SET_GLOBAL_MESSAGE, payload: 'Signing in...' })

    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        dispatch({
          type: SET_AUTH_USER,
          payload: {
            user: result.user,
            token: result.credential.accessToken,
          },
        })
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/account-exists-with-different-credential': {
            // Account exists with different credential. To recover both accounts
            // have to be linked but the user must prove ownership of the original account.
            const existingEmail = error.email
            const pendingCredential = error.credential
            // Lookup existing account’s provider ID.
            return firebase
              .auth()
              .fetchSignInMethodsForEmail(existingEmail)
              .then(async (providers) => {
                if (providers.indexOf(firebase.auth.EmailAuthProvider.PROVIDER_ID) > -1) {
                  // Password account already exists with the same email.
                  // Ask user to provide password associated with that account.
                  const password = await Prompt({
                    title: 'Alert',
                    description:
                      'An account with this email is already registered. Please sign in to create link with Facebook account.',
                    email: existingEmail,
                  })

                  return firebase
                    .auth()
                    .signInWithEmailAndPassword(existingEmail, password)
                    .catch((anotherError) => ({ error: anotherError }))
                } else if (providers.indexOf(firebase.auth.GoogleAuthProvider.PROVIDER_ID) > -1) {
                  googleProvider.setCustomParameters({ login_hint: existingEmail })
                  return firebase
                    .auth()
                    .signInWithPopup(googleProvider)
                    .catch((anotherError) => ({ error: anotherError }))
                }
              })
              .then((result) => {
                if (result?.user) {
                  // Link Facebook OAuth credential to existing account.
                  return result.user.linkWithCredential(pendingCredential)
                } else {
                  setError(result?.error?.message)
                  return setTimeout(() => setError(''), 5 * 1000)
                }
              })
          }

          default:
            setError(error.message)
            setTimeout(() => setError(''), 5 * 1000)
        }
      })
      .finally(() => {
        dispatch({ type: SET_GLOBAL_MESSAGE, payload: '' })
      })
  }

  return (
    <Tooltip placement='top' visible={!!error} title={error}>
      <BorderButton onClick={signInWithFacebook} type='button' color='#4267B2' fontWeight='bold'>
        FACEBOOK
      </BorderButton>
    </Tooltip>
  )
}

export default FacebookSignIn
