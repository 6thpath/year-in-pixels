import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { animated } from 'react-spring/renderprops'
import { LoadingOutlined } from '@ant-design/icons'

import { useStore } from 'store'
import { SET_GLOBAL_MESSAGE } from 'store/ui'
import { firebase } from 'utils/firebase'
import { emailRegex } from 'utils/regex'
import * as Routes from 'routes'

import { Button, ButtonLink } from 'components/Button'
import { Hr } from 'components/Hr'
import Tooltip from 'components/Tooltip'

import FacebookSignIn from './FacebookSignIn'
import GoogleSignIn from './GoogleSignIn'

const Form = styled.form`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 0 ${(p) => p.theme.spacing.xs};
`

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

const FocusBorder = styled.span`
  position: relative;
  top: -2px;
  bottom: 0;
  left: 0;
  width: ${(p) => (p.hasText || p.hasError ? '100%' : '0')};
  height: 2px;
  background: linear-gradient(
    to right,
    ${(p) => (p.hasError ? p.theme.colors.error.lighter : p.theme.colors.primary.lighter)},
    ${(p) => (p.hasError ? p.theme.colors.error.main : p.theme.colors.primary.main)}
  );
  transition: all 0.4s;
  margin-bottom: ${(p) => p.theme.spacing.md};
  z-index: 2;
`

const Label = styled.label`
  user-select: none;
`

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: ${(p) => p.theme.font.size.xs};
  outline: none;
  padding-bottom: ${(p) => p.theme.spacing.xs};
  border-width: 0 0 2px 0;
  border-style: solid;
  background: transparent;
  border-image: linear-gradient(
      to right,
      ${(p) => p.theme.colors.primary.lighter},
      ${(p) => p.theme.colors.primary.light}
    )
    1;
  z-index: 2;

  &:focus ~ #${(p) => p.borderId} {
    width: 100%;
  }

  & ~ #${(p) => p.labelId} {
    position: absolute;
    left: 0;
    top: ${(p) => (p.value ? '-20px' : 0)};
    font-size: ${(p) => (p.value ? p.theme.font.size.xxs : p.theme.font.size.xs)};
    color: ${(p) => (p.value ? p.theme.colors.primary.dark : p.theme.colors.grey[400])};
    transition: 0.3s;
    z-index: ${(p) => (p.value ? -1 : 1)};
  }

  &:focus ~ #${(p) => p.labelId} {
    top: -20px;
    font-size: ${(p) => p.theme.font.size.xxs};
    color: ${(p) => p.theme.colors.primary.dark};
    transition: 0.3s;
    z-index: 1;
  }

  ::placeholder {
    user-select: none;
  }
`

const ForgotPassword = styled.div`
  user-select: none;
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 2;
  font-size: ${(p) => p.theme.font.size.xxs};
  color: ${(p) => p.theme.colors.black};
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    color: ${(p) => p.theme.colors.grey[500]};
  }
`

const ButtonsGroup = styled.div`
  width: 100%;

  display: inline-grid;
  grid-template-columns: auto auto;
  grid-column: 2;
  grid-column-gap: 10px;
`

const SignInForm = ({ history, style }) => {
  // eslint-disable-next-line no-unused-vars
  const [store, dispatch] = useStore()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailHasError, setEmailHasError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordHasError, setPasswordHasError] = useState('')

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleReset = () => {
    setLoading(false)
    setEmail('')
    setEmailHasError('')
    setPassword('')
    setPasswordHasError('')
  }

  // Reset state on willUnmount
  useEffect(() => () => handleReset(), [])

  // Email
  const onEmailChange = ({ target: { value } }) => {
    setEmail(value)

    if (value && !emailRegex.test(value)) {
      setEmailHasError('Please input a valid email address')
    } else if (emailHasError) setEmailHasError('')
  }

  const onEmailBlur = () => {
    if (emailHasError) setEmailHasError('')
  }

  // Password
  const onPasswordChange = ({ target: { value } }) => {
    setPassword(value)

    if (passwordHasError) setPasswordHasError('')
  }

  const onPasswordBlur = () => {
    if (passwordHasError) setPasswordHasError('')
  }

  // Submit
  const onSubmit = (e) => {
    e.preventDefault()

    if (!email || !emailRegex.test(email)) {
      if (!email) {
        setEmailHasError('Email is required')
      } else {
        setEmailHasError('Please input a valid email address')
      }
      return emailRef.current.focus()
    }

    if (!password) {
      setPasswordHasError('Password is required')
      return passwordRef.current.focus()
    }

    dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: 'Signing in...', type: 'loading' } })
    setLoading(true)

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found': {
            setEmailHasError(error.message)
            emailRef.current.focus()
            break
          }

          case 'auth/wrong-password': {
            setPasswordHasError(error.message)
            passwordRef.current.focus()
            break
          }

          default: {
            setEmailHasError(error.message)
            emailRef.current.focus()
          }
        }
      })
      .finally(() => {
        dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: '', type: '' } })
        setLoading(false)
      })
  }

  const requestPasswordReset = () => {
    if (!email || !emailRegex.test(email)) {
      if (!email) {
        setEmailHasError('Please input your email first')
      } else {
        setEmailHasError('Please input a valid email address')
      }
      return emailRef.current.focus()
    }

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({
          type: SET_GLOBAL_MESSAGE,
          payload: { message: `A password reset email has been sent to ${email}`, type: 'success' },
        })
      })
      .catch((error) => {
        dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: error.message, type: 'error' } })
      })
  }

  const toSignUp = () => {
    history.push(Routes.SIGN_UP)
  }

  return (
    <animated.div style={{ ...style }}>
      <Form onSubmit={onSubmit}>
        <Tooltip visible={!!emailHasError} title={emailHasError}>
          <FormItem>
            <Input
              ref={emailRef}
              onChange={onEmailChange}
              value={email}
              onBlur={onEmailBlur}
              labelId='email-label'
              borderId='email-border'
              autoFocus
            />
            <Label id='email-label'>Email</Label>
            <FocusBorder id='email-border' hasText={!!email.length} hasError={!!emailHasError} />
          </FormItem>
        </Tooltip>

        <hr style={{ border: 'none' }} />

        <Tooltip visible={!!passwordHasError} title={passwordHasError}>
          <FormItem>
            <Input
              ref={passwordRef}
              onChange={onPasswordChange}
              value={password}
              onBlur={onPasswordBlur}
              type='password'
              labelId='password-label'
              borderId='password-border'
              style={{ paddingRight: 120 }}
            />
            <Label id='password-label'>Password</Label>
            <FocusBorder hasText={!!password.length} hasError={!!passwordHasError} id='password-border' />
            <ForgotPassword onClick={requestPasswordReset}>Forgot password?</ForgotPassword>
          </FormItem>
        </Tooltip>

        <Button
          type='submit'
          // disabled={!email || !password || emailHasError || passwordHasError}
          disabled={loading}
        >
          {loading ? <LoadingOutlined /> : 'SIGN IN TO YOUR ACCOUNT'}
        </Button>

        <ButtonLink type='button' onClick={toSignUp}>
          SIGN UP
        </ButtonLink>

        <Hr content='Or sign in with social account' />

        <ButtonsGroup>
          <FacebookSignIn />
          <GoogleSignIn />
        </ButtonsGroup>
      </Form>
    </animated.div>
  )
}

export default withRouter(SignInForm)
