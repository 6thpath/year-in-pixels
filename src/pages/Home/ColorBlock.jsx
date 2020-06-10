import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

const Block = styled.div`
  height: 22px;
  width: 22px;
  border: 1px dashed black;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  will-change: transform;
  transition: box-shadow 0.5s;

  &:hover {
    box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
    border-color: transparent;
  }
`

const AnimatedBlock = animated(Block)

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const ColorBlock = ({ background }) => {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 500, friction: 26 } }))
  return (
    <AnimatedBlock
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ background, transform: props.xys.interpolate(trans) }}
    />
  )
}

ColorBlock.propTypes = {
  background: PropTypes.string,
}

export default ColorBlock
