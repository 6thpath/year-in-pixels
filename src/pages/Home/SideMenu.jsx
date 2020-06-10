import React, { useState } from 'react'
import styled from 'styled-components'
import { scaleDown as Menu } from 'react-burger-menu'
import { Badge } from 'antd'
import { MailOutlined, LogoutOutlined } from '@ant-design/icons'

import './SideMenu.less'

import { useCountdown } from 'hooks/useCountdown'
import { useStore } from 'store'
import { SET_SIDEMENU_STATE, SET_GLOBAL_MESSAGE } from 'store/ui'
import { firebase, signOut } from 'utils/firebase'

import Avatar from 'components/Avatar'
import { NonSelectableText } from 'components/Text'

const UserInfo = styled.div`
  margin: ${(p) => p.theme.spacing.xxs};

  display: flex !important;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Username = styled(NonSelectableText)`
  margin: 0 auto ${(p) => p.theme.spacing.sm};
  text-align: center;
`

const MenuButton = styled.button`
  cursor: pointer;
  width: 100%;
  border: none;
  border-radius: ${(p) => p.theme.radius.sm};
  padding: ${(p) => p.theme.spacing.xxs};
  margin: ${(p) => p.theme.spacing.xxs} 0;
  background: ${(p) => p.theme.colors.white};
  transition: all 0.4s;

  &:hover {
    background: ${(p) => p.theme.colors.primary.light};
  }
`

const SideBar = () => {
  const [{ auth, ui }, dispatch] = useStore()
  const [RVEdisabled, setRVEDisabled] = useState(false)

  const onTimerFinish = () => {
    setRVEDisabled(false)
  }

  const countdown = useCountdown({ seconds: 60, onFinish: onTimerFinish })

  const onSetSideMenuState = ({ isOpen }) => {
    dispatch({ type: SET_SIDEMENU_STATE, payload: isOpen })
  }

  const closeMenuOnEsc = (e) => {
    e = e || window.event

    if (e.key === 'Escape' || e.keyCode === 27) {
      dispatch({ type: SET_SIDEMENU_STATE, payload: false })
    }
  }

  const requestVerify = () => {
    setRVEDisabled(true)

    return firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => dispatch({ type: SET_GLOBAL_MESSAGE, payload: 'Verification email sent!' }))
      .catch((error) => dispatch({ type: SET_GLOBAL_MESSAGE, payload: error.message }))
  }

  return (
    <Menu
      width={ui.isMobile ? '60vw' : 300}
      isOpen={ui.isSideMenuOpen}
      customOnKeyDown={closeMenuOnEsc}
      customBurgerIcon={false}
      customCrossIcon={false}
      onStateChange={onSetSideMenuState}
      pageWrapId='styled-home-container'
      outerContainerId='root'
    >
      <UserInfo>
        <Avatar size={48} photoUrl={auth.user.photoUrl} name={auth.user.name} email={auth.user.email} />
      </UserInfo>
      <Username>Hi, {auth.user.name || auth.user.email}!</Username>

      {!auth.user.emailVerified && (
        <MenuButton onClick={requestVerify} disabled={RVEdisabled}>
          <NonSelectableText>
            <Badge count={1} dot offset={[-1, 1]}>
              <MailOutlined />
            </Badge>{' '}
            Request Verification Email
            {RVEdisabled ? `(${countdown})` : ''}
          </NonSelectableText>
        </MenuButton>
      )}

      <MenuButton onClick={signOut}>
        <LogoutOutlined /> Sign out
      </MenuButton>
    </Menu>
  )
}

export default SideBar
