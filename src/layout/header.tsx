import { Link } from 'gatsby'
import React from 'react'

import '../styles/header.scss';
import logo from '../../config/icon.svg';

const Header = ({ siteTitle }: any) => (
  <header>
    <div className="container">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
        <span>{siteTitle}</span>
      </Link>
    </div>
  </header>
)

export default Header
