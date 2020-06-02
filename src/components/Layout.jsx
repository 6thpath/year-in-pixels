import styled from 'styled-components'

import background from 'assets/images/background.png'

export const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.5;
  z-index: ${(p) => p.theme.zIndex.background};

  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`
