import React from 'react';
import s from './ThreadFolder.module.scss';
import {useQueryClient} from "react-query";
import ThreadFolderSwitch from "./ThreadFolderSwitch";
import ThreadFolderDel from "./ThreadFolderDel";
import ThreadFolderSend from "./ThreadFolderSend";
import ThreadFolderEdit from "./ThreadFolderEdit";

const ThreadFolder = ({data, setModalConfirm, setModalDist}) => {
    const queryClient = useQueryClient();

    const editClick = () => setModalDist({isOpen: true, data});

    return (
        <div className={s.main}>
            {data.folderDistribution?.request &&
                <div className={s.infoBox}>
                    <svg className={s.infoIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="18" height="18" rx="9" fill="white"/>
                        <path d="M10.3328 7.71652L8.13436 7.96899L8.05564 8.30328L8.48764 8.37629C8.76989 8.43787 8.82557 8.53112 8.76413 8.78887L8.05564 11.8397C7.86939 12.6288 8.15644 13 8.83133 13C9.35454 13 9.96223 12.7783 10.2378 12.4739L10.3222 12.108C10.1302 12.2628 9.84991 12.3244 9.66367 12.3244C9.39966 12.3244 9.30366 12.1546 9.37182 11.8555L10.3328 7.71652ZM10.4 5.8797C10.4 6.11301 10.2989 6.33677 10.1188 6.50174C9.93878 6.66672 9.69459 6.7594 9.43998 6.7594C9.18537 6.7594 8.94118 6.66672 8.76115 6.50174C8.58111 6.33677 8.47996 6.11301 8.47996 5.8797C8.47996 5.64639 8.58111 5.42263 8.76115 5.25766C8.94118 5.09268 9.18537 5 9.43998 5C9.69459 5 9.93878 5.09268 10.1188 5.25766C10.2989 5.42263 10.4 5.64639 10.4 5.8797Z" fill="#8998AB"/>
                    </svg>
                    <div className={s.info}>
                        <p>Информация о последнем копировании</p>
                        <p>Дата: {new Date(data.folderDistribution.request.createdAt).toLocaleString()}</p>
                        <p>Результат: {data.folderDistribution.request.message}</p>
                    </div>
                </div>}
            <span className={s.text}>Копирование профилей внутри:</span>
            <div className={s.dist}>
                {data.folderDistribution ?
                    <ThreadFolderSend data={data} setModalConfirm={setModalConfirm} queryClient={queryClient}/> : ''}
                <ThreadFolderEdit onClick={editClick}/>
                <ThreadFolderSwitch data={data} setModalConfirm={setModalConfirm} queryClient={queryClient}/>
                {data.folderDistribution ?
                    <ThreadFolderDel data={data} setModalConfirm={setModalConfirm} queryClient={queryClient}/> : ''}
            </div>
        </div>
    );
};

export default ThreadFolder;