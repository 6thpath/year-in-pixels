import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip as AntTooltip } from 'antd'

import { usePrevious } from 'hooks/usePrevious'
import theme from 'theme'

const Tooltip = ({ children, visible, title, type = 'error', placement = 'top' }) => {
  // Get previous title
  const prevTitle = usePrevious(title)
  let titleToShow

  // Decide which title to show, prevent overlay's width change to 0 before hide
  if (!visible && prevTitle) titleToShow = prevTitle
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
    <AntTooltip
      {...colorConfig}
      overlayClassName='styled-tooltip-overlay'
      placement={placement}
      title={titleToShow}
      {...(typeof visible === 'boolean' ? { visible } : {})}
    >
      {children}
    </AntTooltip>
  )
}

Tooltip.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  title: PropTypes.any,
  type: PropTypes.string,
  placement: PropTypes.string,
}

export default Tooltip
