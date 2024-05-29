import React from 'react';
import s from './DashboardComHeader.module.scss';

const DashboardComHeader = ({locations, setLocId, locId}) => {
    return (
        <div className={s.main}>
            <p className={s.title}>Схема подключения</p>
            <div className={s.tabs}>
                {locations.data?.result?.map(loc =>
                    <button key={loc.id}
                            type='button'
                            className={`${s.tab} ${locId === loc.id ? s.active : ''}`}
                            onClick={() => setLocId(loc.id)}
                    >
                        {loc.name}
                    </button>
                )}
            </div>
        </div>
    );
};

export default DashboardComHeader;