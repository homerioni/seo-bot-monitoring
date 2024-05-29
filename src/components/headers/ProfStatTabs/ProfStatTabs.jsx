import React from 'react';
import s from './ProfStatTabs.module.scss';

const ProfStatTabs = ({activeGlobalTab, setActiveGlobalTab}) => {
    return (
        <div className={s.tabs}>
            <button type='button' className={`${s.tab} ${activeGlobalTab === 1 ? s.active : ''}`} onClick={() => setActiveGlobalTab(1)}>desk & mob</button>
            <button type='button' className={`${s.tab} ${activeGlobalTab === 2 ? s.active : ''}`} onClick={() => setActiveGlobalTab(2)}>desk</button>
            <button type='button' className={`${s.tab} ${activeGlobalTab === 3 ? s.active : ''}`} onClick={() => setActiveGlobalTab(3)}>mob</button>
            <button type='button' className={`${s.tab} ${activeGlobalTab === 4 ? s.active : ''}`} onClick={() => setActiveGlobalTab(4)}>sum</button>
        </div>
    );
};

export default ProfStatTabs;