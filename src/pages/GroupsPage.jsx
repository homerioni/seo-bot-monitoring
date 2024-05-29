import React, {useState} from 'react';
import GroupsHeader from "../components/headers/GroupsHeader";
import Groups from "../components/Groups/Groups";
import ModalGroupTabs from "../components/modals/ModalGroupTabs/ModalGroupTabs";
import {useQuery} from "react-query";
import {PMService} from "../API/PMService";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import ModalGroupTab from "../components/modals/ModalGroupTab/ModalGroupTab";
import ModalGroup from "../components/modals/ModalGroup/ModalGroup";

const GroupsPage = ({servers}) => {
    const tabs = useQuery('groupsTabs', () => PMService.groupTab.getAll(), {keepPreviousData: true});
    const groups = useQuery('groups', () => PMService.group.getAll(), {keepPreviousData: true});
    const [modalGroupTab, setModalGroupTab] = useState({isOpen: false, data: null});
    const [modalGroupTabs, setModalGroupTabs] = useState(false);
    const [modalGroup, setModalGroup] = useState({isOpen: false, data: null});
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });

    return (
        <>
            <section className='main-content-box'>
                <GroupsHeader setModalGroupTabs={setModalGroupTabs} setModalGroup={setModalGroup}/>
                <div className="main-content">
                    <Groups tabs={tabs} groups={groups} setModalGroup={setModalGroup} setModalConfirm={setModalConfirm}/>
                </div>
            </section>
            {modalGroupTabs ? <ModalGroupTabs groups={groups}
                                                     tabs={tabs}
                                                     setModalConfirm={setModalConfirm}
                                                     setModalGroupTab={setModalGroupTab}
                                                     setModalGroupTabs={setModalGroupTabs}/> : ''}
            {modalGroupTab.isOpen ? <ModalGroupTab setModalGroupTab={setModalGroupTab} data={modalGroupTab.data} groups={groups}/> : ''}
            {modalGroup.isOpen ? <ModalGroup setModalGroup={setModalGroup} data={modalGroup.data} servers={servers}/> : ''}
            {modalConfirm.isOpen ? <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/> : ''}
        </>
    );
};

export default GroupsPage;