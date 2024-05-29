import React from 'react';
import s from './ProfStat.module.scss';
import ProfStatServer from "./ProfStatServer/ProfStatServer";

const ProfStat = ({settingsData, setModalProfStat, setModalConfirm, activeGlobalTab}) => {
    return (
        <div className={s.main}>
            {settingsData?.map((item, i) =>
                <ProfStatServer key={item.id}
                                data={item}
                                index={i + 1}
                                setModalProfStat={setModalProfStat}
                                setModalConfirm={setModalConfirm}
                                activeGlobalTab={activeGlobalTab}/>)}
        </div>
    );
};

export default ProfStat;