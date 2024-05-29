import React from 'react';
import s from './AppiumItemVersion.module.scss';

const AppiumItemVersion = ({isLast}) => {
    return (
        <div className={`${s.version} ${isLast ? s.last : ''}`}>1.7.6</div>
    );
};

export default AppiumItemVersion;