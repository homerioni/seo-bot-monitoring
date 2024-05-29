import React from 'react';
import s from "./ServerConfigFormItem.module.scss";

const ServerConfigItemTemplate = ({data}) => {
    const getTemplate = (type) => {
        switch (type) {
            case 'PROCESSOR':
                return <>
                    <div className={s.desc}>
                        <p>{data.characteristics.numberOfCores}</p>
                        <p>ядер</p>
                    </div>
                    <div className={s.desc}>
                        <p>{data.characteristics.numberOfThreads}</p>
                        <p>потоков</p>
                    </div>
                </>;
            case 'HARD_DRIVE':
                return <>
                    <div className={s.desc}>
                        <p>{data.characteristics.type}</p>
                    </div>
                    <div className={s.desc}>
                        <p>{data.characteristics.capacity}GB</p>
                    </div>
                    <div className={s.desc}>
                        <p>{data.characteristics.read}</p>
                        <p>чтение</p>
                    </div>
                    <div className={s.desc}>
                        <p>{data.characteristics.write}</p>
                        <p>запись</p>
                    </div>
                </>;
            case 'RAM':
                return <>
                    <div className={s.desc}>
                        <p>{data.characteristics.type}</p>
                    </div>
                    <div className={s.desc}>
                        <p>{data.characteristics.capacity}GB</p>
                    </div>
                </>;
            case 'VIDEO_ADAPTER':
                return <>
                    <div className={s.desc}>
                        <p>{data.characteristics.capacity}GB</p>
                    </div>
                </>;
            case 'POWER_SUPPLY':
                return <>
                    <div className={s.desc}>
                        <p>{data.characteristics.capacity}W</p>
                    </div>
                </>;
            case 'THERMAL_PASTE':
                return <>
                    <div className={s.desc}>
                        <p>{data.characteristics.capacity}г</p>
                    </div>
                </>;
            default: return null;
        }
    }

    return (
        <>
            <p className={s.name}>{data.name}</p>
            {getTemplate(data.type)}
        </>
    );
};

export default ServerConfigItemTemplate;