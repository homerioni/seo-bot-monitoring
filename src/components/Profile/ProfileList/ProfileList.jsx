import React from 'react';
import s from './ProfileList.module.scss';
import {useQuery} from "react-query";
import {UsersAPI} from "../../../API/UsersAPI";
import ProfileListHeader from "./ProfileListHeader/ProfileListHeader";
import ProfileListItem from "./ProfileListItem/ProfileListItem";

const ProfileList = ({setModalUser}) => {
    const users = useQuery('usersList', () => UsersAPI.user.getAll(), {keepPreviousData: true, refetchOnWindowFocus: false});

    return (
        <div className={s.main}>
            <ProfileListHeader/>
            {users.data?.result?.users.map(user => (
                <ProfileListItem key={user.id} setModalUser={setModalUser} userData={user}/>
            ))}
            <button className={s.addBtn} onClick={() => setModalUser({isOpen: true})}>
                <span className={s.addIcon}/>
                <span>Добавить пользователя</span>
            </button>
        </div>
    );
};

export default ProfileList;