import React, { useState } from 'react'
import styled from 'styled-components'
import { Menu, Dropdown, Badge, Button, Tooltip, Input } from 'antd'
import {
  MailOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

import { useCountdown } from 'hooks/useCountdown'
import { useStore } from 'store'
import { SET_AUTH_USER } from 'store/auth'
import { SET_GLOBAL_MESSAGE, SET_SIDEMENU_VISIBLE, SET_TUTORIAL_VISIBLE } from 'store/ui'
import { firebase, signOut, getUsersProfile } from 'utils/firebase'

import Avatar from 'components/Avatar'

const DropdownButton = styled.div`
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 0 0px 0px ${(p) => p.theme.colors.grey[200]};
  transition: all 0.4s;

  &:hover {
    box-shadow: 0 0 10px 2px ${(p) => p.theme.colors.grey[400]};
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

const Text = styled.span`
  user-select: none;
`

const StyledButton = styled(Button)`
  padding-left: ${(p) => p.theme.spacing.xxs};
  padding-right: ${(p) => p.theme.spacing.xxs};
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

  const onChangeUsername = ({ target: { value } }) => {
    setUsername(value)
  }

  const updateUsername = () => {
    if (!username.trim().length)
      return dispatch({ type: SET_GLOBAL_MESSAGE, payload: { message: 'Please input a valid name', type: 'error' } })

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

  const countdown = useCountdown({ seconds: 60, onFinish: () => setRVEDisabled(false) })

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

      case 'tour': {
        dispatch({ type: SET_TUTORIAL_VISIBLE, payload: true })
        break
      }

      default:
    }
  }

  const onToggleSideMenu = (boolean) => {
    dispatch({ type: SET_SIDEMENU_VISIBLE, payload: boolean })
  }

  let badgeCount = 0

  if (!auth.user.emailVerified) badgeCount += 1
  if (ui.firstAccess === 'true') badgeCount += 1

  if (ui.isMobile) {
    return (
      <StyledButton type='link' onClick={() => onToggleSideMenu(!ui.isSideMenuOpen)}>
        <WithBadge badge={badgeCount}>
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
                  <Text>
                    Request Verification Email
                    {RVEdisabled ? `(${countdown})` : ''}
                  </Text>
                </Tooltip>
              </Menu.Item>
            )}

            <Menu.Item key='signout' icon={<LogoutOutlined />}>
              <Text>Sign out</Text>
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
              key='tour'
              icon={
                <Badge count={ui.firstAccess === 'true' ? 1 : 0} dot offset={[-8, 2]}>
                  <QuestionCircleOutlined />
                </Badge>
              }
            >
              <Tooltip
                placement='right'
                title={`If this is your first time using Year-In-Pixels or getting lost in space, then you should visit this user tour.`}
              >
                <Text>Help</Text>
              </Tooltip>
            </Menu.Item>
          </Menu>
        }
      >
        <DropdownButton>
          <Avatar photoUrl={auth.user.photoUrl} name={auth.user.name} email={auth.user.email} badge={badgeCount} />
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
          maxLength={30}
        />
      ) : (
        <Username onClick={() => setIsEditing(true)}>
          Hi <b>{auth.user.name || auth.user.email}</b>!
        </Username>
      )}
    </>
  )
}

export default LeftHeader
