import React from 'react';
import s from './GroupFormServerLabel.module.scss';
import {cutIp} from "../../../../../../utils/tools";

const GroupFormServerLabel = ({data}) => {
    return (
        <div className={s.main}>
            <p className={s.name}>{data?.name}</p>
            <p className={s.ip}>{data?.ip ? cutIp(data.ip) : ''}</p>
            <label htmlFor={`groupServerLabel${data?.id}`} className={s.del}/>
        </div>
    );
};

export default GroupFormServerLabel;