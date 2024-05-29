import React from 'react';
import s from './ManagePromotionItem.module.scss';
import SwitchBtn from "../../../UI/StatusUI/SwitchBtn/SwitchBtn";
import EditBtn from "../../../headers/EditBtn/EditBtn";
import DuplicateBtn from "../../../UI/Buttons/DuplicateBtn/DuplicateBtn";
import {PMService} from "../../../../API/PMService";
import {defaultCatch} from "../../../../utils/tools";

const ManagePromotionItem = ({setModalManagement, data, setModalConfirm, queryClient, addAlert}) => {
    const onSwitch = () => {
        setModalConfirm({
            isOpen: true,
            data: {
                title: `${!data.active ? 'Включить' : 'Выключить'} данную задачу?`,
                color: !data.active ? 'green' : 'red',
                btnText: `Да, ${!data.active ? 'включить' : 'выключить'}`,
                iconType: 'server',
                onConfirm: (close) => {
                    PMService.task.change(data.id, {...data, active: !data.active}).then(() => {
                        queryClient.invalidateQueries('management');
                        addAlert([{status: true, message: `Задача успешно ${!data.active ? 'включена' : 'выключена'}`}]);
                        close();
                    }).catch(e => {
                        defaultCatch(e, addAlert);
                        close();
                    });
                }
            }
        })
    };

    return (
        <div className={s.main}>
            <div className={s.buttons}>
                <EditBtn className={s.editBtn} onClick={() => setModalManagement({isOpen: true, type: 'PROMOTION', data, edit: true})}/>
                <DuplicateBtn onClick={() => setModalManagement({isOpen: true, type: 'PROMOTION', data})}/>
            </div>
            <p className={s.name}>{data.project.name}</p>
            <p>{data.project.domain}</p>
            <p>{data.searchEngineType}</p>
            <p>{data.project.regionNumber}</p>
            <SwitchBtn active={data.active} onClick={onSwitch}/>
        </div>
    );
};

export default ManagePromotionItem;