import React, {useContext, useState} from 'react';
import s from './ThreadFormTitle.module.scss';
import {PMService} from "../../../../../API/PMService";
import {AlertContext} from "../../../../../App";
import {useQueryClient} from "react-query";
import Loading from "../../../../UI/Loading/Loading";
import {defaultCatch} from "../../../../../utils/tools";

const ThreadFormTitle = ({number, thread, setThreads, setActiveTab}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenSureBox, setIsOpenSureBox] = useState(false);

    const onDel = () => {
        if (thread.id) {
            setIsLoading(true);
            PMService.settings.delete(thread.id).then(resp => {
                setIsLoading(false);
                setIsOpenSureBox(false);
                setActiveTab(0);
                queryClient.invalidateQueries([`servers`]);
                setThreads(prev => {
                    const arr = prev.filter(item => item.id !== thread.id);
                    if (arr.length) queryClient.invalidateQueries([`threads${thread.server.id}`]);
                    return arr;
                });
                addAlert([{status: true, message: `Поток ${thread.name} успешно удален`}]);
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            setActiveTab(0);
            setThreads(prev => prev.filter(item => item.serverId !== thread.serverId));
            addAlert([{status: true, message: `Поток ${number} успешно удален`}]);
        }
    };

    return (
        <div className={s.main}>
            <p>Настройки потока {number}</p>
            <button type="button" className={s.delBtn} onClick={() => setIsOpenSureBox(true)}>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.0697 5.23171C19.4597 5.07171 17.8497 4.95171 16.2297 4.86171V4.85171L16.0097 3.55171C15.8597 2.63171 15.6397 1.25171 13.2997 1.25171H10.6797C8.34967 1.25171 8.12967 2.57171 7.96967 3.54171L7.75967 4.82171C6.82967 4.88171 5.89967 4.94171 4.96967 5.03171L2.92967 5.23171C2.50967 5.27171 2.20967 5.64171 2.24967 6.05171C2.28967 6.46171 2.64967 6.76171 3.06967 6.72171L5.10967 6.52171C10.3497 6.00171 15.6297 6.20171 20.9297 6.73171C20.9597 6.73171 20.9797 6.73171 21.0097 6.73171C21.3897 6.73171 21.7197 6.44171 21.7597 6.05171C21.7897 5.64171 21.4897 5.27171 21.0697 5.23171Z" fill="white"/>
                    <path d="M19.2297 8.14171C18.9897 7.89171 18.6597 7.75171 18.3197 7.75171H5.67975C5.33975 7.75171 4.99975 7.89171 4.76975 8.14171C4.53975 8.39171 4.40975 8.73171 4.42975 9.08171L5.04975 19.3417C5.15975 20.8617 5.29975 22.7617 8.78975 22.7617H15.2097C18.6997 22.7617 18.8398 20.8717 18.9497 19.3417L19.5697 9.09171C19.5897 8.73171 19.4597 8.39171 19.2297 8.14171ZM13.6597 17.7517H10.3297C9.91975 17.7517 9.57975 17.4117 9.57975 17.0017C9.57975 16.5917 9.91975 16.2517 10.3297 16.2517H13.6597C14.0697 16.2517 14.4097 16.5917 14.4097 17.0017C14.4097 17.4117 14.0697 17.7517 13.6597 17.7517ZM14.4997 13.7517H9.49975C9.08975 13.7517 8.74975 13.4117 8.74975 13.0017C8.74975 12.5917 9.08975 12.2517 9.49975 12.2517H14.4997C14.9097 12.2517 15.2497 12.5917 15.2497 13.0017C15.2497 13.4117 14.9097 13.7517 14.4997 13.7517Z" fill="white"/>
                </svg>
                <span>Удалить поток</span>
            </button>
            <div className={`${s.sureBox} ${isOpenSureBox ? s.show : ''}`}>
                <div className={s.sureContent}>
                    <p className={s.sureText}>Удалить поток?</p>
                    <button type="button" className={s.sureSubmit} onClick={onDel}>
                        {isLoading ? <Loading/> : ''}
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.0697 5.23171C19.4597 5.07171 17.8497 4.95171 16.2297 4.86171V4.85171L16.0097 3.55171C15.8597 2.63171 15.6397 1.25171 13.2997 1.25171H10.6797C8.34967 1.25171 8.12967 2.57171 7.96967 3.54171L7.75967 4.82171C6.82967 4.88171 5.89967 4.94171 4.96967 5.03171L2.92967 5.23171C2.50967 5.27171 2.20967 5.64171 2.24967 6.05171C2.28967 6.46171 2.64967 6.76171 3.06967 6.72171L5.10967 6.52171C10.3497 6.00171 15.6297 6.20171 20.9297 6.73171C20.9597 6.73171 20.9797 6.73171 21.0097 6.73171C21.3897 6.73171 21.7197 6.44171 21.7597 6.05171C21.7897 5.64171 21.4897 5.27171 21.0697 5.23171Z" fill="white"/>
                            <path d="M19.2317 8.14171C18.9917 7.89171 18.6617 7.75171 18.3217 7.75171H5.6817C5.3417 7.75171 5.0017 7.89171 4.7717 8.14171C4.5417 8.39171 4.4117 8.73171 4.4317 9.08171L5.0517 19.3417C5.1617 20.8617 5.3017 22.7617 8.7917 22.7617H15.2117C18.7017 22.7617 18.8417 20.8717 18.9517 19.3417L19.5717 9.09171C19.5917 8.73171 19.4617 8.39171 19.2317 8.14171ZM13.6617 17.7517H10.3317C9.9217 17.7517 9.5817 17.4117 9.5817 17.0017C9.5817 16.5917 9.9217 16.2517 10.3317 16.2517H13.6617C14.0717 16.2517 14.4117 16.5917 14.4117 17.0017C14.4117 17.4117 14.0717 17.7517 13.6617 17.7517ZM14.5017 13.7517H9.5017C9.0917 13.7517 8.7517 13.4117 8.7517 13.0017C8.7517 12.5917 9.0917 12.2517 9.5017 12.2517H14.5017C14.9117 12.2517 15.2517 12.5917 15.2517 13.0017C15.2517 13.4117 14.9117 13.7517 14.5017 13.7517Z" fill="white"/>
                        </svg>
                        <span>Удалить</span>
                    </button>
                    <button type="button" className={s.sureCancel} onClick={() => setIsOpenSureBox(false)}>
                        <span>Отмена</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThreadFormTitle;