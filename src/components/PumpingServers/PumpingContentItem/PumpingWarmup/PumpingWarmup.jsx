import React from 'react';
import s from './PumpingWarmup.module.scss';
import PumpingWarmupTooltip from "./PumpingWarmupTooltip/PumpingWarmupTooltip";

const PumpingWarmup = () => {
    return (
        <div className={s.main}>
            <div className={s.numBox}>
                <div className={s.num}>20000</div>
            </div>
            <div className={s.statBox}>
                {Array.from({length: 11}, () => (
                    <div className={s.statItem}>
                        <div className={s.statBg} style={{'--percent': `${Math.random() * 100}%`}}/>
                        <PumpingWarmupTooltip/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PumpingWarmup;