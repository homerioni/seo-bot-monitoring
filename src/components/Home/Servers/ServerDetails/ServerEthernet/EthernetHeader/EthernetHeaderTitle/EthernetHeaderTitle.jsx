import React from 'react';
import s from "./EthernetHeaderTitle.module.scss";
import SwitchBtn from "../../../../../../UI/StatusUI/SwitchBtn/SwitchBtn";
import DelBtn from "../../../../../../headers/DelBtn/DelBtn";
import {PMService} from "../../../../../../../API/PMService";
import {defaultCatch} from "../../../../../../../utils/tools";

const EthernetHeaderTitle = ({testSettings, queryClient, addAlert, token}) => {
    const switchHandle = () => PMService.testConnection.change(testSettings.id, {...testSettings, active: !testSettings.active}).then(() => {
        queryClient.invalidateQueries(`testSettings${token}`);
        addAlert([{status: true, message: `Настройка тестирования соединения успешно сохранена`}]);
    }).catch(e => defaultCatch(e));

    return (
        <div>
            <div className={s.buttons}>
                <SwitchBtn active={testSettings?.active} isBgGray={true} onClick={switchHandle}/>
                <DelBtn className={s.delBtn}/>
            </div>
            <p className={s.title}>Связь 4G / ethernet</p>
        </div>
    );
};

export default EthernetHeaderTitle;