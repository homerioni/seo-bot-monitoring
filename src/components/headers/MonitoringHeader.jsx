import React from 'react';
import s from "./Header.module.scss";
import BackLink from "./BackLink/BackLink";
import SwitchBtn from "../UI/StatusUI/SwitchBtn/SwitchBtn";
import {cutIp} from "../../utils/tools";
import StatBtn from "./StatBtn/StatBtn";

const MonitoringHeader = ({serverData, isLoading, statsEachDay, setModalStat}) => {
    return (
        <div className={s.main}>
            <div>
                <BackLink src={'/'}/>
                {!isLoading ? <>
                    <p className={s.title}>
                        <span>Мониторинг </span>
                        <b>{serverData?.name} </b>
                        <span className={s.gray}>({serverData ? cutIp(serverData.ip) : ''})</span>
                    </p>
                    <p className={`${s.statusBox} ${s[serverData?.status]}`}>
                        <span>on/off:</span>
                    </p>
                    <div className={s.sendBox}>
                        <span>отправка:</span>
                        <SwitchBtn active={serverData?.isSentActive} style={{boxShadow: '.2rem .2rem 2rem 0 rgba(0,0,0,.1)'}}/>
                    </div>
                </> : ''}
            </div>
            <div>
                <StatBtn statsEachDay={statsEachDay}
                         onClick={() => setModalStat({isOpen: true, data: {title: 'за 30 дней', type: 'Сервер', statsEachDay}})}/>
            </div>
        </div>
    );
};

export default MonitoringHeader;