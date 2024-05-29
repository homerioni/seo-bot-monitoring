import React, {useEffect, useState} from 'react';
import s from './AppiumItem.module.scss';
import AppiumItemActions from "./AppiumItemActions/AppiumItemActions";
import AppiumItemStatus from "./AppiumItemStatus/AppiumItemStatus";
import AppiumItemNetwork from "./AppiumItemNetwork/AppiumItemNetwork";
import AppiumItemServersInfo from "./AppiumItemServersInfo/AppiumItemServersInfo";
import AppiumItemProcessor from "./AppiumItemProcessor/AppiumItemProcessor";
import AppiumItemAccess from "./AppiumItemAccess/AppiumItemAccess";
import AppiumItemLocation from "./AppiumItemLocation/AppiumItemLocation";
import AppiumItemConfig from "./AppiumItemConfig/AppiumItemConfig";
import AppiumItemLoading from "./AppiumItemLoading/AppiumItemLoading";
import AppiumItemLogo from "./AppiumItemLogo/AppiumItemLogo";
import AppiumItemVersion from "./AppiumItemVersion/AppiumItemVersion";
import AppiumItemStatAction from "./AppiumItemStatAction/AppiumItemStatAction";
import AppiumItemStatProfile from "./AppiumItemStatProfile/AppiumItemStatProfile";
import AppiumItemRepair from "./AppiumItemRepair/AppiumItemRepair";

const AppiumItem = ({globalServiceActive}) => {
    const [serviceActive, setServiceActive] = useState('yandex');

    useEffect(() => setServiceActive(globalServiceActive), [globalServiceActive]);

    return (
        <div className={s.main}>
            <AppiumItemActions/>
            <AppiumItemStatus/>
            <AppiumItemNetwork type={'4G'}/>
            <AppiumItemServersInfo/>
            <AppiumItemProcessor type={'CPU'}/>
            <AppiumItemAccess/>
            <AppiumItemLocation/>
            <AppiumItemConfig/>
            <AppiumItemLoading/>
            <AppiumItemLogo active={true}/>
            <AppiumItemVersion isLast={true}/>
            <AppiumItemStatAction serviceActive={serviceActive} setServiceActive={setServiceActive}/>
            <AppiumItemStatProfile/>
            <AppiumItemRepair/>
        </div>
    );
};

export default AppiumItem;