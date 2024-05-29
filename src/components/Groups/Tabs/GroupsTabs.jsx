import React from 'react';
import s from './GroupsTabs.module.scss';
import Loading from "../../UI/Loading/Loading";

const GroupsTabs = ({tabs, activeTab, setActiveTab, noTab}) => {
    return (
        <div className={s.tabs}>
            <button className={`${s.tab} ${activeTab === 0 ? s.active : ''}`} onClick={() => setActiveTab(0)}>Все</button>
            {tabs.isLoading ? <Loading/> : ''}
            {tabs.data?.result.length ?
                tabs.data?.result.map(tab =>
                    <button key={tab.id}
                            className={`${s.tab} ${activeTab === tab.id ? s.active : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.name}
                    </button>
                ) : ''}
            {noTab ?
                <button className={`${s.tab} ${activeTab === 1 ? s.active : ''}`} onClick={() => setActiveTab(1)}>Без вкладки</button>
                : ''}
        </div>
    );
};

export default GroupsTabs;