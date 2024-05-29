import React from 'react';
import s from './Header.module.scss';
import AddBtn from "./AddBtn/AddBtn";
import EditBtn from "./EditBtn/EditBtn";

const GroupsHeader = ({setModalGroupTabs, setModalGroup}) => {
    return (
        <div className={s.main}>
            <div>
                <AddBtn onClick={() => setModalGroup({isOpen: true, data: null})}/>
                <div>
                    <p className={s.title}>
                        <span>Все группы</span>
                    </p>
                </div>
            </div>
            <div>
                <EditBtn onClick={() => setModalGroupTabs(true)}/>
            </div>
        </div>
    );
};

export default GroupsHeader;