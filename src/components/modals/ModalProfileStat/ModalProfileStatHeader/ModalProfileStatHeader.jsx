import React from 'react';
import s from './ModalProfileStatHeader.module.scss';
import ProfStatServerStats from "../../../ProfStat/ProfStatServer/ProfStatServerHeader/ProfStatServerStats/ProfStatServerStats";

const ModalProfileStatHeader = ({server, date, folder}) => {
    return (
        <div className={s.main}>
            <ProfStatServerStats server={server}/>
            <div className={s.textBox}>
                <p>
                    <span className={s.gray}>Папка: </span>
                    <span>{folder}</span>
                </p>
                <p>
                    <span className={s.gray}>Снято: </span>
                    <span>{new Date(date).toLocaleTimeString().slice(0, -3)}</span>
                </p>
            </div>
        </div>
    );
};

export default ModalProfileStatHeader;