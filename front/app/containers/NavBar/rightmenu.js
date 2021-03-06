
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { ReactComponent as SocialsIcon } from '../../images/icons/share.svg'
import { ReactComponent as UserIcon } from '../../images/icons/user.svg'
import { ReactComponent as DiscordIcon } from '../../images/icons/discord-color.svg'
import { ReactComponent as FacebookIcon } from '../../images/icons/facebook.svg'
import { ReactComponent as TwitchIcon } from '../../images/icons/twitch.svg'
import { ReactComponent as TwitterIcon } from '../../images/icons/twitter-color.svg'
import { ReactComponent as GithubIcon } from '../../images/icons/github-color.svg'
import { ReactComponent as HomeIcon } from '../../images/icons/home.svg'
import { ReactComponent as DisconnectIcon } from '../../images/icons/logout.svg'

import LoginButton from '../../components/Login/button'
import LoginModal from '../../components/Login/modal'
import DropdownMenu from '../../components/DropDownMenu'
import DropDownButton from '../../components/DropDownButton'

import { logout } from '../../actions/api'

import * as cst from '../../constants'
import * as utils from '../../utils'
import "./style.scss"


const RightMenuLook = (props) => {
  const {
    user,
    logout
  } = props
  const [isActive, setIsActive] = useState(null)

  return (
    <div className="level-right">
      { socialsButton(isActive, setIsActive) }
      { userButton(isActive, setIsActive, user, logout) }
      <LoginButton />
    </div>
  );
}

const socialsButton = (isActive, setIsActive) => (
  <DropDownButton
    name="socials"
    classname="nav-item"
    isActive={isActive}
    setIsActive={setIsActive}
    icon={ <SocialsIcon className="vde navbar image is-32x32" /> }>
    <DropdownMenu
      linksArray={[
        {
          leftIcon: <TwitchIcon className="vde navbar menu" />,
          name: "Twitch",
          url: "https://www.twitch.tv/diplovde"
        },
        {
          leftIcon: <DiscordIcon className="vde navbar menu" />,
          name: "Discord",
          url: "https://discord.gg/NtZHTqc"
        },
        {
          leftIcon: <GithubIcon className="vde navbar menu" />,
          name: "Github",
          url: "https://github.com/Diplow/TheBigPicture"
        },
        {
          leftIcon: <FacebookIcon className="vde navbar menu" />,
          name: "Facebook",
          url: "https://www.facebook.com/vuedensemble.org"
        },
        {
          leftIcon: <TwitterIcon className="vde navbar menu" />,
          name: "Twitter",
          url: "https://twitter.com/Diplo87355132"
        }
      ]} />
  </DropDownButton>
)

const userButton = (isActive, setIsActive, user, logout) => {
  if (user.id == cst.GUEST_ID) return null

  return (
    <DropDownButton
      name="user"
      isActive={isActive}
      setIsActive={setIsActive}
      classname="nav-item image icon-button"
      icon={
        <img 
          className="vde navbar menu"
          src={user.image}
          alt={cst.alt_labels.USER} />
      }
    >
      <DropdownMenu
        linksArray={[
          {
            leftIcon: <UserIcon className="vde navbar menu" />,
            name: cst.labels.PROFILE,
            url: `/user/${user.id}`
          },
          {
            leftIcon: <DisconnectIcon className="vde navbar menu" />,
            name: cst.labels.DISCONNECT,
            url: "/",
            onClick: () => logout()
          }
        ]} />
    </DropDownButton>
  )
}

const DropDownButtonList = (props) => (
  <nav className="level-item">
    <ul className="navbar-nav">{props.children}</ul>
  </nav>
)

const mapStateToProps = (state) => ({
  user: state.get("user")
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => { dispatch(logout())}
})

const RightMenu = connect(mapStateToProps, mapDispatchToProps)(RightMenuLook)

export default RightMenu
