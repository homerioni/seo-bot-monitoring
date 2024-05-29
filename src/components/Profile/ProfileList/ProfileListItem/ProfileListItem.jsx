import React, {useContext} from 'react';
import s from './ProfileListItem.module.scss'
import SwitchBtn from "../../../UI/StatusUI/SwitchBtn/SwitchBtn";
import {UsersAPI} from "../../../../API/UsersAPI";
import {defaultCatch} from "../../../../utils/tools";
import {AlertContext} from "../../../../App";
import EditBtn from "../../../headers/EditBtn/EditBtn";
import {useQueryClient} from "react-query";

const ProfileListItem = ({setModalUser, userData}) => {
    const queryClient = useQueryClient();
    const addAlert = useContext(AlertContext);
    const onEdit = () => setModalUser({isOpen: true, data: userData});
    const onSwitch = () => UsersAPI.user.change(userData.id, {...userData, roles: userData.roles.map(role => role.name), active: !userData.active})
        .then(() => {
            queryClient.invalidateQueries('usersList');
        }).catch(e => defaultCatch(e, addAlert));

    return (
        <div className={`${s.item}`}>
            <EditBtn className={s.editBtn} onClick={onEdit}/>
            <div>{userData.login}</div>
            <div>{userData.firstName} {userData.lastName}</div>
            <div>{userData.roles.map(role => role.alias).join(', ')}</div>
            <SwitchBtn active={userData?.active} onClick={onSwitch}/>
        </div>
    );
};

export default ProfileListItem;