import React from 'react';
import s from "./Header.module.scss";
import EditBtn from "./EditBtn/EditBtn";
import BackLink from "./BackLink/BackLink";
import Loading from "../UI/Loading/Loading";
import DelBtn from "./DelBtn/DelBtn";
import {PMService} from "../../API/PMService";
import {useNavigate} from "react-router";
import {getErrorMessage} from "../../utils/tools";

const GroupHeader = ({groups, groupData, setModalGroup, setModalConfirm}) => {
    const navigate = useNavigate();

    const onDel = () => setModalConfirm({
        isOpen: true,
        data: {
            title: `Удалить группу <b>${groupData.name}?</b>`,
            color: 'red',
            btnText: 'Да, удалить',
            iconType: 'group',
            onConfirm: (close) => {
                PMService.group.delete(groupData.id).then(resp => navigate('/groups')).catch(e => close(getErrorMessage(e)));
            }
        }
    });

    const onEdit = () => setModalGroup({isOpen: true, data: groupData});

    return (
        <div className={s.main}>
            <div>
                <BackLink src={'/groups'}/>
                {groups.isLoading ? <Loading style={{transform: 'translateX(3rem)'}}/> : ''}
                <p className={s.title}>
                    <span className={s.gray}>Группа: </span>
                    <span>{groupData?.name}</span>
                    <sup>{groupData?.servers?.length}</sup>
                </p>
            </div>
            <div>
                <EditBtn onClick={onEdit}/>
                <DelBtn onClick={onDel}/>
            </div>
        </div>
    );
};

export default GroupHeader;