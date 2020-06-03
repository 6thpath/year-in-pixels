import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Switch, Route, withRouter } from 'react-router-dom'

import NotFound from 'components/NotFound'

import Home from 'pages/Home'
import * as Routes from 'routes'

const Root = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: ${(p) => p.theme.screen.md};
  }

  @media (min-width: ${(p) => parseInt(p.theme.screen.lg, 10) + 20 + 'px'}) {
    width: ${(p) => p.theme.screen.lg};
  }
`

const AppLayout = memo(({ location }) => {
  return (
    <>
      <Root>
        <Switch>
          <Route exact path={Routes.HOME} component={Home} />

          <Route component={NotFound} />
        </Switch>
      </Root>
    </>
  )
})

AppLayout.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(AppLayout)
