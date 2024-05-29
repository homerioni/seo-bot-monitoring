import React from 'react';
import s from './SettingsItem.module.scss';
import {PMService} from "../../../API/PMService";
import {useQueryClient} from "react-query";
import {getErrorMessage} from "../../../utils/tools";

const SettingsItem = ({data, setAddForm, setModalConfirm}) => {
    const queryClient = useQueryClient();

    const onEdit = () => setAddForm({isOpen: true, data});

    const onDel = () => setModalConfirm({
        isOpen: true,
        data: {
            title: `Удалить иконку настроек <b>${data?.name}</b>`,
            color: 'red',
            btnText: 'Да, удалить',
            iconType: 'server',
            onConfirm: (close) => {
                PMService.settingsType.delete(data?.id).then(resp => {
                    queryClient.invalidateQueries('settings');
                    close([{status: true, message: `Настройка ${data?.name} успешно удалена`}]);
                }).catch(e => close(getErrorMessage(e)));
            }
        }
    });

    return (
        <div className={s.item}>
            <div>
                <p className={s.itemName}>иконка</p>
                <div className={s.icon}>
                    <img src={data?.iconLink} alt=""/>
                </div>
            </div>
            <div className={s.nameBox}>
                <p className={s.itemName}>Название</p>
                <p className={s.name}>{data?.name}</p>
            </div>
            <button type="button" className={s.edit} onClick={onEdit}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.08876 1.00474L0.866469 7.22594C0.626689 7.46568 0.398907 7.93317 0.350951 8.2688L0.015261 10.6422C-0.104629 11.5053 0.494815 12.1046 1.35802 11.9847L3.73182 11.6491C4.06751 11.6012 4.53511 11.3734 4.77489 11.1337L10.9972 4.91247C12.0642 3.84563 12.5797 2.599 10.9972 1.01673C9.41463 -0.577532 8.16777 -0.07408 7.08876 1.00474Z" fill="#8B98EE"/>
                    <path d="M6 2.25C6.50769 4.06154 7.92692 5.49231 9.75 6" stroke="#DFE1EB" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button type="button" className={s.del} onClick={onDel}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.0736 5.23C19.4636 5.07 17.8536 4.95 16.2336 4.86V4.85L16.0136 3.55C15.8636 2.63 15.6436 1.25 13.3036 1.25H10.6836C8.35358 1.25 8.13357 2.57 7.97358 3.54L7.76358 4.82C6.83358 4.88 5.90358 4.94 4.97358 5.03L2.93358 5.23C2.51358 5.27 2.21358 5.64 2.25358 6.05C2.29358 6.46 2.65358 6.76 3.07358 6.72L5.11358 6.52C10.3536 6 15.6336 6.2 20.9336 6.73C20.9636 6.73 20.9836 6.73 21.0136 6.73C21.3936 6.73 21.7236 6.44 21.7636 6.05C21.7936 5.64 21.4936 5.27 21.0736 5.23Z" fill="#EB376D"/>
                    <path d="M19.2317 8.14C18.9917 7.89 18.6617 7.75 18.3217 7.75H5.6817C5.3417 7.75 5.0017 7.89 4.7717 8.14C4.5417 8.39 4.4117 8.73 4.4317 9.08L5.0517 19.34C5.1617 20.86 5.3017 22.76 8.7917 22.76H15.2117C18.7017 22.76 18.8417 20.87 18.9517 19.34L19.5717 9.09C19.5917 8.73 19.4617 8.39 19.2317 8.14ZM13.6617 17.75H10.3317C9.9217 17.75 9.5817 17.41 9.5817 17C9.5817 16.59 9.9217 16.25 10.3317 16.25H13.6617C14.0717 16.25 14.4117 16.59 14.4117 17C14.4117 17.41 14.0717 17.75 13.6617 17.75ZM14.5017 13.75H9.5017C9.0917 13.75 8.7517 13.41 8.7517 13C8.7517 12.59 9.0917 12.25 9.5017 12.25H14.5017C14.9117 12.25 15.2517 12.59 15.2517 13C15.2517 13.41 14.9117 13.75 14.5017 13.75Z" fill="#EB376D"/>
                </svg>
            </button>
        </div>
    );
};

export default SettingsItem;