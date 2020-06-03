import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { useStore } from 'store'
import { firebase } from 'utils/firebase'
import { emailRegex } from 'utils/regex'

import { Button, ButtonLink } from 'components/Button'
import { Hr } from 'components/Text'
import Tooltip from 'components/Tooltip'

import FacebookSignIn from './FacebookSignIn'
import GoogleSignIn from './GoogleSignIn'

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.spacing.xs};
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
    top: 0;
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.colors.grey[400]};
    transition: 0.3s;
    z-index: ${(p) => (p.value ? -1 : 1)};
  }

  &:focus ~ #${(p) => p.labelId} {
    top: -16px;
    font-size: 12px;
    color: ${(p) => p.theme.colors.primary.dark};
    transition: 0.3s;
    z-index: 1;
  }

  ::placeholder {
    user-select: none;
  }
`

const ButtonsGroup = styled.div`
  width: 100%;

  display: inline-grid;
  grid-template-columns: auto auto;
  grid-column: 2;
  grid-column-gap: 10px;
`

const SignInForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useStore()
  const [email, setEmail] = useState('')
  const [emailHasError, setEmailHasError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordHasError, setPasswordHasError] = useState('')

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleReset = () => {
    setEmail('')
    setEmailHasError('')
    setPassword('')
    setPasswordHasError('')
  }

  useEffect(() => () => handleReset(), [])

  const onEmailChange = (e) => {
    setEmail(e.target.value)

    if (e.target.value && !emailRegex.test(e.target.value)) {
      setEmailHasError('Please input a valid email address')
    } else setEmailHasError('')
  }

  const onEmailBlur = () => {
    if (emailHasError) setEmailHasError('')
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)

    if (!!passwordHasError) setPasswordHasError('')
  }

  const onPasswordBlur = () => {
    if (passwordHasError) setPasswordHasError('')
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!email.length) {
      setEmailHasError('Email is required')
      return emailRef.current.focus()
    }

    if (!password.length) {
      setPasswordHasError('Password is required')
      return passwordRef.current.focus()
    }

    if (!!emailHasError) {
      return emailRef.current.focus()
    } else setEmailHasError('')

    if (!!passwordHasError) {
      return passwordRef.current.focus()
    } else setPasswordHasError('')

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found': {
            setEmailHasError(error.message)
            break
          }

          case 'auth/wrong-password': {
            setPasswordHasError(error.message)
            break
          }

          default: {
            setEmailHasError('Unknown error occurred. Try again later')
          }
        }
      })
  }

  return (
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
          />
          <Label id='password-label'>Password</Label>
          <FocusBorder hasText={!!password.length} hasError={!!passwordHasError} id='password-border' />
        </FormItem>
      </Tooltip>

      <Button
        type='submit'
        // disabled={!email || !password || emailHasError || passwordHasError}
      >
        SIGN IN TO YOUR ACCOUNT
      </Button>

      <ButtonLink type='button'>SIGN UP</ButtonLink>

      <Hr content='Or sign in with social account' />

      <ButtonsGroup>
        <FacebookSignIn />
        <GoogleSignIn />
      </ButtonsGroup>
    </Form>
  )
}

export default SignInForm
