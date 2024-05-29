import React from 'react';

import s from './StatServers.module.scss';
import icons from './StatServersIcons';
import IconStatus from "../../UI/StatusUI/IconStatus/IconStatus";
import SwitchMin from "../../UI/StatusUI/SwitchMin/SwitchMin";

const StatServers = ({serversData, captcha = false}) => {
    let stats = {
        onActive: 0,
        partActive: 0,
        onDisable: 0,
        partDisable: 0,
        off: 0,
        notThread: 0,
    };

    let captchaStats = {
        active: 0,
        disable: 0
    }

    serversData?.forEach(item => {
        if (!captcha) {
            if (!item.modes?.length) {
                stats.notThread++;
            } else if (item.status === 'NON_ACTIVE') {
                stats.off++;
            } else if (item.status === 'PARTIALLY_ACTIVE') {
                item.isSentActive ? stats.partActive++ : stats.partDisable++;
            } else if (item.status === 'ACTIVE') {
                item.isSentActive ? stats.onActive++ : stats.onDisable++;
            }
        } else {
            if (item.status === 'SUCCESS') {
                captchaStats.active++;
            } else if (item.status === 'FAIL') {
                captchaStats.disable++;
            }
        }
    });

    return (
        <div className={s.main}>
            {captcha ?
                <>
                    <div>
                        <span>{captchaStats.active}</span>
                        <IconStatus status={'ACTIVE'}/>
                    </div>
                    <div>
                        <span>{captchaStats.disable}</span>
                        <IconStatus status={'NON_ACTIVE'}/>
                    </div>
                </>
                :
                <>
                    <div>
                        <span>{stats.onActive}</span>
                        <IconStatus status={'ACTIVE'}/>
                        <SwitchMin active={true} isBgGray={true}/>
                    </div>
                    <div>
                        <span>{stats.partActive}</span>
                        <IconStatus status={'PARTIALLY_ACTIVE'}/>
                        <SwitchMin active={true} isBgGray={true}/>
                    </div>
                    <div>
                        <span>{stats.onDisable}</span>
                        <IconStatus status={'ACTIVE'}/>
                        <SwitchMin active={false} isBgGray={true}/>
                    </div>
                    <div>
                        <span>{stats.partDisable}</span>
                        <IconStatus status={'PARTIALLY_ACTIVE'}/>
                        <SwitchMin active={false} isBgGray={true}/>
                    </div>
                    <div>
                        <span>{stats.off}</span>
                        <IconStatus status={'NON_ACTIVE'}/>
                    </div>
                    <div>
                        <span>{stats.notThread}</span>
                        <SwitchMin isBgGray={true}/>
                    </div>
                </>
            }
        </div>
    );
};

export default StatServers;