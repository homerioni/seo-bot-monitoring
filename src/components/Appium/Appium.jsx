import React from 'react';
import s from './Appium.module.scss';
import AppiumContentHeader from "./AppiumContentHeader/AppiumContentHeader";
import AppiumContent from "./AppiumContent/AppiumContent";

const Appium = ({globalServiceActive}) => {
    return (
        <div className={s.main}>
            <AppiumContentHeader/>
            <AppiumContent globalServiceActive={globalServiceActive}/>
        </div>
    );
};

export default Appium;