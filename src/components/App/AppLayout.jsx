import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Switch, Route, withRouter } from 'react-router-dom'

import * as Routes from 'routes'

import NotFound from 'components/NotFound'
import Home from 'pages/Home'
import ScrollToTop from './ScrollToTop'

import SideMenu from 'pages/Home/SideMenu'

const Root = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: absolute;
`

const AppLayout = () => {
  return (
    <>
      <SideMenu />

      <Root>
        <ScrollToTop>
          <Switch>
            <Route exact path={Routes.HOME} component={Home} />

            <Route component={NotFound} />
          </Switch>
        </ScrollToTop>
      </Root>
    </>
  )
}

AppLayout.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(AppLayout)
