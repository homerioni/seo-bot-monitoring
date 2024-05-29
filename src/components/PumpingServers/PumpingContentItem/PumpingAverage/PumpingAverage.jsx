import React from 'react';
import s from './PumpingAverage.module.scss';

const PumpingAverage = () => {
    return (
        <div className={s.main}>
            <div className={s.iconBox}>
                <div className={s.icon}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.27308 2.73015C3.27308 1.22426 4.49605 0 6.00036 0C7.50466 0 8.72763 1.22426 8.72763 2.73015C8.72189 4.2073 7.56782 5.40282 6.09796 5.45455H6.08648H6.05777C6.02332 5.4488 5.97739 5.4488 5.93146 5.45455C4.42715 5.40282 3.27308 4.2073 3.27308 2.73015ZM2.85779 7.3685C4.59953 6.2711 7.41978 6.2711 9.14911 7.3685C9.93011 7.8641 10.3578 8.5367 10.364 9.2624C10.364 9.994 9.93011 10.6666 9.14911 11.1681C8.28135 11.7227 7.14085 12 6.00035 12C4.85986 12 3.71936 11.7227 2.85159 11.1681C2.0706 10.6725 1.63672 9.9999 1.63672 9.2742C1.63672 8.5485 2.0706 7.87 2.85779 7.3685Z" fill="#8B98EE"/>
                    </svg>
                </div>
                <div className={s.num}>30</div>
            </div>
            <div className={s.average}>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.43583 5.39651L2.03301 2.70673L2.03301 5.39651H7.43583ZM8.35996 4.5161C9.15929 4.91404 9.16104 6.05382 8.36293 6.45421L2.40211 9.44458C1.68172 9.80598 0.833008 9.28223 0.833008 8.47627V2.51832C0.833008 1.7138 1.67895 1.18997 2.39915 1.54852L8.35996 4.5161Z" fill="#8B98EE"/>
                </svg>
                <span>120</span>
            </div>
        </div>
    );
};

export default PumpingAverage;