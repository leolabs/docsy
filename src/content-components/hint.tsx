import classNames from 'classnames';
import React from 'react';

import '../styles/content-components/hint.scss';

export interface HintProps {
    type: 'info' | 'warning' | 'danger' | 'success';
}

const Hint: React.FC<HintProps> = ({type, children}) => (
    <div className={classNames('hint', type || 'info')}>{children}</div>
);

export default Hint;