import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Tooltip } from 'antd'

import { emailRegex } from 'utils/regex'
import theme from 'theme'

import { GhostButton, ButtonLink } from 'components/Button'
import { Hr } from 'components/Text'

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
    ${(p) => (p.hasError ? '#ffccc7' : '#dcd6f7')},
    ${(p) => (p.hasError ? '#ff4d4f' : '#424874')}
  );
  transition: all 0.4s;
  margin-bottom: ${(p) => p.theme.spacing.md};
  z-index: 2;
`

const Label = styled.label``

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: ${(p) => p.theme.font.size.xs};
  outline: none;
  padding-bottom: ${(p) => p.theme.spacing.xs};
  border-width: 0 0 2px 0;
  border-style: solid;
  background: transparent;
  border-image: linear-gradient(to right, #dcd6f7, #f4eeff) 1;
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

const SignInButton = styled.button`
  user-select: none;
  outline: none;
  width: 100%;
  position: relative;
  z-index: 1; /* matters! */
  overflow: hidden;
  padding: ${(p) => p.theme.spacing.xs};
  margin-top: ${(p) => p.theme.spacing.xxs};
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.font.size.xs};
  border: none;
  border-radius: ${(p) => p.theme.radius.md};
  background: linear-gradient(to right, #a6b1e1, #424874);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: linear-gradient(to right, #dcd6f7, #a6b1e1);
    transition: opacity 0.4s;
    z-index: -1;
  }

  ${(p) => {
    if (!p.disabled) {
      return `
  cursor: pointer;

  &:hover::before {
    opacity: 0.5;
  }
      `
    }
  }}

  &:disabled::before {
    background: ${(p) => p.theme.colors.grey[400]};
    opacity: 1;
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
  const [email, setEmail] = useState('')
  const [emailHasError, setEmailHasError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordHasError, setPasswordHasError] = useState('')

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const onEmailChange = (e) => {
    setEmail(e.target.value)

    if (e.target.value && !emailRegex.test(e.target.value)) {
      setEmailHasError('Please input a valid email address')
    } else {
      setEmailHasError('')
    }
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)

    if (!!passwordHasError) {
      setPasswordHasError('')
    }
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

    console.log(email, password)
  }

  return (
    <Form onSubmit={onSubmit}>
      <Tooltip visible={emailHasError} title={emailHasError} color={theme.colors.error.main}>
        <FormItem>
          <Input
            ref={emailRef}
            onChange={onEmailChange}
            value={email}
            placeholder=''
            labelId='email-label'
            borderId='email-border'
          />
          <Label id='email-label'>Email</Label>
          <FocusBorder hasText={!!email.length} hasError={!!emailHasError} id='email-border' />
        </FormItem>
      </Tooltip>

      <hr style={{ border: 'none' }} />

      <Tooltip visible={passwordHasError} title={passwordHasError} color={theme.colors.error.main}>
        <FormItem>
          <Input
            ref={passwordRef}
            onChange={onPasswordChange}
            value={password}
            type='password'
            labelId='password-label'
            borderId='password-border'
          />
          <Label id='password-label'>Password</Label>
          <FocusBorder hasText={!!password.length} hasError={!!passwordHasError} id='password-border' />
        </FormItem>
      </Tooltip>

      <SignInButton
        type='submit'
        // disabled={!email || !password || emailHasError || passwordHasError}
      >
        SIGN IN TO YOUR ACCOUNT
      </SignInButton>

      <ButtonLink type='button'>SIGN UP</ButtonLink>

      <Hr content='Or sign in with social account' />

      <ButtonsGroup>
        <GhostButton type='button' color='#4267B2' fontWeight='bold'>
          FACEBOOK
        </GhostButton>
        <GhostButton type='button' color='#DB4437' fontWeight='bold'>
          GOOGLE
        </GhostButton>
      </ButtonsGroup>
    </Form>
  )
}

export default SignInForm
