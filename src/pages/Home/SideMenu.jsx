import React from 'react'
import { scaleDown as Menu } from 'react-burger-menu'

import './SideMenu.less'

import { useStore } from 'store'
import { SET_SIDEMENU_STATE } from 'store/ui'
import { signOut } from 'utils/firebase'

const SideBar = () => {
  const [{ ui }, dispatch] = useStore()

  const onSetSideMenuState = ({ isOpen }) => {
    dispatch({ type: SET_SIDEMENU_STATE, payload: isOpen })
  }

  const closeMenuOnEsc = (e) => {
    e = e || window.event

    if (e.key === 'Escape' || e.keyCode === 27) {
      dispatch({ type: SET_SIDEMENU_STATE, payload: false })
    }
  }

  return (
    <Menu
      width={ui.isMobile ? '50vw' : 300}
      isOpen={ui.isSideMenuOpen}
      customOnKeyDown={closeMenuOnEsc}
      customBurgerIcon={false}
      customCrossIcon={false}
      onStateChange={onSetSideMenuState}
      pageWrapId='styled-home-container'
      outerContainerId='root'
    >
      <button onClick={signOut}>Sign out</button>
    </Menu>
  )
}

export default SideBar
