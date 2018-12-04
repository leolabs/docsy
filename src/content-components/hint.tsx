import classNames from 'classnames';
import React from 'react';

export interface HintProps {
    type: 'info' | 'warning' | 'danger' | 'success';
}

const Hint: React.FC<HintProps> = ({type, children}) => (
    <div className={classNames('hint', type)}>{children}</div>
);

export default Hint;