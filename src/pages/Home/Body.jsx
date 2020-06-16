import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LineOutlined } from '@ant-design/icons'
import { useTransition, animated } from 'react-spring'

import { PIXELS } from 'constants/Collection'
import { useStore } from 'store'
import { SET_DATA } from 'store/data'
import { SET_MOOD_MODAL_VISIBLE, SET_TUTORIAL_VISIBLE } from 'store/ui'
import { db } from 'utils/firebase'
import theme from 'theme'

import Loading from 'components/App/Loading'
import Placeholder from './Placeholder'

const Container = styled.div`
  width: 100%;
  padding: 0 ${(p) => p.theme.spacing.xs} ${(p) => p.theme.spacing.xs};
  margin: 0 auto;
  position: relative;
  transform-style: flat;
  z-index: 1;

  display: grid;
  grid-template-columns: minmax(auto, 30px) repeat(12, auto);
  align-items: center;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: ${(p) => p.theme.screen.md};
  }

  @media (min-width: ${(p) => parseInt(p.theme.screen.lg, 10) + 20 + 'px'}) {
    width: ${(p) => p.theme.screen.lg};
  }
`

const AnimatedContainer = animated(Container)

const Col = styled.div`
  border: 1px solid ${(p) => p.theme.colors.white};
  border-width: 1px 0 1px 1px;

  &:last-child {
    border-right-width: 1px;
  }
`

const Cell = styled.div`
  ${(p) => p.header && `font-weight: ${p.theme.font.weight.bold};`}
  user-select: none;
  min-height: 23px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid ${(p) => p.theme.colors.white};
  border-width: 0 0 1px 0;
  background: ${(p) =>
    p.header
      ? p.selected
        ? p.theme.colors.primary.light
        : p.theme.colors.primary.lighter
      : p.type === 'nodate'
      ? p.theme.colors.mood.nodate
      : p.background};
  transition: all 0.4s, border-bottom-width 1s 0.3s, border-radius 1s;
  ${(p) =>
    p.today &&
    `
  cursor: pointer;

    &:after {
      content: ${p.isMobile ? `'x'` : `'today'`};
      letter-spacing: 2px;
      color: ${p.background !== 'rgba(255, 255, 255, .35)' ? p.theme.colors.white : p.theme.colors.black};
      mix-blend-mode: hard-light;
    }

  &:hover {
    transform: scale(1.3);
    border-bottom-width: 0;
    border-radius: ${p.theme.radius.sm};
    box-shadow: 0 0 30px 2px ${p.theme.colors.primary.main};

    transition: all 0.4s, border-bottom-width 0s, border-radius 0s;
  }
`}

  &:last-child {
    border-bottom-width: 0;
  }

  ${(p) =>
    p.header &&
    `
    cursor: pointer;

    &:hover {
      background: ${p.theme.colors.primary.light};
    }
`}
`

const getColor = (emt) => theme.colors.mood[emt] || 'rgba(255, 255, 255, .35)'

const Body = () => {
  const [{ auth, data, ui }, dispatch] = useStore()
  const [dates, setDates] = useState({})
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [hasError, setHasError] = useState('')

  const transitions = useTransition(data.selectedYear, null, {
    from: { opacity: 0, transform: 'scale(0.8)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.8)' },
  })

  useEffect(() => {
    if (auth.user.uid) {
      const unsubscribe = db
        .collection(PIXELS)
        .doc(auth.user.uid)
        .onSnapshot(
          (doc) => {
            if (!loaded) setLoaded(true)
            if (doc.exists) dispatch({ type: SET_DATA, payload: doc.data() })
          },
          (error) => {
            if (!loaded) setLoaded(true)
            setHasError(error.message)
          }
        )

      return () => unsubscribe()
    }
  }, [loaded, auth.user.uid, dispatch])

  useEffect(() => {
    if (data.selectedYear) {
      setDates(() => {
        const year = {}

        Array.from({ length: 12 }, (_, monthNumb) => {
          const monthMoment = data.selectedYear.month(monthNumb)
          const monthDataKey = `${data.selectedYear.year()}-${monthMoment.format('MMM')}`

          year[monthNumb] = {
            key: monthDataKey,
            shortName: monthMoment.format('MMM'),
            fullName: monthMoment.format('MMMM'),
            selected: selectedMonth === monthDataKey,
            dates: {},
          }

          Array.from({ length: monthMoment.daysInMonth() }).map((__, date) => {
            const dateDataKey = `${monthDataKey}-${date + 1}`

            year[monthNumb].dates[date + 1] = {
              key: dateDataKey,
              status: getColor((data.data && data.data[dateDataKey]) || ''),
            }

            return __
          })

          return _
        })

        return year
      })
    } else {
      setDates({})
    }
  }, [data.data, data.selectedYear, selectedMonth])

  const renderNoDate = (amount) => {
    return Array.from({ length: amount }, (_, index) => <Cell key={index} type='nodate' />)
  }

  const openMoodModal = () => {
    if (ui.tutorialVisible) {
      dispatch({ type: SET_TUTORIAL_VISIBLE, payload: false })
    }

    dispatch({ type: SET_MOOD_MODAL_VISIBLE, payload: true })
  }

  if (!loaded) {
    return <Loading />
  }

  if (!data.selectedYear) {
    return <Placeholder message='No year selected' />
  }

  if (hasError) {
    return <Placeholder message={hasError} />
  }

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <AnimatedContainer id='t-body' key={key} style={props}>
          <Col>
            {Array.from({ length: 32 }, (_, index) => {
              return (
                <Cell
                  {...(!index ? { style: { background: theme.colors.primary.semi } } : { header: true })}
                  key={index}
                >
                  {index || <LineOutlined />}
                </Cell>
              )
            })}
          </Col>

          {Object.keys(dates).map((month, index) => {
            const amountOfDays = Object.keys(dates[month].dates).length

            return (
              <Col key={index}>
                <Cell header selected={dates[month].selected} onClick={() => setSelectedMonth(dates[month].key)}>
                  {dates[month].shortName}
                </Cell>

                {Object.keys(dates[month].dates).map((day, _index) => {
                  return (
                    <Cell
                      key={_index}
                      selected={dates[month].selected}
                      {...(dates[month].dates[day].key === data.todayDataKey && {
                        id: 't-today-square',
                        isMobile: ui.isMobile,
                        today: true,
                        openMoodModal,
                      })}
                      background={dates[month].dates[day].status}
                    />
                  )
                })}

                {renderNoDate(31 - amountOfDays)}
              </Col>
            )
          })}
        </AnimatedContainer>
      )
  )
}

export default Body
