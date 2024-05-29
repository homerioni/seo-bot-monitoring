import React, {useContext, useState} from 'react';
import s from './ProfStatServerHeader.module.scss';
import ProfStatServerStats from "./ProfStatServerStats/ProfStatServerStats";
import {useQueryClient} from "react-query";
import {PMService} from "../../../../API/PMService";
import {defaultCatch} from "../../../../utils/tools";
import {AlertContext} from "../../../../App";
import Loading from "../../../UI/Loading/Loading";

const ProfStatServerHeader = ({activeTab, setActiveTab, index, updateDate, data, setModalConfirm}) => {
    const addAlert = useContext(AlertContext)
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState();

   const updateHandle = () => setModalConfirm({
        isOpen: true,
        data: {
            title: `При обновлении данных, старые данные будут удалены!<br/><b>Вы уверены что хотите обновить данные?</b>`,
            color: 'red',
            btnText: 'Да, обновить',
            iconType: 'server',
            onConfirm: (close) => {
                setIsLoading(true);
                PMService.profileStatistic.update(data?.id).then(() => {
                    setIsLoading(false);
                    addAlert([{status: true, message: 'Запрос на обновление данных отправлен'}]);
                    const t = setTimeout(() => {
                        queryClient.invalidateQueries(`ProfileStatMob${data?.id}`);
                        clearTimeout(t);
                    }, 15000);
                }).catch(e => defaultCatch(e, addAlert, setIsLoading));
                close();
            }
        }
    });

    return (
        <div>
            <div className={s.main}>
                <ProfStatServerStats index={index} server={data?.server}/>
                <div>
                    <div className={s.tabs}>
                        <button type='button' className={`${s.tab} ${activeTab === 1 ? s.active : ''}`} onClick={() => setActiveTab(1)}>desk & mob</button>
                        <button type='button' className={`${s.tab} ${activeTab === 2 ? s.active : ''}`} onClick={() => setActiveTab(2)}>desk</button>
                        <button type='button' className={`${s.tab} ${activeTab === 3 ? s.active : ''}`} onClick={() => setActiveTab(3)}>mob</button>
                        <button type='button' className={`${s.tab} ${activeTab === 4 ? s.active : ''}`} onClick={() => setActiveTab(4)}>sum</button>
                    </div>
                    <button className={s.btn} onClick={updateHandle}>
                        {isLoading ? <Loading/> : ''}
                        <span>Обновить данные</span>
                    </button>
                    <div className={s.dateBox}>
                        <p className={s.gray}>Обновлено</p>
                        <p>{new Date(updateDate).toLocaleString().slice(0, -3)}</p>
                    </div>
                </div>
            </div>
            <p className={s.subTitle}>
                <span className={s.gray}>Папка: </span>
                <span>{data?.folder}</span>
            </p>
        </div>
    );
};

export default ProfStatServerHeader;