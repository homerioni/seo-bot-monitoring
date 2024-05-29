import React from 'react';
import s from './ThreadHeader.module.scss';
import ThreadInfo from "./ThreadInfo/ThreadInfo";
import ThreadFolder from "./ThreadFolder/ThreadFolder";

const ThreadHeader = ({data, setModalConfirm, setModalDist}) => {
    return (
        <div className={s.main}>
            <div className={s.icon}>
                <img src={data.settingsTypeIconLink} alt=""/>
            </div>
            <p className={s.name}>{data.name}</p>
            <ThreadInfo data={data} setModalConfirm={setModalConfirm}/>
            <ThreadFolder data={data} setModalConfirm={setModalConfirm} setModalDist={setModalDist}/>
        </div>
    );
};

export default ThreadHeader;