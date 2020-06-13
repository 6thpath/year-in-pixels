import React from 'react'
import styled from 'styled-components'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { useStore } from 'store'

import Tooltip from 'components/Tooltip'

const Text = styled.p`
  margin: 0;
`

const Container = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 2;

  &:hover {
    cursor: pointer;
  }
`

const StyledIcon = styled(QuestionCircleOutlined)`
  color: ${(p) => p.theme.colors.grey[500]};
  transition: all 0.4s;

  &:hover {
    color: ${(p) => p.theme.colors.grey[700]};
  }
`

const PasswordTooltip = () => {
  const [{ ui }] = useStore()

  return (
    <Tooltip
      type='info'
      placement={ui.isMobile ? 'topRight' : 'right'}
      title={
        <div>
          <Text>Password rules:</Text>
          <Text>- Minimum 6 characters length.</Text>
          <Text>- Accept letters and digits only.</Text>
        </div>
      }
    >
      <Container>
        <StyledIcon />
      </Container>
    </Tooltip>
  )
}

export default PasswordTooltip
