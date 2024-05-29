import React, {useContext} from 'react';
import s from './MetrikaAccount.module.scss';
import metrikaIcon from '../../../assets/img/yaMetrika.svg';
import {ProjectsAPI} from "../../../API/ProjectsAPI";
import {AlertContext} from "../../../App";
import {useQueryClient} from "react-query";
import {getErrorMessage} from "../../../utils/tools";
import DotBtnList from "../../UI/DotBtnList/DotBtnList";

const MetrikaAccount = ({account, setModalConfirm, setModalMetrika}) => {
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
                ProjectsAPI.metrika.delete(account.id).then(() => {
                    queryClient.invalidateQueries('metrika');
                    addAlert([{status: true, message: `Аккаунт #${account.id - 999} успешно удален`}]);
                    close();
                }).catch(e => close(getErrorMessage(e)));
            }
        }
    });

    const onEdit = () => setModalMetrika({isOpen: true, data: account});

    return (
        <div className={s.main}>
            <div className={s.name}>
                <div className={s.icon}>
                    <img src={metrikaIcon} alt=""/>
                </div>
                <p>Аккаунт #{account?.id - 999}</p>
            </div>
            <div className={s.text}>{account.name}</div>
            <div className={s.text}>{account.token}</div>
            <DotBtnList className={s.btnBox} onEdit={onEdit} onDel={onDel}/>
        </div>
    );
};

export default MetrikaAccount;