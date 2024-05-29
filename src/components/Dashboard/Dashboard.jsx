import React from 'react';
import s from './Dashboard.module.scss';
import ProfileSum from "./ProfileSum/ProfileSum";
import DashboardCom from "./DashboardCom/DashboardCom";
import ClickStat from "./ClickStat/ClickStat";
import DashLocations from "./DashLocations/DashLocations";
import ConfigDiagram from "./ConfigDiagram/ConfigDiagram";
import AveragePower from "./AveragePower/AveragePower";
import DashLogs from "./DashLogs/DashLogs";
import PumpingPower from "./PumpingPower/PumpingPower";
import CheatPower from "./CheatPower/CheatPower";
import DashRepair from "./DashRepair/DashRepair";

const Dashboard = ({profSumGroups, setModalProfSum, setModalConfigFilter, groups, servers, projects, locations, configs, serversIsHaveBAS}) => {
    return (
        <div className={s.main}>
            <div>
                <ProfileSum profSumGroups={profSumGroups} setModalProfSum={setModalProfSum} groups={groups} servers={servers}/>
                <AveragePower servers={servers} groups={groups} configs={configs} setModalConfigFilter={setModalConfigFilter}/>
                <DashLocations locations={locations} servers={servers}/>
                <DashRepair servers={servers}/>
                {/*<DashLogs/>*/}
                <CheatPower servers={servers} configs={configs} projects={projects} setModalConfigFilter={setModalConfigFilter}/>
                <PumpingPower servers={servers} configs={configs} setModalConfigFilter={setModalConfigFilter}/>
            </div>
            <div>
                <ConfigDiagram title={'Сводная диаграмма комплектаций прокачки'} type={'прокачка'} servers={servers} configs={configs} setModalConfigFilter={setModalConfigFilter}/>
                <ConfigDiagram title={'Сводная диаграмма комплектаций накрутки'} type={'накрутка'} servers={servers} configs={configs} setModalConfigFilter={setModalConfigFilter}/>
                <AveragePower serversIsHaveBAS={serversIsHaveBAS} servers={servers} groups={groups} configs={configs} setModalConfigFilter={setModalConfigFilter}/>
                <DashboardCom servers={servers} projects={projects} locations={locations}/>
                <ClickStat projects={projects}/>
                <PumpingPower serversIsHaveBAS={serversIsHaveBAS} servers={servers} configs={configs} setModalConfigFilter={setModalConfigFilter}/>
            </div>
        </div>
    );
};

export default Dashboard;