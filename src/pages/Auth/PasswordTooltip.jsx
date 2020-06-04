import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { QuestionCircleOutlined } from '@ant-design/icons'

import Tooltip from 'components/Tooltip'

const StyledText = styled.p`
  margin: 0;
`

const Info = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 2;
`

const StyledIcon = styled(QuestionCircleOutlined)`
  color: ${(p) => p.theme.colors.grey[500]};
  transition: all 0.4s;

  &:hover {
    color: ${(p) => p.theme.colors.grey[700]};
  }
`

const PasswordTooltip = () => {
  return (
    <Tooltip
      type='info'
      placement='topRight'
      title={
        <div>
          <StyledText>Password rules:</StyledText>
          <StyledText>- Minimum 6 characters length.</StyledText>
          <StyledText>- Accept letters and digits only.</StyledText>
        </div>
      }
    >
      <Info>
        <StyledIcon />
      </Info>
    </Tooltip>
  )
}

PasswordTooltip.propTypes = {
  title: PropTypes.any,
}

export default PasswordTooltip
