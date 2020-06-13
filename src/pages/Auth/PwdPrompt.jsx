import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Modal } from 'antd'

import theme from 'theme'

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.xs};
`

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

const EmailText = styled.p`
  font-weight: ${theme.font.weight.bold};
  margin-bottom: ${theme.spacing.sm};
`

const FocusBorder = styled.span`
  position: relative;
  top: -2px;
  bottom: 0;
  left: 0;
  width: ${(p) => (p.hasText || p.hasError ? '100%' : '0')};
  height: 2px;
  background: linear-gradient(
    to right,
    ${(p) => (p.hasError ? theme.colors.error.lighter : theme.colors.primary.lighter)},
    ${(p) => (p.hasError ? theme.colors.error.main : theme.colors.primary.main)}
  );
  transition: all 0.4s;
  z-index: 2;
`

const Label = styled.label`
  user-select: none;
`

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: ${theme.font.size.xs};
  outline: none;
  padding-bottom: ${theme.spacing.xs};
  border-width: 0 0 2px 0;
  border-style: solid;
  background: transparent;
  border-image: linear-gradient(to right, ${theme.colors.primary.lighter}, ${theme.colors.primary.light}) 1;
  z-index: 2;

  &:focus ~ #${(p) => p.borderId} {
    width: 100%;
  }

  & ~ #${(p) => p.labelId} {
    position: absolute;
    left: 0;
    top: ${(p) => (p.value ? '-20px' : 0)};
    font-size: ${(p) => (p.value ? theme.font.size.xxs : theme.font.size.xs)};
    color: ${(p) => (p.value ? theme.colors.primary.dark : theme.colors.grey[400])};
    transition: 0.3s;
    z-index: ${(p) => (p.value ? -1 : 1)};
  }

  &:focus ~ #${(p) => p.labelId} {
    top: -20px;
    font-size: ${theme.font.size.xxs};
    color: ${theme.colors.primary.dark};
    transition: 0.3s;
    z-index: 1;
  }

  ::placeholder {
    user-select: none;
  }
`

const Prompt = ({ visible, title, description, email, close, afterClose }) => {
  const [text, setText] = useState('')
  const [pwdHasError, setPwdHasError] = useState('')

  const pwdRef = useRef(null)

  const onPwdBlur = () => {
    if (pwdHasError) setPwdHasError('')
  }

  const onInputChange = (e) => {
    setText(e.target.value)
  }

  const onSubmit = (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault()

    close(text)
  }

  const onCancel = () => {
    close('')
  }

  return (
    <Modal
      wrapClassName='styled-pwd-modal'
      visible={visible}
      title={title}
      centered
      width={300}
      okText='Submit'
      onOk={onSubmit}
      onCancel={onCancel}
      getContainer={false}
      afterClose={afterClose}
    >
      {description}
      <Form onSubmit={onSubmit}>
        <FormItem>
          <EmailText>{email}</EmailText>
        </FormItem>

        <FormItem>
          <Input
            type='password'
            ref={pwdRef}
            onChange={onInputChange}
            value={text}
            onBlur={onPwdBlur}
            labelId='pwd-label'
            borderId='pwd-border'
          />
          <Label id='pwd-label'>Password</Label>
          <FocusBorder id='pwd-border' hasText={!!text.length} hasError={!!pwdHasError} />
        </FormItem>
      </Form>
    </Modal>
  )
}

export default function prompt(config) {
  return new Promise((resolve) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    let currentConfig = { ...config, close, visible: true }

    function destroy(value) {
      const unmountResult = ReactDOM.unmountComponentAtNode(div)
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div)
      }

      resolve(value)
    }

    function render(props) {
      ReactDOM.render(<Prompt {...props} />, div)
    }

    function close(value) {
      currentConfig = {
        ...currentConfig,
        visible: false,
        afterClose: destroy.bind(this, value),
      }

      render(currentConfig)
    }

    render(currentConfig)
  })
}
