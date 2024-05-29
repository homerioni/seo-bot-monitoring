import React from 'react';
import s from './AppiumContent.module.scss';
import AppiumItem from "./AppiumItem/AppiumItem";

const AppiumContent = ({globalServiceActive}) => {
    return (
        <div className={s.main}>
            <AppiumItem globalServiceActive={globalServiceActive}/>
        </div>
    );
};

export default AppiumContent;