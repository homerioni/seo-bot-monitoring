import React from 'react';
import s from './AppiumItemLoading.module.scss';

const AppiumItemLoading = () => {
    return (
        <div className={s.main}>
            <div className={s.icon}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="6.54688" width="1.66657" height="5.45453" rx="0.833283" fill="#78C43B"/>
                    <rect x="3.77734" width="1.66657" height="12" rx="0.833283" fill="#78C43B"/>
                    <rect x="6.55566" y="2.18359" width="1.66657" height="9.81815" rx="0.833283" fill="#78C43B"/>
                    <rect x="9.33398" y="4.91016" width="1.66657" height="7.09089" rx="0.833283" fill="#78C43B"/>
                </svg>
            </div>
            <div className={s.item}>
                <span>60</span>
                <sup>% ЦП</sup>
            </div>
            <div className={s.item}>
                <span>78</span>
                <sup>% RAM</sup>
            </div>
            <div className={s.item}>
                <span>318</span>
                <sup> SSD</sup>
            </div>
        </div>
    );
};

export default AppiumItemLoading;