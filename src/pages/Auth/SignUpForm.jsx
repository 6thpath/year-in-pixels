import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { animated } from 'react-spring/renderprops'
import { LoadingOutlined } from '@ant-design/icons'

import { useStore } from 'store'
import { SET_GLOBAL_MESSAGE } from 'store/ui'
import { firebase } from 'utils/firebase'
import { emailRegex, normalPasswordRegex } from 'utils/regex'
import * as Routes from 'routes'

import { Button, ButtonLink } from 'components/Button'
import Tooltip from 'components/Tooltip'

import PasswordTooltip from './PasswordTooltip'

const Form = styled.form`
  width: 100%;
  position: absolute;
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
    ${(p) =>
      p.hasError || p.strength === 0
        ? p.theme.colors.error.lighter
        : p.strength === 1
        ? p.theme.colors.warning.lighter
        : p.theme.colors.success.lighter},
    ${(p) =>
      p.hasError || p.strength === 0
        ? p.theme.colors.error.main
        : p.strength === 1
        ? p.theme.colors.warning.main
        : p.theme.colors.success.main}
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
    top: ${(p) => (p.value ? '-16px' : 0)};
    font-size: ${(p) => (p.value ? p.theme.font.size.xxs : p.theme.font.size.xs)};
    color: ${(p) => (p.value ? p.theme.colors.primary.dark : p.theme.colors.grey[400])};
    transition: 0.3s;
    z-index: ${(p) => (p.value ? -1 : 1)};
  }

  &:focus ~ #${(p) => p.labelId} {
    top: -16px;
    font-size: ${(p) => p.theme.font.size.xxs};
    color: ${(p) => p.theme.colors.primary.dark};
    transition: 0.3s;
    z-index: 1;
  }

  ::placeholder {
    user-select: none;
  }
`

const SignUpForm = ({ history, style }) => {
  // eslint-disable-next-line no-unused-vars
  const [store, dispatch] = useStore()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailHasError, setEmailHasError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordHasError, setPasswordHasError] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [cPasswordHasError, setCPasswordHasError] = useState('')

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const cPasswordRef = useRef(null)

  const handleReset = () => {
    setLoading(false)
    setEmail('')
    setEmailHasError('')
    setPassword('')
    setPasswordStrength(0)
    setPasswordHasError('')
    setCPassword('')
    setCPasswordHasError('')
  }

  // Reset fields on willUnmount
  useEffect(() => () => handleReset(), [])

  // Email field
  const onEmailChange = ({ target: { value } }) => {
    setEmail(value)

    if (value && !emailRegex.test(value)) {
      setEmailHasError('Please input a valid email address')
    } else setEmailHasError('')
  }

  const onEmailBlur = () => {
    if (emailHasError) setEmailHasError('')
  }

  // Password field
  const onPasswordChange = ({ target: { value } }) => {
    setPassword(value)

    const isPasswordValid = normalPasswordRegex.test(value)

    if (value.length < 6) {
      setPasswordHasError('Password must be at least 6 characters in length')
    } else if (!isPasswordValid) {
      setPasswordHasError('Password must be a combination of letters and digits')
    } else setPasswordHasError('')

    if (value.length < 6 || !isPasswordValid) setPasswordStrength(0)
    else if (value.length <= 6 && isPasswordValid) setPasswordStrength(1)
    else if (value.length > 9 && isPasswordValid) setPasswordStrength(2)
  }

  const onPasswordBlur = () => {
    if (passwordHasError) setPasswordHasError('')
  }

  // Confirm password field
  const onCPasswordChange = ({ target: { value } }) => {
    setCPassword(value)

    if (value !== password) setCPasswordHasError('The two passwords that you entered do not match')
    else setCPasswordHasError('')
  }

  const onCPasswordBlur = () => {
    if (cPasswordHasError) setCPasswordHasError('')
  }

  // Submit
  const onSubmit = (e) => {
    e.preventDefault()

    const isEmailValid = emailRegex.test(email)
    const isPasswordValid = normalPasswordRegex.test(password)

    if (!email || !isEmailValid) {
      if (!email) {
        setEmailHasError('Email is required')
      } else {
        setEmailHasError('Please input a valid email address')
      }

      return emailRef.current.focus()
    }

    if (!password || password.length < 6 || !isPasswordValid) {
      if (!password) {
        setPasswordHasError('Password is required')
      } else if (password.length < 6) {
        setPasswordHasError('Password must be at least 6 characters in length')
      } else {
        setPasswordHasError('Password must be a combination of letters and digits')
      }

      return passwordRef.current.focus()
    }

    if (!cPassword || cPassword !== password) {
      if (!password) {
        setCPasswordHasError('Confirm password is required')
      } else {
        setCPasswordHasError('The two passwords that you entered do not match')
      }

      return cPasswordRef.current.focus()
    }

    dispatch({ type: SET_GLOBAL_MESSAGE, payload: 'Creating new account...' })
    setLoading(true)

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: SET_GLOBAL_MESSAGE, payload: 'Account created successfully, signing in...' })
        history.push(Routes.HOME)
      })
      .catch((error) => {
        setEmailHasError(error.message)
        emailRef.current.focus()
      })
      .finally(() => {
        dispatch({ type: SET_GLOBAL_MESSAGE, payload: '' })
        setLoading(false)
      })
  }

  const toSignIn = () => {
    history.push(Routes.HOME)
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
              labelId='reg-email-label'
              borderId='reg-email-border'
              autoFocus
            />
            <Label id='reg-email-label'>Email</Label>
            <FocusBorder id='reg-email-border' hasText={!!email.length} hasError={!!emailHasError} />
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
              labelId='reg-password-label'
              borderId='reg-password-border'
            />
            <Label id='reg-password-label'>Password</Label>
            <FocusBorder id='reg-password-border' hasText={!!password.length} strength={passwordStrength} />
            <PasswordTooltip />
          </FormItem>
        </Tooltip>

        <Tooltip visible={!!cPasswordHasError} title={cPasswordHasError}>
          <FormItem>
            <Input
              ref={cPasswordRef}
              onChange={onCPasswordChange}
              value={cPassword}
              onBlur={onCPasswordBlur}
              type='password'
              labelId='cPassword-label'
              borderId='cPassword-border'
            />
            <Label id='cPassword-label'>Confirm Password</Label>
            <FocusBorder id='cPassword-border' hasText={!!cPassword.length} hasError={!!cPasswordHasError} />
          </FormItem>
        </Tooltip>

        <Button
          type='submit'
          // disabled={!email || !password || emailHasError || passwordHasError}
          disabled={loading}
        >
          {loading ? <LoadingOutlined /> : 'SIGN UP NEW ACCOUNT'}
        </Button>

        <ButtonLink type='button' onClick={toSignIn}>
          ALREADY HAVE AN ACCOUNT?
        </ButtonLink>
      </Form>
    </animated.div>
  )
}

export default withRouter(SignUpForm)
