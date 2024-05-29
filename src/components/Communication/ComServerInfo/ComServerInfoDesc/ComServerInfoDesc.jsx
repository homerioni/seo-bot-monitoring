import React from 'react';
import s from "./ComServerInfoDesc.module.scss";

const ComServerInfoDesc = ({selectedServer}) => {
    return (
        <>
            <div className={s.wrapper}>
                <div className={`${s.item} ${s.flex25}`}>
                    <p className={s.title}>Назначение</p>
                    <p className={s.desc}>{selectedServer.purpose}</p>
                </div>
                <div className={`${s.item} ${s.flex25}`}>
                    <p className={s.title}>Локация</p>
                    <p className={s.desc}>{selectedServer.location?.name}</p>
                </div>
                <div className={`${s.item} ${s.flex25}`}>
                    <p className={s.title}>корпус</p>
                    <p className={s.desc}>{selectedServer.cases ? selectedServer.cases : '-'}</p>
                </div>
                <div className={`${s.item} ${s.flex25}`}>
                    <p className={s.title}>от кого</p>
                    <p className={s.desc}>{selectedServer.from ? selectedServer.from : '-'}</p>
                </div>
            </div>
            <div className={s.wrapper}>
                <div className={`${s.item} ${s.flex25}`}>
                    <p className={s.title}>управление</p>
                    <p className={s.desc}>{selectedServer.control ? selectedServer.control : '-'}</p>
                </div>
                <div className={`${s.item} ${s.flex75}`}>
                    <p className={s.title}>доступы</p>
                    <p className={s.desc}>{selectedServer.accesses ? selectedServer.accesses : '-'}</p>
                </div>
            </div>
            <div className={s.wrapper}>
                <div className={`${s.item} ${s.flex50}`}>
                    <p className={s.title}>Справка</p>
                    <p className={s.desc}>
                        {selectedServer.help ? selectedServer.help : '-'}<br/>
                        Токен сервера - {selectedServer.token}
                    </p>
                </div>
                <div className={`${s.item} ${s.flex50}`}>
                    <p className={s.title}>Неисправность</p>
                    <p className={s.desc}>
                        {selectedServer.error ? selectedServer.error : '-'}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ComServerInfoDesc;