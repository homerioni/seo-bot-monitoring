import React, {useState} from 'react';
import s from './NetworkItem.module.scss';
import NetworkItemDetails from "./NetworkItemDetails/NetworkItemDetails";
import {cutIp} from "../../../utils/tools";
import DotBtnList from "../../UI/DotBtnList/DotBtnList";

const NetworkItem = ({openItem, setOpenItem, data, handleDel, setModalNetwork}) => {
    const [isUpper, setIsUpper] = useState(false);
    const isDetailsOpen = openItem === data.id;
    const toggleDetails = () => setOpenItem(isDetailsOpen ? null : data.id);
    const handleEdit = () => setModalNetwork({isOpen: true, type: data.type, data: data});

    return (
        <div className={`${s.main} ${isDetailsOpen ? s.active : ''} ${isUpper ? s.upper : ''}`} onClick={toggleDetails}>
            <div className={s.content}>
                <DotBtnList className={`${s.btnBoxList} ${isDetailsOpen ? s.gray : ''} desktop`}
                            handleToggle={state => setIsUpper(state)}
                            onEdit={handleEdit}
                            onDel={() => handleDel(data.name, data.id, data.type)}/>
                <div className={`${s.status}`} style={{opacity: 1}}/>
                <div>{data.name}</div>
                <div>{cutIp(data.ip)}</div>
                <div>{data.location}</div>
                <div>
                    <svg className='mobile' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.4688 1.45578C-4.76837e-08 1.91156 0 2.64422 0 4.11111C0 5.578 -4.76837e-08 6.31067 0.4688 6.76644C0.9376 7.22222 1.6912 7.22222 3.2 7.22222H12.8C14.3088 7.22222 15.0624 7.22222 15.5312 6.76644C16 6.31067 16 5.578 16 4.11111C16 2.64422 16 1.91156 15.5312 1.45578C15.0624 1 14.3088 1 12.8 1H3.2C1.6912 1 0.9376 1 0.4688 1.45578ZM5.6 5.47222C5.44087 5.47222 5.28826 5.41076 5.17574 5.30137C5.06321 5.19197 5 5.0436 5 4.88889V3.33333C5 3.17862 5.06321 3.03025 5.17574 2.92085C5.28826 2.81146 5.44087 2.75 5.6 2.75C5.75913 2.75 5.91174 2.81146 6.02426 2.92085C6.13679 3.03025 6.2 3.17862 6.2 3.33333V4.88889C6.2 5.0436 6.13679 5.19197 6.02426 5.30137C5.91174 5.41076 5.75913 5.47222 5.6 5.47222ZM9.2 3.52778C9.04087 3.52778 8.88826 3.58924 8.77574 3.69863C8.66321 3.80803 8.6 3.9564 8.6 4.11111C8.6 4.26582 8.66321 4.41419 8.77574 4.52359C8.88826 4.63299 9.04087 4.69444 9.2 4.69444H12.8C12.9591 4.69444 13.1117 4.63299 13.2243 4.52359C13.3368 4.41419 13.4 4.26582 13.4 4.11111C13.4 3.9564 13.3368 3.80803 13.2243 3.69863C13.1117 3.58924 12.9591 3.52778 12.8 3.52778H9.2ZM3.2 5.47222C3.04087 5.47222 2.88826 5.41076 2.77574 5.30137C2.66321 5.19197 2.6 5.0436 2.6 4.88889V3.33333C2.6 3.17862 2.66321 3.03025 2.77574 2.92085C2.88826 2.81146 3.04087 2.75 3.2 2.75C3.35913 2.75 3.51174 2.81146 3.62426 2.92085C3.73679 3.03025 3.8 3.17862 3.8 3.33333V4.88889C3.8 5.0436 3.73679 5.19197 3.62426 5.30137C3.51174 5.41076 3.35913 5.47222 3.2 5.47222ZM0.4688 9.23356C-4.76837e-08 9.68933 0 10.422 0 11.8889C0 13.3558 -4.76837e-08 14.0884 0.4688 14.5442C0.9376 15 1.6912 15 3.2 15H12.8C14.3088 15 15.0624 15 15.5312 14.5442C16 14.0884 16 13.3558 16 11.8889C16 10.422 16 9.68933 15.5312 9.23356C15.0624 8.77778 14.3088 8.77778 12.8 8.77778H3.2C1.6912 8.77778 0.9376 8.77778 0.4688 9.23356ZM8.6 11.8889C8.6 11.7342 8.66321 11.5858 8.77574 11.4764C8.88826 11.367 9.04087 11.3056 9.2 11.3056H12.8C12.9591 11.3056 13.1117 11.367 13.2243 11.4764C13.3368 11.5858 13.4 11.7342 13.4 11.8889C13.4 12.0436 13.3368 12.192 13.2243 12.3014C13.1117 12.4108 12.9591 12.4722 12.8 12.4722H9.2C9.04087 12.4722 8.88826 12.4108 8.77574 12.3014C8.66321 12.192 8.6 12.0436 8.6 11.8889ZM2.6 12.6667C2.6 12.8214 2.66321 12.9698 2.77574 13.0791C2.88826 13.1885 3.04087 13.25 3.2 13.25C3.35913 13.25 3.51174 13.1885 3.62426 13.0791C3.73679 12.9698 3.8 12.8214 3.8 12.6667V11.1111C3.8 10.9564 3.73679 10.808 3.62426 10.6986C3.51174 10.5892 3.35913 10.5278 3.2 10.5278C3.04087 10.5278 2.88826 10.5892 2.77574 10.6986C2.66321 10.808 2.6 10.9564 2.6 11.1111V12.6667ZM5.6 13.25C5.44087 13.25 5.28826 13.1885 5.17574 13.0791C5.06321 12.9698 5 12.8214 5 12.6667V11.1111C5 10.9564 5.06321 10.808 5.17574 10.6986C5.28826 10.5892 5.44087 10.5278 5.6 10.5278C5.75913 10.5278 5.91174 10.5892 6.02426 10.6986C6.13679 10.808 6.2 10.9564 6.2 11.1111V12.6667C6.2 12.8214 6.13679 12.9698 6.02426 13.0791C5.91174 13.1885 5.75913 13.25 5.6 13.25Z" fill="#5BC2FF"/>
                    </svg>
                    <span>{data.countOfServers}</span>
                </div>
            </div>
            {isDetailsOpen &&
                <div className={s.details} onClick={e => e.stopPropagation()}>
                    <div className={`${s.serverInfo} mobile`}>
                        <div className={s.server}>
                            <div>
                                <div className={`${s.status}`} style={{opacity: 1}}/>
                                <div>{data.name}</div>
                                <div>{cutIp(data.ip)}</div>
                            </div>
                            <div>
                                <div>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.4688 1.45578C-4.76837e-08 1.91156 0 2.64422 0 4.11111C0 5.578 -4.76837e-08 6.31067 0.4688 6.76644C0.9376 7.22222 1.6912 7.22222 3.2 7.22222H12.8C14.3088 7.22222 15.0624 7.22222 15.5312 6.76644C16 6.31067 16 5.578 16 4.11111C16 2.64422 16 1.91156 15.5312 1.45578C15.0624 1 14.3088 1 12.8 1H3.2C1.6912 1 0.9376 1 0.4688 1.45578ZM5.6 5.47222C5.44087 5.47222 5.28826 5.41076 5.17574 5.30137C5.06321 5.19197 5 5.0436 5 4.88889V3.33333C5 3.17862 5.06321 3.03025 5.17574 2.92085C5.28826 2.81146 5.44087 2.75 5.6 2.75C5.75913 2.75 5.91174 2.81146 6.02426 2.92085C6.13679 3.03025 6.2 3.17862 6.2 3.33333V4.88889C6.2 5.0436 6.13679 5.19197 6.02426 5.30137C5.91174 5.41076 5.75913 5.47222 5.6 5.47222ZM9.2 3.52778C9.04087 3.52778 8.88826 3.58924 8.77574 3.69863C8.66321 3.80803 8.6 3.9564 8.6 4.11111C8.6 4.26582 8.66321 4.41419 8.77574 4.52359C8.88826 4.63299 9.04087 4.69444 9.2 4.69444H12.8C12.9591 4.69444 13.1117 4.63299 13.2243 4.52359C13.3368 4.41419 13.4 4.26582 13.4 4.11111C13.4 3.9564 13.3368 3.80803 13.2243 3.69863C13.1117 3.58924 12.9591 3.52778 12.8 3.52778H9.2ZM3.2 5.47222C3.04087 5.47222 2.88826 5.41076 2.77574 5.30137C2.66321 5.19197 2.6 5.0436 2.6 4.88889V3.33333C2.6 3.17862 2.66321 3.03025 2.77574 2.92085C2.88826 2.81146 3.04087 2.75 3.2 2.75C3.35913 2.75 3.51174 2.81146 3.62426 2.92085C3.73679 3.03025 3.8 3.17862 3.8 3.33333V4.88889C3.8 5.0436 3.73679 5.19197 3.62426 5.30137C3.51174 5.41076 3.35913 5.47222 3.2 5.47222ZM0.4688 9.23356C-4.76837e-08 9.68933 0 10.422 0 11.8889C0 13.3558 -4.76837e-08 14.0884 0.4688 14.5442C0.9376 15 1.6912 15 3.2 15H12.8C14.3088 15 15.0624 15 15.5312 14.5442C16 14.0884 16 13.3558 16 11.8889C16 10.422 16 9.68933 15.5312 9.23356C15.0624 8.77778 14.3088 8.77778 12.8 8.77778H3.2C1.6912 8.77778 0.9376 8.77778 0.4688 9.23356ZM8.6 11.8889C8.6 11.7342 8.66321 11.5858 8.77574 11.4764C8.88826 11.367 9.04087 11.3056 9.2 11.3056H12.8C12.9591 11.3056 13.1117 11.367 13.2243 11.4764C13.3368 11.5858 13.4 11.7342 13.4 11.8889C13.4 12.0436 13.3368 12.192 13.2243 12.3014C13.1117 12.4108 12.9591 12.4722 12.8 12.4722H9.2C9.04087 12.4722 8.88826 12.4108 8.77574 12.3014C8.66321 12.192 8.6 12.0436 8.6 11.8889ZM2.6 12.6667C2.6 12.8214 2.66321 12.9698 2.77574 13.0791C2.88826 13.1885 3.04087 13.25 3.2 13.25C3.35913 13.25 3.51174 13.1885 3.62426 13.0791C3.73679 12.9698 3.8 12.8214 3.8 12.6667V11.1111C3.8 10.9564 3.73679 10.808 3.62426 10.6986C3.51174 10.5892 3.35913 10.5278 3.2 10.5278C3.04087 10.5278 2.88826 10.5892 2.77574 10.6986C2.66321 10.808 2.6 10.9564 2.6 11.1111V12.6667ZM5.6 13.25C5.44087 13.25 5.28826 13.1885 5.17574 13.0791C5.06321 12.9698 5 12.8214 5 12.6667V11.1111C5 10.9564 5.06321 10.808 5.17574 10.6986C5.28826 10.5892 5.44087 10.5278 5.6 10.5278C5.75913 10.5278 5.91174 10.5892 6.02426 10.6986C6.13679 10.808 6.2 10.9564 6.2 11.1111V12.6667C6.2 12.8214 6.13679 12.9698 6.02426 13.0791C5.91174 13.1885 5.75913 13.25 5.6 13.25Z" fill="#5BC2FF"/>
                                    </svg>
                                    <span>{data.countOfServers}</span>
                                </div>
                                <div>{data.location}</div>
                            </div>
                        </div>
                        <button className={s.closeBtn} onClick={toggleDetails}/>
                    </div>
                    <p className={s.detailsTitle}>Подключенные сервера</p>
                    <div className={s.list}>
                        {data.servers.map(server =>
                            <NetworkItemDetails key={server.id} data={server} type={data.type}/>)}
                    </div>
                </div>
            }
        </div>
    );
};

export default NetworkItem;