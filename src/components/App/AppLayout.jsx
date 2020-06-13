import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Switch, Route, withRouter } from 'react-router-dom'

import { useStore } from 'store'
import * as Routes from 'routes'

import NotFound from 'components/NotFound'
import Home from 'pages/Home'
import ScrollToTop from './ScrollToTop'
import AppTutorial from 'components/Tour/Tour'

import SideMenu from 'pages/Home/SideMenu'

import background from 'assets/images/background.png'

const Container = styled.div`
  height: 100%;
`

const Root = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  height: 100%;

  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const AppLayout = () => {
  const [{ ui }] = useStore()

  return (
    <Container id='outer-container'>
      {ui.isMobile && <SideMenu />}

      <AppTutorial />

      <Root>
        <ScrollToTop>
          <Switch>
            <Route exact path={Routes.HOME} component={Home} />

            <Route component={NotFound} />
          </Switch>
        </ScrollToTop>
      </Root>
    </Container>
  )
}

AppLayout.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(AppLayout)
