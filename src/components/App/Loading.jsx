import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

const Container = styled.div`
  width: 100%;
  margin-top: 200px;

  display: flex;
  flex-direction: row;
  justify-content: center;
`

const LoadingScreen = () => {
  return (
    <Container>
      <Spin />
    </Container>
  )
}

export default LoadingScreen
