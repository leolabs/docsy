import { Link } from 'gatsby'
import React from 'react'
import classNames from 'classnames';

import '../styles/header.scss';
import logo from '../../../config/icon.svg';
import hamburgerIcon from '../icons/hamburger.svg';

const Header = ({ siteTitle, toggleMenu }: any) => (
  <header>
    <div className="container">
      <button onClick={toggleMenu} className={classNames("toggle-menu")}>
        <img src={hamburgerIcon} alt="Open Menu" className="open" />
      </button>
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
        <span>{siteTitle}</span>
      </Link>
    </div>
  </header>
)

export default Header
