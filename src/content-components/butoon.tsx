import { Link } from 'gatsby'
import React from 'react'

import '../styles/compnents/button.scss';

export interface buttonProps {
    type: 'primary' | 'secondary';
}

const Button: React.FC<buttonProps> = ({ type, text }) => (
    <a className={classNames('button', type || 'secondary')}>{text}</a>
);

export default Button;