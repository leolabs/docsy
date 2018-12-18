import React from 'react';

import '../styles/menu-header.scss';

import backIcon from '../icons/back.svg';

interface MenuHeaderProps {
  toggleMenu: () => any;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({toggleMenu}) => (
  <div className="menu-header">
    <button className="back-button" onClick={toggleMenu}>
      <img src={backIcon} alt="Close Menu" />
    </button>
  </div>
)

export default MenuHeader;