import React, {useEffect, useState} from 'react';
import Profile from "../components/Profile/Profile";
import {useQuery} from "react-query";
import {UsersAPI} from "../API/UsersAPI";
import ModalUser from "../components/modals/ModalUser/ModalUser";

const ProfilePage = () => {
    const [modalUser, setModalUser] = useState({isOpen: false, data: null});
    const profileData = useQuery('profile', () => UsersAPI.auth.profile(), {keepPreviousData: true, refetchOnWindowFocus: false});
    const roles = useQuery('roles', () => UsersAPI.role.getAll(), {keepPreviousData: true, refetchOnWindowFocus: false});

    return (
        <>
            <div className='main-content-box'>
                <div className="main-content" style={{backgroundColor: 'white'}}>
                    {!profileData.isLoading && <Profile profileData={profileData.data} setModalUser={setModalUser}/>}
                </div>
            </div>
            {modalUser.isOpen && <ModalUser setModalUser={setModalUser} rolesData={roles?.data?.result?.roles} data={modalUser.data}/>}
        </>
    );
};

export default ProfilePage;