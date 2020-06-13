import React from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'

import { PIXELS } from 'constants/Collection'
import { useStore } from 'store'
import { SET_MOOD_MODAL_VISIBLE, SET_GLOBAL_MESSAGE } from 'store/ui'
import { db } from 'utils/firebase'
import theme from 'theme'

const Container = styled.div`
  width: 100%;
  top: 0;
  overflow-x: auto;
  padding: ${(p) => p.theme.spacing.sm};
  scroll-behavior: smooth;

  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: ${(p) => p.theme.spacing.xs};
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Cell = styled.div`
  text-align: center;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Text = styled.p`
  user-select: none;
  text-transform: capitalize;
  mix-blend-mode: hard-light;
  width: 100%;
  color: ${(p) => p.theme.colors.white};
  line-height: 40px;
  letter-spacing: 1px;
`

const Button = styled.div`
  cursor: pointer;
  height: 40px;
  width: 100%;
  position: relative;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.background};
  transition: all 0.4s;

  &:hover {
    border-color: transparent;
    background: ${(p) => p.background}99;
  }
`

const MoodModal = () => {
  const [{ auth, data, ui }, dispatch] = useStore()

  const onCloseModal = () => {
    dispatch({ type: SET_MOOD_MODAL_VISIBLE, payload: false })
  }

  const onSelect = (mood) => {
    if (Object.keys(data.data).length) {
      db.collection(PIXELS)
        .doc(auth.user.uid)
        .update({ [data.todayDataKey]: mood })
        .catch((error) => dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: error.message, type: 'error' } }))
        .finally(onCloseModal)
    } else {
      db.collection(PIXELS)
        .doc(auth.user.uid)
        .set({ [data.todayDataKey]: mood })
        .catch((error) => dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: error.message, type: 'error' } }))
        .finally(onCloseModal)
    }
  }

  return (
    <Modal
      title={null}
      footer={null}
      closable={false}
      maskClosable
      wrapClassName='styled-mood-modal'
      visible={ui.isMoodModalVisible}
      onCancel={onCloseModal}
    >
      <Container>
        {Object.keys(theme.colors.mood).map((m, index) => {
          if (m === 'nodate') return <React.Fragment key={m} />
          return (
            <Cell key={m}>
              <Button background={theme.colors.mood[m]} onClick={() => onSelect(m)}>
                <Text>{m}</Text>
              </Button>
            </Cell>
          )
        })}
      </Container>
    </Modal>
  )
}

export default MoodModal
