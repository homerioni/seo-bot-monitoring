import React, {useContext, useState} from 'react';
import s from './RecipientDelBtn.module.scss';
import Loading from "../../../../../../../UI/Loading/Loading";
import {PMService} from "../../../../../../../../API/PMService";
import {AlertContext} from "../../../../../../../../App";
import {defaultCatch, getErrorMessage} from "../../../../../../../../utils/tools";

const RecipientDelBtn = ({data, threadId, setRecipients, index}) => {
    const addAlert = useContext(AlertContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClick = () => {
        setIsOpen(false);
        if (data?.recipientId) {
            setIsLoading(true);
            PMService.settings.recipient.delete(threadId, data?.recipientId).then(resp => {
                setIsLoading(false);
                addAlert([{status: true, message: `Отправка на сервер ${data?.name} успешно удалена`}]);
                setRecipients(prev => {
                    if (prev.length > 1) return prev.filter(el => el.recipientId !== data.recipientId);
                    return [null];
                });
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            setRecipients(prev => {
                if (prev.length > 1) return prev.filter((el, i) => i !== index);
                return [null];
            });
        }
    }

    return (
        <>
            <button type="button" className={s.btn} onClick={() => setIsOpen(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#EB376D"/>
                    <path d="M19.2317 8.14C18.9917 7.89 18.6617 7.75 18.3217 7.75H5.6817C5.3417 7.75 5.0017 7.89 4.7717 8.14C4.5417 8.39 4.4117 8.73 4.4317 9.08L5.0517 19.34C5.1617 20.86 5.3017 22.76 8.7917 22.76H15.2117C18.7017 22.76 18.8417 20.87 18.9517 19.34L19.5717 9.09C19.5917 8.73 19.4617 8.39 19.2317 8.14ZM13.6617 17.75H10.3317C9.9217 17.75 9.5817 17.41 9.5817 17C9.5817 16.59 9.9217 16.25 10.3317 16.25H13.6617C14.0717 16.25 14.4117 16.59 14.4117 17C14.4117 17.41 14.0717 17.75 13.6617 17.75ZM14.5017 13.75H9.5017C9.0917 13.75 8.7517 13.41 8.7517 13C8.7517 12.59 9.0917 12.25 9.5017 12.25H14.5017C14.9117 12.25 15.2517 12.59 15.2517 13C15.2517 13.41 14.9117 13.75 14.5017 13.75Z" fill="#EB376D"/>
                </svg>
            </button>
            <div className={`${s.sureBox} ${isOpen ? s.show : ''}`}>
                <div className={s.sureContent}>
                    <p className={s.sureText}>Удалить сервер?</p>
                    <button type="button" className={s.sureBtn} onClick={onClick}>
                        {isLoading ? <Loading/> : ''}
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.0697 5.23171C19.4597 5.07171 17.8497 4.95171 16.2297 4.86171V4.85171L16.0097 3.55171C15.8597 2.63171 15.6397 1.25171 13.2997 1.25171H10.6797C8.34967 1.25171 8.12967 2.57171 7.96967 3.54171L7.75967 4.82171C6.82967 4.88171 5.89967 4.94171 4.96967 5.03171L2.92967 5.23171C2.50967 5.27171 2.20967 5.64171 2.24967 6.05171C2.28967 6.46171 2.64967 6.76171 3.06967 6.72171L5.10967 6.52171C10.3497 6.00171 15.6297 6.20171 20.9297 6.73171C20.9597 6.73171 20.9797 6.73171 21.0097 6.73171C21.3897 6.73171 21.7197 6.44171 21.7597 6.05171C21.7897 5.64171 21.4897 5.27171 21.0697 5.23171Z" fill="white"/>
                            <path d="M19.2317 8.14171C18.9917 7.89171 18.6617 7.75171 18.3217 7.75171H5.6817C5.3417 7.75171 5.0017 7.89171 4.7717 8.14171C4.5417 8.39171 4.4117 8.73171 4.4317 9.08171L5.0517 19.3417C5.1617 20.8617 5.3017 22.7617 8.7917 22.7617H15.2117C18.7017 22.7617 18.8417 20.8717 18.9517 19.3417L19.5717 9.09171C19.5917 8.73171 19.4617 8.39171 19.2317 8.14171ZM13.6617 17.7517H10.3317C9.9217 17.7517 9.5817 17.4117 9.5817 17.0017C9.5817 16.5917 9.9217 16.2517 10.3317 16.2517H13.6617C14.0717 16.2517 14.4117 16.5917 14.4117 17.0017C14.4117 17.4117 14.0717 17.7517 13.6617 17.7517ZM14.5017 13.7517H9.5017C9.0917 13.7517 8.7517 13.4117 8.7517 13.0017C8.7517 12.5917 9.0917 12.2517 9.5017 12.2517H14.5017C14.9117 12.2517 15.2517 12.5917 15.2517 13.0017C15.2517 13.4117 14.9117 13.7517 14.5017 13.7517Z" fill="white"/>
                        </svg>
                        <span>Удалить</span>
                    </button>
                    <button type="button" className={s.sureCancel} onClick={() => setIsOpen(false)}>
                        <span>Отмена</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default RecipientDelBtn;