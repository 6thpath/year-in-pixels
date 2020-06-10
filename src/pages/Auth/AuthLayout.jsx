import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Transition, animated } from 'react-spring/renderprops'

import * as Routes from 'routes'

import HtmlHeader from 'components/HtmlHeader'

import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

import background from 'assets/images/background.png'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const FormContainer = styled.div`
  min-width: 350px;
  height: 450px;
  position: relative;
  background-color: #fff;
  box-shadow: ${(p) => p.theme.shadows.md};
  border-radius: ${(p) => p.theme.radius.lg};
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.bold};
  padding: ${(p) => p.theme.spacing.xs};
  margin: ${(p) => p.theme.spacing.xs};
  margin-bottom: ${(p) => p.theme.spacing.lg};
`

const TitleText = styled.span`
  display: inline-block;
  white-space: nowrap;
  user-select: none;
`

const AnimatedTitleText = animated(TitleText)

const Line = styled.div`
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #dcd6f7, #424874);
  display: inline-block;
  margin-left: ${(p) => p.theme.spacing.xs};
`

const AuthLayout = ({ history, history: { location } }) => {
  let pageTitle
  let title

  switch (history.location.pathname) {
    case Routes.SIGN_UP: {
      pageTitle = 'Sign Up'
      title = 'Sign Up for YIP'
      break
    }

    default:
      pageTitle = 'Year In Pixels'
      title = 'Sign In'
  }

  return (
    <>
      <HtmlHeader title={pageTitle} />
      <Container>
        <FormContainer>
          <Title>
            <Transition
              native
              items={title}
              from={{ opacity: 0, width: 0, overflow: 'hidden' }}
              enter={{ opacity: 1, width: 'auto', overflow: 'unset' }}
              leave={{ opacity: 0, width: 0, overflow: 'hidden' }}
            >
              {(show) => show && ((props) => <AnimatedTitleText style={props}>{title}</AnimatedTitleText>)}
            </Transition>

            <Line />
          </Title>
          <Transition
            native
            items={location}
            keys={location.pathname.split('/')[1]}
            from={{ transform: 'translateY(100px)', opacity: 0, zIndex: -1 }}
            enter={{ transform: 'translateY(0px)', opacity: 1, zIndex: 1 }}
            leave={{ transform: 'translateY(100px)', opacity: 0, zIndex: -1 }}
          >
            {(loc, state) => (style) => (
              <Switch location={state === 'update' ? location : loc}>
                <Route exact path={Routes.HOME} render={() => <SignInForm style={style} />} />
                <Route exact path={Routes.SIGN_UP} render={() => <SignUpForm style={style} />} />
                <Redirect to={Routes.HOME} />
              </Switch>
            )}
          </Transition>
        </FormContainer>
      </Container>
    </>
  )
}

export default withRouter(AuthLayout)
