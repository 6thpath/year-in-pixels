import React from 'react'
import { Tooltip as AntdTooltip } from 'antd'
import PropTypes from 'prop-types'

import theme from 'theme'

const Tooltip = ({ children, visible, title }) => {
  return (
    <AntdTooltip color={theme.colors.error.main} title={title} {...(typeof visible === 'boolean' ? { visible } : {})}>
      {children}
    </AntdTooltip>
  )
}

Tooltip.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

export default Tooltip
