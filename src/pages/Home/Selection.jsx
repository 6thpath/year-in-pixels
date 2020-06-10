import React from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'

import './Selection.less'

import { useStore } from 'store'
import { SET_SELECTIONS_VISIBILITY, SET_GLOBAL_MESSAGE } from 'store/ui'
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

const Selection = () => {
  const [{ auth, data, ui }, dispatch] = useStore()

  const onCloseModal = () => {
    dispatch({ type: SET_SELECTIONS_VISIBILITY, payload: false })
  }

  const onSelect = (emt) => {
    if (Object.keys(data.data).length) {
      db.collection('pixels')
        .doc(auth.user.uid)
        .update({ [data.todayKey]: emt })
        .catch((error) => dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: error.message, type: 'error' } }))
        .finally(onCloseModal)
    } else {
      db.collection('pixels')
        .doc(auth.user.uid)
        .set({ [data.todayKey]: emt })
        .catch((error) => dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: error.message, type: 'error' } }))
        .finally(onCloseModal)
    }
  }

  return (
    <Modal
      title={null}
      footer={null}
      wrapClassName='styled-modal'
      closable={false}
      visible={ui.isSltVisible}
      maskClosable
      onCancel={onCloseModal}
    >
      <Container>
        {Object.keys(theme.colors.emotion).map((emt, index) => {
          if (emt === 'nodate') return <React.Fragment key={emt} />
          return (
            <Cell key={emt}>
              <Button background={theme.colors.emotion[emt]} onClick={() => onSelect(emt)}>
                <Text data-text={emt}>{emt}</Text>
              </Button>
            </Cell>
          )
        })}
      </Container>
    </Modal>
  )
}

export default Selection
