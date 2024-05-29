import React, {useContext} from 'react';
import s from './XmlAccount.module.scss';
import xmlIcon from '../../../assets/img/xmlIcon.svg';
import {ProjectsAPI} from "../../../API/ProjectsAPI";
import {AlertContext} from "../../../App";
import {useQueryClient} from "react-query";
import {getErrorMessage} from "../../../utils/tools";
import DotBtnList from "../../UI/DotBtnList/DotBtnList";

const XmlAccount = ({account, setModalConfirm, setModalXml}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();

    const onDel = () => setModalConfirm({
        isOpen: true,
        data: {
            title: `Удалить аккаунт #${account.id - 999}`,
            color: 'red',
            btnText: 'Да, удалить',
            iconType: 'server',
            onConfirm: (close) => {
                ProjectsAPI.yandex.delete(account.id).then(() => {
                    queryClient.invalidateQueries('xml');
                    addAlert([{status: true, message: `Аккаунт #${account.id - 999} успешно удален`}]);
                    close();
                }).catch(e => close(getErrorMessage(e)));
            }
        }
    });

    const onEdit = () => setModalXml({isOpen: true, data: account});

    return (
        <div className={s.main}>
            <div className={s.name}>
                <div className={s.icon}>
                    <img src={xmlIcon} alt=""/>
                </div>
                <p>Аккаунт #{account?.id - 999}</p>
            </div>
            <div className={s.text}>{account.ipProxy}</div>
            <div className={s.text}>{account.login}</div>
            <DotBtnList className={s.btnBox} onEdit={onEdit} onDel={onDel}/>
        </div>
    );
};

export default XmlAccount;