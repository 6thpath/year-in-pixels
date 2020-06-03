import React from 'react'
import styled from 'styled-components'

import { Background } from 'components/Layout'
import SignInForm from './SignInForm'

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const FormContainer = styled.div`
  min-width: 350px;
  position: absolute;

  background-color: #fff;
  box-shadow: ${(p) => p.theme.shadows.md};
  padding: 10px;
  border-radius: ${(p) => p.theme.radius.lg};
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.bold};
  margin: ${(p) => p.theme.spacing.xs};
  margin-bottom: ${(p) => p.theme.spacing.lg};
`

const TitleText = styled.span`
  display: inline-block;
  white-space: nowrap;
  margin-right: ${(p) => p.theme.spacing.xs};
  user-select: none;
`

const Line = styled.div`
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #dcd6f7, #424874);
  display: inline-block;
`

const AuthLayout = () => {
  return (
    <Container>
      <Background />
      <FormContainer>
        <Title>
          <TitleText>Sign In</TitleText>
          <Line />
        </Title>

        <SignInForm />
      </FormContainer>
    </Container>
  )
}

export default AuthLayout
