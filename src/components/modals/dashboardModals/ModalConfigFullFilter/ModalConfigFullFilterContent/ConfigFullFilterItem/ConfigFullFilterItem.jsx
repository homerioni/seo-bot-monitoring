import React, {useState} from 'react';
import s from './ConfigFullFilterItem.module.scss';
import ModalDashboardCheckbox from "../../../UI/ModalDashboardCheckbox/ModalDashboardCheckbox";

const ConfigFullFilterItem = ({config, searchValue, onChange, value}) => {
    const [listIsOpen, setListIsOpen] = useState(false);

    return (
        <div key={config.id} className={s.configBox}>
            <div className={s.configTitle}>
                <label>
                    <ModalDashboardCheckbox onChange={onChange} defaultChecked={!value?.includes(config.id)} value={config.id}/>
                </label>
                <label>
                    <input type="checkbox" name={'configServersList'} onChange={() => setListIsOpen(prev => !prev)}/>
                    <div className={s.nameBox}>
                        {config.data.qtyCpu > 1 ? <div className={s.qty}>x{config.data.qtyCpu}</div> : ''}
                        <p>{config.data.cpuName} {config.data.valueRam}Gb</p>
                    </div>
                    <div className={s.serversLength}>
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.4688 0.455778C-4.76837e-08 0.911556 0 1.64422 0 3.11111C0 4.578 -4.76837e-08 5.31067 0.4688 5.76644C0.9376 6.22222 1.6912 6.22222 3.2 6.22222H12.8C14.3088 6.22222 15.0624 6.22222 15.5312 5.76644C16 5.31067 16 4.578 16 3.11111C16 1.64422 16 0.911556 15.5312 0.455778C15.0624 -4.63592e-08 14.3088 0 12.8 0H3.2C1.6912 0 0.9376 -4.63592e-08 0.4688 0.455778ZM5.6 4.47222C5.44087 4.47222 5.28826 4.41076 5.17574 4.30137C5.06321 4.19197 5 4.0436 5 3.88889V2.33333C5 2.17862 5.06321 2.03025 5.17574 1.92085C5.28826 1.81146 5.44087 1.75 5.6 1.75C5.75913 1.75 5.91174 1.81146 6.02426 1.92085C6.13679 2.03025 6.2 2.17862 6.2 2.33333V3.88889C6.2 4.0436 6.13679 4.19197 6.02426 4.30137C5.91174 4.41076 5.75913 4.47222 5.6 4.47222ZM9.2 2.52778C9.04087 2.52778 8.88826 2.58924 8.77574 2.69863C8.66321 2.80803 8.6 2.9564 8.6 3.11111C8.6 3.26582 8.66321 3.41419 8.77574 3.52359C8.88826 3.63299 9.04087 3.69444 9.2 3.69444H12.8C12.9591 3.69444 13.1117 3.63299 13.2243 3.52359C13.3368 3.41419 13.4 3.26582 13.4 3.11111C13.4 2.9564 13.3368 2.80803 13.2243 2.69863C13.1117 2.58924 12.9591 2.52778 12.8 2.52778H9.2ZM3.2 4.47222C3.04087 4.47222 2.88826 4.41076 2.77574 4.30137C2.66321 4.19197 2.6 4.0436 2.6 3.88889V2.33333C2.6 2.17862 2.66321 2.03025 2.77574 1.92085C2.88826 1.81146 3.04087 1.75 3.2 1.75C3.35913 1.75 3.51174 1.81146 3.62426 1.92085C3.73679 2.03025 3.8 2.17862 3.8 2.33333V3.88889C3.8 4.0436 3.73679 4.19197 3.62426 4.30137C3.51174 4.41076 3.35913 4.47222 3.2 4.47222ZM0.4688 8.23356C-4.76837e-08 8.68933 0 9.422 0 10.8889C0 12.3558 -4.76837e-08 13.0884 0.4688 13.5442C0.9376 14 1.6912 14 3.2 14H12.8C14.3088 14 15.0624 14 15.5312 13.5442C16 13.0884 16 12.3558 16 10.8889C16 9.422 16 8.68933 15.5312 8.23356C15.0624 7.77778 14.3088 7.77778 12.8 7.77778H3.2C1.6912 7.77778 0.9376 7.77778 0.4688 8.23356ZM8.6 10.8889C8.6 10.7342 8.66321 10.5858 8.77574 10.4764C8.88826 10.367 9.04087 10.3056 9.2 10.3056H12.8C12.9591 10.3056 13.1117 10.367 13.2243 10.4764C13.3368 10.5858 13.4 10.7342 13.4 10.8889C13.4 11.0436 13.3368 11.192 13.2243 11.3014C13.1117 11.4108 12.9591 11.4722 12.8 11.4722H9.2C9.04087 11.4722 8.88826 11.4108 8.77574 11.3014C8.66321 11.192 8.6 11.0436 8.6 10.8889ZM2.6 11.6667C2.6 11.8214 2.66321 11.9698 2.77574 12.0791C2.88826 12.1885 3.04087 12.25 3.2 12.25C3.35913 12.25 3.51174 12.1885 3.62426 12.0791C3.73679 11.9698 3.8 11.8214 3.8 11.6667V10.1111C3.8 9.9564 3.73679 9.80803 3.62426 9.69863C3.51174 9.58924 3.35913 9.52778 3.2 9.52778C3.04087 9.52778 2.88826 9.58924 2.77574 9.69863C2.66321 9.80803 2.6 9.9564 2.6 10.1111V11.6667ZM5.6 12.25C5.44087 12.25 5.28826 12.1885 5.17574 12.0791C5.06321 11.9698 5 11.8214 5 11.6667V10.1111C5 9.9564 5.06321 9.80803 5.17574 9.69863C5.28826 9.58924 5.44087 9.52778 5.6 9.52778C5.75913 9.52778 5.91174 9.58924 6.02426 9.69863C6.13679 9.80803 6.2 9.9564 6.2 10.1111V11.6667C6.2 11.8214 6.13679 11.9698 6.02426 12.0791C5.91174 12.1885 5.75913 12.25 5.6 12.25Z" fill="#A1B1C5"/>
                        </svg>
                        <span>{config.servers?.length}</span>
                    </div>
                    <div className={`${s.arrowBtn} ${listIsOpen ? s.active : ''}`}>
                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2L8 8L2 2" stroke="#393B44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </label>
            </div>
            <div className={`${s.serversList} ${listIsOpen ? s.active : ''}`} style={{'--qty': config.servers?.length}}>
                <div className={s.listHeader}>
                    <p>Сервер</p>
                    <p>Запуск</p>
                    <p>Изменения</p>
                    <p>Локация</p>
                </div>
                {config.servers?.map(server => (
                    <div key={server.id} className={s.listItem}>
                        <label>
                            <ModalDashboardCheckbox bg={false}/>
                        </label>
                        <div className={`${s.listStatus} ${s[server.status]}`}/>
                        <p className={s.listText}>{server.name}</p>
                        <p className={s.listText}>{new Date(server.createdDate).toLocaleString().slice(0, 10)}</p>
                        <p className={s.listText}>{server.settingsLastUpdateDate ? new Date(server.settingsLastUpdateDate).toLocaleString().slice(0, 10) : '-'}</p>
                        <p className={s.listText}>{server.location?.name ?? '-'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConfigFullFilterItem;