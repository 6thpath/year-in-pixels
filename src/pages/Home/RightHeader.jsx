import React from 'react'
import styled from 'styled-components'
import { DatePicker } from 'antd'

import { useStore } from 'store'
import { SET_DATETIME } from 'store/data'

const StyledDatePicker = styled(DatePicker)`
  margin-left: ${(p) => p.theme.spacing.xs};

  input {
    &::placeholder {
      user-select: none;
    }
  }
`

const RightHeader = () => {
  const [{ data }, dispatch] = useStore()

  const onDateChange = (date) => {
    dispatch({ type: SET_DATETIME, payload: date })
  }

  return (
    <>
      <StyledDatePicker onChange={onDateChange} value={data.selectedYear} picker='year' inputReadOnly />
    </>
  )
}

export default RightHeader
