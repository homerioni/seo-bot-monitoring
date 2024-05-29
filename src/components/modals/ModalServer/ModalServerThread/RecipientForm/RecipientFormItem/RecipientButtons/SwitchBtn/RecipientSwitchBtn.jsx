import React, {useContext, useState} from 'react';
import s from './RecipientSwitchBtn.module.scss';
import SwitchBtn from "../../../../../../../UI/StatusUI/SwitchBtn/SwitchBtn";
import {PMService} from "../../../../../../../../API/PMService";
import {AlertContext} from "../../../../../../../../App";
import {defaultCatch} from "../../../../../../../../utils/tools";

const RecipientSwitchBtn = ({threadId, data}) => {
    const [isActive, setIsActive] = useState(data?.isActive);
    const addAlert = useContext(AlertContext);

    const onClick = () => {
        PMService.settings.recipient.change(threadId, data.recipientId, {
            folderForRecording: data.folderForRecording,
            isActive: !isActive,
            serverId: data.id
        }).then(resp => {
            setIsActive(resp.result[0].isActive);
            addAlert([{status: true, message: `Отправка на сервер успешно ${!isActive ? 'включена' : 'выключена'}`}]);
        }).catch(e => defaultCatch(e, addAlert));
    }

    return (
        <div className={s.main}>
            <SwitchBtn onClick={onClick} active={isActive}/>
        </div>
    );
};

export default RecipientSwitchBtn;