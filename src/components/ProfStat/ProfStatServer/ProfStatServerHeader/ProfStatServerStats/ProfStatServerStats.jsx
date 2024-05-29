import React from 'react';
import s from "./ProfStatServerStats.module.scss";
import IconStatus from "../../../../UI/StatusUI/IconStatus/IconStatus";
import SwitchMin from "../../../../UI/StatusUI/SwitchMin/SwitchMin";
import IconVersion from "../../../../UI/StatusUI/IconVersion/IconVersion";
import IconOwner from "../../../../UI/StatusUI/IconOwner/IconOwner";
import IconPower from "../../../../UI/StatusUI/IconPower/IconPower";
import {cutIp} from "../../../../../utils/tools";

const ProfStatServerStats = ({index, server}) => {
    return (
        <div>
            <div className={s.stats}>
                <p className={s.index}>{index < 10 ? '0' + index : index}</p>
                <IconStatus status={server?.status}/>
                <SwitchMin active={server.modes?.length ? server?.isSentActive : ''} isBgGray={true}/>
                <IconVersion text={server?.versionName} isBgGray={true}/>
                <IconOwner owner={server?.affiliation}/>
                <IconPower power={server?.maxPower}/>
            </div>
            <div className={s.textBox}>
                <p>{server?.name}</p>
                <p>{server?.ip ? cutIp(server.ip) : ''}</p>
                <p>{server?.purpose}</p>
            </div>
        </div>
    );
};

export default ProfStatServerStats;