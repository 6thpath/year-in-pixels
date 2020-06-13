import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons'
import { Transition, animated } from 'react-spring/renderprops'

import theme from 'theme'

import MoodScrollPane from './MoodScrollPane'

const Container = styled.div`
  position: ${(p) => p.position};
  top: ${(p) => (p.position === 'sticky' ? '60px' : 0)};
  left: 0;
  z-index: ${(p) => p.theme.zIndex.sm};
  ${(p) => (p.hasBackground ? `box-shadow: 0 4px 4px -2px ${p.theme.colors.grey[500]};` : '')}
  background: rgba(255, 255, 255, ${(p) => (p.hasBackground ? 0.95 : 0)});
  transition: all 0.4s;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const MoodContainer = styled.div`
  width: 100%;
  top: 0;
  overflow-x: auto;
  padding: ${(p) => p.theme.spacing.sm} 0;
  scroll-behavior: smooth;

  display: grid;
  grid-template-columns: repeat(11, minmax(100px, auto));
  grid-gap: ${(p) => p.theme.spacing.xs};
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: ${(p) => p.theme.screen.md};
  }

  @media (min-width: ${(p) => parseInt(p.theme.screen.lg, 10) + 20 + 'px'}) {
    width: ${(p) => p.theme.screen.lg};
  }
`

const Cell = styled.div`
  text-align: center;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const AnimatedCell = animated(Cell)

const ButtonContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 60px;
  z-index: ${(p) => p.theme.zIndex.sm};
  background: transparent;
  pointer-events: none;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StyledButton = styled(Button)`
  height: 26px;
  font-size: 17px;
  pointer-events: auto;
  padding: 0 ${(p) => p.theme.spacing.xxs};
  border-radius: ${(p) => p.theme.radius.lg};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background: ${(p) => p.theme.colors.primary.lighter};
  opacity: 0.8;
  border: none;
  box-shadow: 0 6px 15px -3px ${(p) => p.theme.colors.grey[600]};

  &:hover {
    background: ${(p) => p.theme.colors.primary.light};
    color: ${(p) => p.theme.colors.primary.contrastText};
  }
`

const AnimatedStlBtn = animated(StyledButton)

const ColorBlock = styled.div`
  height: 22px;
  width: 22px;
  border: 1px dashed ${(p) => (p.type === 'nodate' ? p.theme.colors.black : p.theme.colors.white)};
  border-radius: ${(p) => p.theme.radius.md};
  box-shadow: 0 0 8px 2px ${(p) => p.theme.colors.grey[200]};
  transition: all 0.4s;

  &:hover {
    border-color: transparent;
    transform: scale(1.1) skew(-0.06turn, 18deg);
    box-shadow: 0 0 0 0 ${(p) => p.theme.colors.grey[500]};
  }
`

const Text = styled.span`
  user-select: none;
  margin-left: ${(p) => p.theme.spacing.xxs};
  text-transform: capitalize;
`

const Mood = ({ containerRef }) => {
  const [position, setPosition] = useState('relative')
  const [hasBackground, setHasBackground] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)

  const moodRef = useRef(null)

  const onChangePosition = (pos) => {
    setPosition(pos)

    if (containerRef.current.scrollTop >= 17 && pos === 'sticky') setHasBackground(true)
    else setHasBackground(false)

    if (containerRef.current.scrollTop > 26) setButtonVisible(true)
    else setButtonVisible(false)
  }

  const handleScroll = useCallback(() => {
    if (containerRef.current.scrollTop >= 17 && position === 'sticky') setHasBackground(true)
    else setHasBackground(false)

    if (containerRef.current.scrollTop > 26) setButtonVisible(true)
    else setButtonVisible(false)
  }, [containerRef, position])

  useEffect(() => {
    const ref = containerRef.current

    ref.addEventListener('scroll', handleScroll)

    return () => {
      ref.removeEventListener('scroll', handleScroll)
    }
  }, [containerRef, handleScroll])

  return (
    <>
      <Container id='t-mood-bar' position={position} hasBackground={hasBackground}>
        <MoodContainer ref={moodRef}>
          <Transition
            items={Object.keys(theme.colors.mood)}
            from={{ transform: 'translateY(-10px)', opacity: 0, zIndex: -1 }}
            enter={{ transform: 'translateY(0px)', opacity: 1, zIndex: 1 }}
            leave={{ transform: 'translateY(-10px)', opacity: 0, zIndex: -1 }}
            trail={100}
          >
            {(m) => (props) => (
              <AnimatedCell key={m} style={props}>
                <ColorBlock style={{ backgroundColor: theme.colors.mood[m] }} type={m} />
                <Text>{m}</Text>
              </AnimatedCell>
            )}
          </Transition>
        </MoodContainer>

        <MoodScrollPane moodRef={moodRef} />
      </Container>

      <Transition
        items={position === 'sticky' && buttonVisible}
        from={{ transform: 'translateY(-10px)', opacity: 0, zIndex: -1 }}
        enter={{ transform: 'translateY(0px)', opacity: 1, zIndex: 1 }}
        leave={{ transform: 'translateY(-10px)', opacity: 0, zIndex: -1 }}
        immediate={!(position === 'sticky' && buttonVisible)}
        config={{ duration: 200 }}
      >
        {(show) =>
          show &&
          ((props) => (
            <ButtonContainer>
              <AnimatedStlBtn style={{ ...props, top: 62 }} onClick={() => onChangePosition('relative')}>
                <UpCircleOutlined />
              </AnimatedStlBtn>
            </ButtonContainer>
          ))
        }
      </Transition>

      <Transition
        items={position === 'relative' && buttonVisible}
        from={{ transform: 'translateY(-10px)', opacity: 0, zIndex: -1 }}
        enter={{ transform: 'translateY(0px)', opacity: 1, zIndex: 1 }}
        leave={{ transform: 'translateY(-10px)', opacity: 0, zIndex: -1 }}
        immediate={!(position === 'relative' && buttonVisible)}
        config={{ duration: 200 }}
      >
        {(show) =>
          show &&
          ((props) => (
            <ButtonContainer>
              <AnimatedStlBtn
                style={{ ...props, top: 0 }}
                onClick={() => {
                  onChangePosition('sticky')
                }}
              >
                <DownCircleOutlined />
              </AnimatedStlBtn>
            </ButtonContainer>
          ))
        }
      </Transition>
    </>
  )
}

export default Mood
