import React from 'react';
import s from './AppiumItemStatAction.module.scss';
import {appiumSelectIcons} from "../../../AppiumTools";
import AppiumStatActionSelect from "./AppiumStatActionSelect/AppiumStatActionSelect";
import AppiumStatActionInfo from "./AppiumStatActionInfo/AppiumStatActionInfo";

const AppiumItemStatAction = ({serviceActive, setServiceActive}) => {
    return (
        <div className={s.main} style={{'--color': appiumSelectIcons[serviceActive].color}}>
            <AppiumStatActionInfo serviceActive={serviceActive}/>
            <AppiumStatActionSelect serviceActive={serviceActive} setServiceActive={setServiceActive}/>
        </div>
    );
};

export default AppiumItemStatAction;