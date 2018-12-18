import { Link } from 'gatsby';
import React from 'react';
import classNames from 'classnames';

import '../styles/content-components/button.scss';

export interface buttonProps {
  type?: 'primary' | 'secondary';
  text: string;
  to: string;
  leftIcon?: string;
  rightIcon?: string;
  className?: string;
}

const Button: React.FC<buttonProps> = ({
  type,
  text,
  to,
  leftIcon,
  rightIcon,
  className,
}) => (
  <Link
    to={to}
    className={classNames('button', className, type || 'secondary')}
  >
    {leftIcon && <img className="left" src={leftIcon} />}
    {text}
    {rightIcon && <img className="right" src={rightIcon} />}
  </Link>
);

export default Button;
