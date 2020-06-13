import React, { useRef } from 'react'
import styled from 'styled-components'
import { DatePicker } from 'antd'

import { useStore } from 'store'
import { SET_YEAR } from 'store/data'

const StyledDatePicker = styled(DatePicker)`
  input {
    &::placeholder {
      user-select: none;
    }
  }
`

const RightHeader = () => {
  const [{ data }, dispatch] = useStore()

  const datePickerRef = useRef(null)

  const onDateChange = (date) => {
    dispatch({ type: SET_YEAR, payload: date })
  }

  const onOpenChange = () => {
    datePickerRef.current.blur()
  }

  return (
    <>
      <div id='t-year-picker'>
        <StyledDatePicker
          ref={datePickerRef}
          value={data.selectedYear}
          onChange={onDateChange}
          onOpenChange={onOpenChange}
          picker='year'
          inputReadOnly
        />
      </div>
    </>
  )
}

export default RightHeader
