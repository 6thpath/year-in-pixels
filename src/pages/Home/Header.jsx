import React from 'react'
import styled from 'styled-components'

import LeftHeader from './LeftHeader'
import RightHeader from './RightHeader'

const Container = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: sticky;
  top: 0;
  left: 0;
  z-index: ${(p) => p.theme.zIndex.md};
  padding: 0 ${(p) => p.theme.spacing.md};
  background: ${(p) => p.theme.colors.white};
  box-shadow: 0 4px 4px -2px ${(p) => p.theme.colors.grey[700]};
`

const ComponentContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: ${(p) => p.theme.screen.md};
  }

  @media (min-width: ${(p) => parseInt(p.theme.screen.lg, 10) + 20 + 'px'}) {
    width: ${(p) => p.theme.screen.lg};
  }
`

const HeaderGroup = styled.div`
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Header = () => {
  return (
    <Container>
      <ComponentContainer>
        <HeaderGroup>
          <LeftHeader />
        </HeaderGroup>

        <HeaderGroup>
          <RightHeader />
        </HeaderGroup>
      </ComponentContainer>
    </Container>
  )
}

export default Header
