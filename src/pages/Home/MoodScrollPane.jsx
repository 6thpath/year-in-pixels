import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { debounce } from 'lodash'

import { useStore } from 'store'

const ScrollBtnCtn = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  background: transparent;

  display: flex;
  flex-direction: row;
  align-items: center;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: ${(p) => p.theme.screen.md};
  }

  @media (min-width: ${(p) => parseInt(p.theme.screen.lg, 10) + 20 + 'px'}) {
    width: ${(p) => p.theme.screen.lg};
  }
`

const ScrollButton = styled.div`
  height: 70%;
  padding: 0 ${(p) => p.theme.spacing[p.isMobile ? 'xxs' : 'xs']};
  ${(p) => (p.left ? 'margin-left: 5px' : 'margin-right: 5px')};
  position: absolute;
  ${(p) => (p.left ? 'left: 0;' : 'right: 0;')}
  color: ${(p) => p.theme.colors[p.isMobile ? 'purple' : 'black']};
  background: ${(p) =>
    p.isMobile
      ? `linear-gradient(to ${p.left ? 'left' : 'right'}, rgba(244, 238, 255, .95), rgba(220, 214, 247, .95))`
      : p.theme.colors.primary.lighter};
  opacity: ${(p) => (p.visible ? 1 : 0)};
  z-index: ${(p) => (p.visible ? 1 : -2)};
  border-radius: ${(p) => p.theme.radius.md};
  cursor: pointer;
  pointer-events: ${(p) => (p.isMobile ? 'none' : 'auto')};
  transition: all 0.4s;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.1);
    background: ${(p) => p.theme.colors.primary.light};
    color: ${(p) => p.theme.colors.primary.contrastText};
  }
`

const MoodScrollPane = ({ moodRef }) => {
  const [{ ui }] = useStore()
  const [scrollButton, setScrollButton] = useState('right')

  const handleCtnScroll = useCallback(() => {
    if (moodRef.current) {
      const { scrollWidth, scrollLeft, clientWidth } = moodRef.current

      if (scrollWidth > clientWidth) {
        if (scrollLeft === 0) {
          setScrollButton('right')
        } else if (scrollLeft === scrollWidth - clientWidth) {
          setScrollButton('left')
        } else {
          setScrollButton('both')
        }
      } else {
        setScrollButton(null)
      }
    }
  }, [moodRef])

  const scrollLeft = () => {
    if (moodRef.current) moodRef.current.scrollTo(moodRef.current.scrollLeft - window.innerWidth, 0)
  }

  const scrollRight = () => {
    if (moodRef.current) moodRef.current.scrollTo(moodRef.current.scrollLeft + window.innerWidth, 0)
  }

  useEffect(() => {
    if (moodRef.current) {
      const ref = moodRef.current
      ref.addEventListener('scroll', debounce(handleCtnScroll, 100))

      return () => {
        ref.removeEventListener('scroll', handleCtnScroll)
      }
    }
  }, [moodRef, handleCtnScroll])

  return (
    <ScrollBtnCtn>
      <ScrollButton
        left
        visible={scrollButton === 'left' || scrollButton === 'both'}
        onClick={scrollLeft}
        isMobile={ui.isMobile}
      >
        <LeftOutlined />
      </ScrollButton>

      <ScrollButton
        visible={scrollButton === 'right' || scrollButton === 'both'}
        onClick={scrollRight}
        isMobile={ui.isMobile}
      >
        <RightOutlined />
      </ScrollButton>
    </ScrollBtnCtn>
  )
}

MoodScrollPane.propTypes = {
  ecRef: PropTypes.any,
}

export default MoodScrollPane
