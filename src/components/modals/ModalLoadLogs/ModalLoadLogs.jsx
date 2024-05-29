import React, {useContext, useState} from 'react';
import s from './ModalLoadLogs.module.scss';
import sModal from '../Modal.module.scss';
import ModalLoadLogsBtn from "./ModalLoadLogsBtn";
import {AlertContext} from "../../../App";

const ModalLoadLogs = ({modalLoadLogs, setModalLoadLogs}) => {
    const addAlert = useContext(AlertContext);
    const [isClosed, setIsClosed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dateValues, setDateValues] = useState({from: null, to: null});

    const getTextDate = (date) => {
        date = new Date(date);
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    const closeHandle = (alert) => {
        setIsLoading(false);
        setIsClosed(true);
        if (alert) addAlert(alert);
        const t = setTimeout(() => {
            setModalLoadLogs({isOpen: false});
            clearTimeout(t);
        }, 300);
    };

    return (
        <div className={`${sModal.modal} ${isClosed ? sModal.closeAnim : ''} ${s.main}`} onClick={() => closeHandle()}>
            <div className={`${sModal.container} ${s.container}`} onClick={e => e.stopPropagation()}>
                <button type="button" className={`${sModal.close}`} onClick={() => closeHandle()}/>
                <div className={s.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                        <circle cx="35" cy="35" r="35" fill="#EEEFF5"/>
                        <path d="M28.2087 21.3333H24.1662C22.42 21.3333 21.375 22.3466 21.375 24.0399V27.9599C21.375 29.6533 22.42 30.6666 24.1662 30.6666H28.2087C29.955 30.6666 31 29.6533 31 27.9599V24.0399C31 22.3466 29.955 21.3333 28.2087 21.3333ZM28.8962 27.4133C29.24 27.7466 29.24 28.2933 28.8962 28.6266C28.7175 28.7866 28.4838 28.8666 28.2638 28.8666C28.0438 28.8666 27.8238 28.7866 27.645 28.6266L26.1737 27.2133L24.7438 28.6266C24.565 28.7866 24.345 28.8666 24.0975 28.8666C23.8775 28.8666 23.6575 28.7866 23.4787 28.6266C23.135 28.2933 23.135 27.7466 23.4787 27.4133L24.95 25.9999L23.4925 24.5999C23.1487 24.2666 23.1487 23.7199 23.4925 23.3866C23.8362 23.0533 24.4 23.0533 24.7438 23.3866L26.1737 24.7999L27.6313 23.3866C27.975 23.0533 28.5388 23.0533 28.8825 23.3866C29.2263 23.7199 29.2263 24.2666 28.8825 24.5999L27.4387 25.9999L28.8962 27.4133Z" fill="#EB376D"/>
                        <path d="M49.563 41.0933C49.563 41.2933 49.4942 41.4933 49.3155 41.6667C47.3217 43.6133 43.7742 47.08 41.7392 49.0667C41.5605 49.2533 41.3267 49.3333 41.093 49.3333C40.6392 49.3333 40.1992 48.9867 40.1992 48.48V43.8133C40.1992 41.8667 41.9042 40.2533 43.9942 40.2533C45.3005 40.24 47.1155 40.24 48.6692 40.24C49.2055 40.24 49.563 40.6533 49.563 41.0933Z" fill="#EB376D"/>
                        <path d="M49.563 41.0933C49.563 41.2933 49.4942 41.4933 49.3155 41.6667C47.3217 43.6133 43.7742 47.08 41.7392 49.0667C41.5605 49.2533 41.3267 49.3333 41.093 49.3333C40.6392 49.3333 40.1992 48.9867 40.1992 48.48V43.8133C40.1992 41.8667 41.9042 40.2533 43.9942 40.2533C45.3005 40.24 47.1155 40.24 48.6692 40.24C49.2055 40.24 49.563 40.6533 49.563 41.0933Z" fill="#EB376D"/>
                        <path d="M42.8662 22.6667H34.4375C33.6812 22.6667 33.0625 23.2667 33.0625 24.0001V28.6667C33.0625 30.8801 31.22 32.6667 28.9375 32.6667H24.8125C24.0562 32.6667 23.4375 33.2667 23.4375 34.0001V42.8401C23.4375 46.4267 26.435 49.3334 30.1337 49.3334H36.7612C37.5175 49.3334 38.1362 48.7334 38.1362 48.0001V43.8134C38.1362 40.7467 40.7625 38.2534 43.9938 38.2534C44.7225 38.2401 46.4963 38.2401 48.1875 38.2401C48.9438 38.2401 49.5625 37.6534 49.5625 36.9067V29.1601C49.5625 25.5734 46.565 22.6667 42.8662 22.6667ZM31.99 42.6801H28.36C27.7962 42.6801 27.3287 42.2267 27.3287 41.6801C27.3287 41.1201 27.7962 40.6667 28.36 40.6667H31.99C32.5813 40.6667 33.0213 41.1201 33.0213 41.6801C33.0213 42.2267 32.5813 42.6801 31.99 42.6801ZM35.8263 37.7334H28.36C27.7962 37.7334 27.3287 37.2801 27.3287 36.7334C27.3287 36.1734 27.7962 35.7201 28.36 35.7201H35.8263C36.39 35.7201 36.8713 36.1734 36.8713 36.7334C36.8713 37.2801 36.39 37.7334 35.8263 37.7334Z" fill="#EB376D"/>
                    </svg>
                </div>
                <p className={s.title}>Загрузка файла логов</p>
                <p className={s.subTitle}>выберите период</p>
                <div className={s.labelBox}>
                    <label className={s.label}>
                        <input type="date" value={dateValues.from} onChange={(e) => setDateValues({...dateValues, from: e.target.value})}/>
                        <span>{dateValues.from ? getTextDate(dateValues.from) : 'дд.мм.гггг'}</span>
                    </label>
                    <div className={s.separator}/>
                    <label className={s.label}>
                        <input type="date" value={dateValues.to} onChange={(e) => setDateValues({...dateValues, to: e.target.value})}/>
                        <span>{dateValues.to ? getTextDate(dateValues.to) : 'дд.мм.гггг'}</span>
                    </label>
                </div>
                <ModalLoadLogsBtn dateValues={dateValues} serverId={modalLoadLogs.serverId} closeHandle={closeHandle} isLoading={isLoading} setIsLoading={setIsLoading}/>
            </div>
        </div>
    );
};

export default ModalLoadLogs;