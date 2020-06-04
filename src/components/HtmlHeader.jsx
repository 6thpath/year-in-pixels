import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'

const HtmlHeader = ({ title = 'Year In Pixels' }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
)

HtmlHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default HtmlHeader
