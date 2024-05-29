import React from 'react';
import s from './ServerInfoBox.module.scss';

const ServerInfoBoxTwo = ({server}) => {
    return (
        <div className={s.wrapper}>
            <div className={`${s.item} ${s.flex30}`} style={{cursor: 'not-allowed'}}>
                <p className={s.title}>
                    нагрузка <b>цп</b> за последние <span className={s.green}>30 мин</span>
                </p>
                <div className={s.cpu}>
                    <div className={s.cpuPercents}>
                        <div>0</div>
                        <div>10</div>
                        <div>30</div>
                        <div>60</div>
                        <div>100</div>
                    </div>
                    <div className={s.cpuContent}>
                        {Array.from({length: 30}).map((e, i) => {
                            return (
                                <div key={i}>
                                    <div className={s.cpuLoading} style={{'--percent': 0}}/>
                                    <div className={s.cpuMinute}>{i + 1}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={`${s.item} ${s.flex30}`}>
                <p className={s.title}>Справка</p>
                <p className={s.desc}>
                    {server.help ? server.help : '-'}<br/>
                    Токен сервера - {server.token}
                </p>
            </div>
            <div className={`${s.item} ${s.flex30}`}>
                <p className={s.title}>Неисправность</p>
                <p className={s.desc}>
                    {server.error ? server.error : '-'}
                </p>
            </div>
        </div>
    );
};

export default ServerInfoBoxTwo;