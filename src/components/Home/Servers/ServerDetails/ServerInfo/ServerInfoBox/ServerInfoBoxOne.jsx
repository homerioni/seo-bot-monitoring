import React from 'react';
import s from './ServerInfoBox.module.scss';

const ServerInfoBoxOne = ({server}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.item}>
                <p className={s.title}>max МОщн. BAs</p>
                <p className={s.desc}>{server.maxPower}</p>
            </div>
            <div className={s.item}>
                <p className={s.title}>потоков факт.</p>
                <p className={s.desc}>{server.numberOfThreads}</p>
            </div>
            <div className={s.item}>
                <p className={s.title}>управление</p>
                <p className={s.desc}>{server.control ? server.control : '-'}</p>
            </div>
            <div className={s.item}>
                <p className={s.title}>Провайдер</p>
                <p className={s.desc}>{server?.internetProvider ?? '-'}</p>
            </div>
            <div className={s.item}>
                <p className={s.title}>Тип подключения</p>
                <p className={s.desc}>{server?.connectionType ?? '-'}</p>
            </div>
            <div className={s.item}>
                <p className={s.title}>Роутер</p>
                <p className={s.desc}>{server?.routerName ?? '-'}</p>
            </div>
            <div className={`${s.item} ${s.big}`}>
                <p className={s.title}>доступы</p>
                <p className={s.desc}>{server.accesses ? server.accesses : '-'}</p>
            </div>
            <div className={`${s.item} ${s.big}`}>
                <p className={s.title}>сервер антикаптчи</p>
                <p className={s.desc}>???</p>
            </div>
            <div className={s.item}>
                <p className={s.title}>корпус</p>
                <p className={s.desc}>{server.cases ? server.cases : '-'}</p>
            </div>
            <div className={s.item}>
                <p className={s.title}>от кого</p>
                <p className={s.desc}>{server.from ? server.from : '-'}</p>
            </div>
            <div className={s.item}>
                <p className={s.title}>Путь к файлу профиля</p>
                <p className={s.desc}>{server.pathWithBrowserProfile ? server.pathWithBrowserProfile : '-'}</p>
            </div>
        </div>
    );
};

export default ServerInfoBoxOne;