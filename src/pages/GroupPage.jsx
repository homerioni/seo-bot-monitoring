import React, {useState} from 'react';
import {useParams} from "react-router";
import GroupHeader from "../components/headers/GroupHeader";
import ModalGroup from "../components/modals/ModalGroup/ModalGroup";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import {useQuery} from "react-query";
import {PMService} from "../API/PMService";
import GroupStat from "../components/Group/GroupStat/GroupStat";
import ModalStat from "../components/modals/ModalStat/ModalStat";
import ServersBox from "../components/ServersBox/ServersBox";
import ModalDamage from "../components/modals/ModalDamage/ModalDamage";

const GroupPage = ({servers, projects, locations, accessory}) => {
    const {id} = useParams();
    const [groupData, setGroupData] = useState(null);
    const [modalDamage, setModalDamage] = useState({isOpen: false, data: null});
    const [modalGroup, setModalGroup] = useState({isOpen: false, data: groupData});
    const [modalStat, setModalStat] = useState({isOpen: false, data: null});
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });
    const groups = useQuery('groups', () => PMService.group.getAll(), {
        keepPreviousData: true,
        onSuccess: resp => setGroupData(resp.result.find(el => el.id == id))
    });

    return (
        <>
            <section className='main-content-box'>
                <GroupHeader groups={groups} groupData={groupData} setModalGroup={setModalGroup} setModalConfirm={setModalConfirm}/>
                <div className="main-content">
                    <GroupStat id={id} setModalStat={setModalStat}/>
                    <ServersBox setModalConfirm={setModalConfirm} setModalDamage={setModalDamage} servers={servers} thisServers={groupData} projects={projects} accessory={accessory} locations={locations}/>
                </div>
            </section>
            {modalStat.isOpen ? <ModalStat setModalStat={setModalStat} data={modalStat.data} name={groupData?.name}/> : ''}
            {modalGroup.isOpen ? <ModalGroup setModalGroup={setModalGroup} data={modalGroup.data} servers={servers}/> : ''}
            {modalDamage.isOpen ? <ModalDamage setModalDamage={setModalDamage} data={modalDamage.data}/> : ''}
            {modalConfirm.isOpen ? <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/> : ''}
        </>
    );
};

export default GroupPage;