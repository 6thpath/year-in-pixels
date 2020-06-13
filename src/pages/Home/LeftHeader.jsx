import React, { useState } from 'react'
import styled from 'styled-components'
import { Menu, Dropdown, Badge, Button, Tooltip, Input } from 'antd'
import { MailOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import { useCountdown } from 'hooks/useCountdown'
import { useStore } from 'store'
import { SET_AUTH_USER } from 'store/auth'
import { SET_GLOBAL_MESSAGE, SET_SIDEMENU_VISIBLE } from 'store/ui'
import { firebase, signOut, getUsersProfile } from 'utils/firebase'

import Avatar from 'components/Avatar'

const DropdownButton = styled.div`
  cursor: pointer;
  filter: none;
  transition: all 0.4s;

  &:hover {
    filter: blur(1px);
  }
`

const StyledInput = styled(Input)`
  width: 300px;
  margin-left: ${(p) => p.theme.spacing.xxs};
`

const Username = styled.span`
  user-select: none;
  border-radius: ${(p) => p.theme.radius.md};
  padding: ${(p) => p.theme.spacing.xxs};
  margin-left: ${(p) => p.theme.spacing.xxs};
  transition: all 0.4s;

  &:hover {
    background: ${(p) => p.theme.colors.primary.light};
  }
`

const NonSelectableText = styled.span`
  user-select: none;
`

const StyledButton = styled(Button)`
  padding-left: 0px;
  color: ${(p) => p.theme.colors.primary.dark};
`

const WithBadge = ({ children, badge }) => {
  return (
    <Badge count={badge} dot offset={[-2, 3]}>
      {children}
    </Badge>
  )
}

const LeftHeader = () => {
  const [{ auth, ui }, dispatch] = useStore()
  const [RVEdisabled, setRVEDisabled] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(auth.user.name || '')

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const updateUsername = () => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: username,
      })
      .then(() => {
        dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: 'Username updated successfully', type: 'success' } })
        firebase
          .auth()
          .currentUser.reload()
          .then(() => {
            const refreshUser = firebase.auth().currentUser
            dispatch({ type: SET_AUTH_USER, payload: { user: getUsersProfile(refreshUser) } })
          })
      })
      .catch((error) => {
        dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: error.message, type: 'error' } })
      })
      .finally(() => setIsEditing(false))
  }

  const onBlur = () => {
    setUsername(auth.user.name || '')
    setIsEditing(false)
  }

  const onTimerFinish = () => {
    setRVEDisabled(false)
  }

  const countdown = useCountdown({ seconds: 60, onFinish: onTimerFinish })

  const onSignOut = () => {
    signOut((error) => dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: error.message, type: 'error' } }))
  }

  const onMenuClick = ({ key }) => {
    switch (key) {
      case 'requestVerify': {
        setRVEDisabled(true)

        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() =>
            dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: 'Verification email sent!', type: 'success' } })
          )
          .catch((error) => dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: error.message, type: 'error' } }))
        break
      }

      case 'signout':
        onSignOut()
        break

      default:
    }
  }

  const onToggleSideMenu = (boolean) => {
    dispatch({ type: SET_SIDEMENU_VISIBLE, payload: boolean })
  }

  if (ui.isMobile) {
    return (
      <StyledButton type='link' onClick={() => onToggleSideMenu(!ui.isSideMenuOpen)}>
        <WithBadge badge={auth.user.emailVerified ? 0 : 1}>
          {ui.isSideMenuOpen ? (
            <MenuFoldOutlined style={{ fontSize: 21 }} />
          ) : (
            <MenuUnfoldOutlined style={{ fontSize: 21 }} />
          )}
        </WithBadge>
      </StyledButton>
    )
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

      {isEditing ? (
        <StyledInput
          autoFocus
          placeholder='Input your display name'
          value={username}
          onChange={onChangeUsername}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && !e.shiftKey) {
              e.preventDefault()
              updateUsername()
            } else if (e.key === 'Escape') {
              onBlur()
            }
          }}
          onBlur={onBlur}
        />
      ) : (
        <Username onClick={() => setIsEditing(true)}>Hi, {auth.user.name || auth.user.email}!</Username>
      )}
    </>
  )
}

export default LeftHeader
