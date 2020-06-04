import React from 'react'
import { Tooltip } from 'antd'
import PropTypes from 'prop-types'

import './Tooltip.less'

import { usePrevious } from 'hooks/usePrevious'
import theme from 'theme'

const ETooltip = ({ children, visible, title, type = 'error', placement = 'top' }) => {
  const prevTitle = usePrevious(title)
  let titleToShow

  // Get title
  if (!visible) titleToShow = prevTitle
  else titleToShow = title

  let colorConfig = {}

  switch (type) {
    case 'error':
      colorConfig['color'] = theme.colors.error.main
      break

    case 'info':
      break

    default:
  }

  return (
    <Tooltip
      {...colorConfig}
      overlayClassName='styled-overlay'
      placement={placement}
      title={titleToShow}
      {...(typeof visible === 'boolean' ? { visible } : {})}
    >
      {children}
    </Tooltip>
  )
}

ETooltip.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  title: PropTypes.any,
  type: PropTypes.string,
  placement: PropTypes.string,
}

export default ETooltip
