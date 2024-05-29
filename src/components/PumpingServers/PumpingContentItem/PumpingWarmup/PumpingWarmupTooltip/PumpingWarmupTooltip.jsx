import React from 'react';
import s from './PumpingWarmupTooltip.module.scss';

const PumpingWarmupTooltip = () => {
    return (
        <div className={s.main}>
            <div>
                <p>0-50</p>
                <p>сайтов</p>
            </div>
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 7.25C1.08579 7.25 0.75 6.91421 0.75 6.5C0.75 6.08579 1.08579 5.75 1.5 5.75L1.5 7.25ZM13.0303 5.96967C13.3232 6.26256 13.3232 6.73744 13.0303 7.03033L8.25736 11.8033C7.96447 12.0962 7.48959 12.0962 7.1967 11.8033C6.90381 11.5104 6.90381 11.0355 7.1967 10.7426L11.4393 6.5L7.1967 2.25736C6.90381 1.96447 6.90381 1.48959 7.1967 1.1967C7.48959 0.903806 7.96447 0.903806 8.25736 1.1967L13.0303 5.96967ZM1.5 5.75L12.5 5.75V7.25L1.5 7.25L1.5 5.75Z" fill="#8B98EE"/>
            </svg>
            <div>
                <p>3 893</p>
                <p>профилей</p>
            </div>
        </div>
    );
};

export default PumpingWarmupTooltip;