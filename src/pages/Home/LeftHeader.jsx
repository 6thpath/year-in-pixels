import React, { useState } from 'react'
import styled from 'styled-components'
import { Menu, Dropdown, Badge, Tooltip } from 'antd'
import { MailOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import { useCountdown } from 'hooks/useCountdown'
import { useStore } from 'store'
import { SET_GLOBAL_MESSAGE, SET_SIDEMENU_STATE } from 'store/ui'
import { firebase, signOut } from 'utils/firebase'

import Avatar from 'components/Avatar'
import { NonSelectableText } from 'components/Text'

const DropdownButton = styled.div`
  cursor: pointer;
  filter: none;
  transition: all 0.4s;

  &:hover {
    filter: blur(1px);
  }
`

const Username = styled.span`
  margin-left: ${(p) => p.theme.spacing.xs};
`

const LeftHeader = () => {
  const [{ auth, ui }, dispatch] = useStore()
  const [RVEdisabled, setRVEDisabled] = useState(false)

  const onTimerFinish = () => {
    setRVEDisabled(false)
  }

  const countdown = useCountdown({ seconds: 60, onFinish: onTimerFinish })

  const onSignOut = () => {
    signOut((error) => dispatch({ type: SET_GLOBAL_MESSAGE, payload: error.message }))
  }

  const onMenuClick = ({ key }) => {
    switch (key) {
      case 'requestVerify': {
        setRVEDisabled(true)

        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => dispatch({ type: SET_GLOBAL_MESSAGE, payload: 'Verification email sent!' }))
          .catch((error) => dispatch({ type: SET_GLOBAL_MESSAGE, payload: error.message }))
          .finally(() => dispatch({ type: SET_GLOBAL_MESSAGE, payload: '' }))
        break
      }

      case 'signout':
        onSignOut()
        break

      default:
    }
  }

  const onToggleSideMenu = (boolean) => {
    dispatch({ type: SET_SIDEMENU_STATE, payload: boolean })
  }

  if (ui.isMobile) {
    if (ui.isSideMenuOpen)
      return <MenuUnfoldOutlined style={{ fontSize: 21 }} onClick={() => onToggleSideMenu(false)} />
    return <MenuFoldOutlined style={{ fontSize: 21 }} onClick={() => onToggleSideMenu(true)} />
  }

  return (
    <>
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu onClick={onMenuClick}>
            {!auth.user.emailVerified && (
              <Menu.Item
                disabled={RVEdisabled}
                key='requestVerify'
                icon={
                  <Badge count={1} dot offset={[-7, 2]}>
                    <MailOutlined />
                  </Badge>
                }
              >
                <Tooltip
                  placement='right'
                  title={`Your account hasn't been verified yet. This means you'll lost this account if someone use social sign in with email same as current account's email.`}
                >
                  <NonSelectableText>
                    Request Verification Email
                    {RVEdisabled ? `(${countdown})` : ''}
                  </NonSelectableText>
                </Tooltip>
              </Menu.Item>
            )}

            <Menu.Item key='signout' icon={<LogoutOutlined />}>
              <NonSelectableText>Sign out</NonSelectableText>
            </Menu.Item>
          </Menu>
        }
      >
        <DropdownButton>
          <Avatar
            photoUrl={auth.user.photoUrl}
            name={auth.user.name}
            email={auth.user.email}
            badge={auth.user.emailVerified ? 0 : 1}
          />
        </DropdownButton>
      </Dropdown>

      <Username>Hi, {auth.user.name || auth.user.email}!</Username>
    </>
  )
}

export default LeftHeader
