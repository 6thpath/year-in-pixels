import React from 'react'
import styled from 'styled-components'
import { Select, DatePicker } from 'antd'

import { useStore } from 'store'
import { SET_DISPLAY_TYPE, SET_DATETIME } from 'store/data'

const { Option } = Select

const StyledDatePicker = styled(DatePicker)`
  margin-left: ${(p) => p.theme.spacing.xs};
`

const RightHeader = () => {
  const [{ data }, dispatch] = useStore()

  const onDisplayTypeChange = (value) => {
    dispatch({ type: SET_DISPLAY_TYPE, payload: value })
    dispatch({ type: SET_DATETIME, payload: null })
  }

  const onDateChange = (date, dateString) => {
    dispatch({ type: SET_DATETIME, payload: date })
  }

  return (
    <>
      <Select value={data.displayType} style={{ width: 90 }} onChange={onDisplayTypeChange}>
        <Option value='year'>Year</Option>
        <Option value='month'>Month</Option>
      </Select>

      <StyledDatePicker onChange={onDateChange} value={data.selectedDate} picker={data.displayType} />
    </>
  )
}

export default RightHeader
