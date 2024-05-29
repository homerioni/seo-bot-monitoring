import React from 'react';
import s from './PumpingContentItem.module.scss';
import PumpingActions from "./PumpingActions/PumpingActions";
import PumpingNetworkStatus from "./PumpingNetworkStatus/PumpingNetworkStatus";
import PumpingServersInfoBox from "./PumpingServersInfoBox/PumpingServersInfoBox";
import PumpingStatus from "./PumpingStatus/PumpingStatus";
import PumpingAccess from "./PumpingAccess/PumpingAccess";
import PumpingLocation from "./PumpingLocation/PumpingLocation";
import PumpingConfig from "./PumpingConfig/PumpingConfig";
import PumpingThreads from "./PumpingThreads/PumpingThreads";
import PumpingGroup from "./PumpingGroup/PumpingGroup";
import PumpingWarmup from "./PumpingWarmup/PumpingWarmup";
import PumpingAverage from "./PumpingAverage/PumpingAverage";
import PumpingSend from "./PumpingSend/PumpingSend";
import PumpingCycle from "./PumpingCicle/PumpingCycle";
import PumpingDevices from "./PumpingDevices/PumpingDevices";
import PumpingLoading from "./PumpingLoading/PumpingLoading";
import PumpingRepair from "./PumpingRepair/PumpingRepair";

const PumpingContentItem = () => {
    return (
        <div className={s.main}>
            <PumpingActions/>
            <PumpingNetworkStatus type={'4G'}/>
            <div className={`${s.statusBox} ${s['NON_ACTIVE']}`}>
                <div className={s.status}/>
                <div className={s.statusDate}>12.01<br/>10:54</div>
            </div>
            <PumpingServersInfoBox/>
            <PumpingStatus level={'high'}/>
            <PumpingAccess/>
            <PumpingLocation/>
            <PumpingConfig/>
            <PumpingThreads/>
            <PumpingGroup/>
            <PumpingWarmup/>
            <PumpingAverage/>
            <PumpingSend/>
            <PumpingCycle/>
            <PumpingDevices/>
            <PumpingLoading/>
            <PumpingRepair/>
            <div className={`${s.version} ${s.last}`}>1.7.6</div>
        </div>
    );
};

export default PumpingContentItem;