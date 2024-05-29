import React, {useContext} from 'react';
import s from "./ModalDistButtons.module.scss";
import Loading from "../../../UI/Loading/Loading";
import {PMService} from "../../../../API/PMService";
import {useQueryClient} from "react-query";
import {AlertContext} from "../../../../App";
import {getErrorMessage} from "../../../../utils/tools";

const ModalDistButtons = ({data, distForm, setIsClose}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();

    const onClick = () => {
        const onResp = (resp) => {
            queryClient.invalidateQueries([`threads${data.server.id}`]);
            addAlert([{status: true, message: 'Настройка копирования успешно сохранена'}]);
            setIsClose(true);
        }

        if (data.folderDistribution) {
            PMService.folderDistribution.change(distForm.folderDistributionId, distForm).then(resp => onResp(resp)).catch(e => addAlert(getErrorMessage(e)));
        } else {
            PMService.folderDistribution.create({...distForm, settingsId: data.id}).then(resp => onResp(resp)).catch(e => addAlert(getErrorMessage(e)));
        }
    };

    return (
        <div className={s.buttons}>
            <button type="button" className={s.submit} onClick={onClick}>
                <span className={s.icon}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9167 4.99994L8.75 14.1758L6 11.4258" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                <span>Сохранить</span>
            </button>
            <button type="button" className={s.cancel} onClick={() => setIsClose(true)}>
                <span>Отменить</span>
            </button>
        </div>
    );
};

export default ModalDistButtons;