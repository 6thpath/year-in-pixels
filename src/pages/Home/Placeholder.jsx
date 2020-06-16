import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CalendarOutlined } from '@ant-design/icons'
import { useTransition, animated } from 'react-spring'

const Container = styled.div`
  width: 100%;
  padding-top: ${(p) => p.theme.spacing.lg};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const AnimatedContainer = animated(Container)

const Text = styled.p`
  user-select: none;
  font-size: ${(p) => p.theme.font.size.md};
`

const Placeholder = ({ message }) => {
  const transitions = useTransition(true, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <AnimatedContainer key={key} style={props}>
          <CalendarOutlined style={{ fontSize: 50 }} />
          <Text>{message}</Text>
        </AnimatedContainer>
      )
  )
}

Placeholder.propTypes = {
  message: PropTypes.string,
}

export default Placeholder
