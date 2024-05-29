import React from 'react';
import s from "./ServerContent.module.scss";
import ServerMonitoringBtn from "./ServerMonitoringBtn/ServerMonitoringBtn";
import ServerListBtns from "./ServerListBtns/ServerListBtns";
import ServerStatusBar from "./ServerStatusBar/ServerStatusBar";
import ServerMonitoringGet from "./ServerMonitoring/ServerMonitoringGet";
import ServerMonitoringSend from "./ServerMonitoring/ServerMonitoringSend";
import {cutIp, getDate} from "../../../../utils/tools";
import ServerSwitchBtn from "./ServerSwitchBtn";

const ServerContent = ({onClick, server, isDetailsOpen, setIsUpper, setModalConfirm, setModalServer}) => {
    return (
        <div className={s.main} onClick={onClick}>
            <div>
                <ServerMonitoringBtn isDetailsOpen={isDetailsOpen} serverId={server.id}/>
                <ServerListBtns isDetailsOpen={isDetailsOpen} setIsUpper={setIsUpper} server={server} setModalConfirm={setModalConfirm} setModalServer={setModalServer}/>
            </div>
            <ServerStatusBar server={server}/>
            <div>
                <span className={s.serverName}>
                    {server.name}
                    <div className={s.serverIcons}>
                        {!!server.error ?
                            <div className={s.serverError}>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.94954 3.88029C8.95453 3.88029 8.54774 3.13444 9.04249 2.21961C9.32835 1.68936 9.15793 1.01343 8.65768 0.710431L7.70666 0.133563C7.27238 -0.140304 6.71166 0.0228507 6.45328 0.48318L6.39281 0.593892C5.89806 1.50872 5.08447 1.50872 4.58422 0.593892L4.52375 0.48318C4.27637 0.0228507 3.71565 -0.140304 3.28137 0.133563L2.33035 0.710431C1.8301 1.01343 1.65968 1.69519 1.94554 2.22544C2.44579 3.13444 2.03899 3.88029 1.04399 3.88029C0.472275 3.88029 -0.000488281 4.37558 -0.000488281 4.98741V6.01295C-0.000488281 6.61896 0.466778 7.12007 1.04399 7.12007C2.03899 7.12007 2.44579 7.86592 1.94554 8.78076C1.65968 9.31101 1.8301 9.98693 2.33035 10.2899L3.28137 10.8668C3.71565 11.1407 4.27637 10.9775 4.53474 10.5172L4.59521 10.4065C5.08997 9.49164 5.90356 9.49164 6.40381 10.4065L6.46428 10.5172C6.72265 10.9775 7.28337 11.1407 7.71765 10.8668L8.66868 10.2899C9.16893 9.98693 9.33934 9.30518 9.05348 8.78076C8.55323 7.86592 8.96003 7.12007 9.95503 7.12007C10.5267 7.12007 10.9995 6.62478 10.9995 6.01295V4.98741C10.994 4.38141 10.5267 3.88029 9.94954 3.88029ZM5.49676 7.39394C4.51275 7.39394 3.71016 6.54321 3.71016 5.50018C3.71016 4.45716 4.51275 3.60642 5.49676 3.60642C6.48077 3.60642 7.28337 4.45716 7.28337 5.50018C7.28337 6.54321 6.48077 7.39394 5.49676 7.39394Z" fill="#FE6E1E"/>
                                </svg>
                            </div> : ''}
                        {!!server.isAttention ? <div className={s.serverAttention}/> : ''}
                    </div>
                </span>
            </div>
            <div>{cutIp(server.ip)}</div>
            <div>{server.purpose || '-'}</div>
            <div>
                <ServerMonitoringGet server={server}/>
            </div>
            <div>
                <ServerMonitoringSend server={server}/>
            </div>
            <div>{getDate(server.createdDate)}</div>
            <div>{getDate(server.settingsLastUpdateDate)}</div>
            <div>{server.location?.name ?? '-'}</div>
            <ServerSwitchBtn server={server} isDetailsOpen={isDetailsOpen} setModalConfirm={setModalConfirm}/>
        </div>
    );
};

export default ServerContent;