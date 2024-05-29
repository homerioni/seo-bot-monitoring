import React, {useMemo, useState} from 'react';
import {useParams} from "react-router";
import ProjectPageHeader from "../components/headers/ProjectPageHeader";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import Project from "../components/Project/Project";
import ModalProject from "../components/modals/ModalProject/ModalProject";
import ModalProjectServers from "../components/modals/ModalProjectServers/ModalProjectServers";
import ModalDamage from "../components/modals/ModalDamage/ModalDamage";

const ProjectPage = ({servers, projects, locations, accessory}) => {
    const {id} = useParams();
    const [modalProject, setModalProject] = useState({isOpen: false, data: null});
    const [modalDamage, setModalDamage] = useState({isOpen: false, data: null});
    const [modalProjectServers, setModalProjectServers] = useState({isOpen: false, setter: null, selectedServers: null, data: null});
    const project = useMemo(() => {
        return projects.data?.result.find(project => project.id == id);
    }, [projects, id]);
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });

    return (
        <>
            <div className="main-content-box">
                <ProjectPageHeader project={project} setModalConfirm={setModalConfirm} setModalProject={setModalProject}/>
                <div className="main-content">
                    <Project setModalConfirm={setModalConfirm} servers={servers} projects={projects} project={project} locations={locations} accessory={accessory} setModalDamage={setModalDamage}/>
                </div>
            </div>
            {modalDamage.isOpen ? <ModalDamage setModalDamage={setModalDamage} data={modalDamage.data}/> : ''}
            {modalProject.isOpen ? <ModalProject setModalProject={setModalProject}
                                                 servers={servers}
                                                 data={modalProject.data}
                                                 setModalProjectServers={setModalProjectServers}/> : ''}
            {modalProjectServers.isOpen ? <ModalProjectServers setModalProjectServers={setModalProjectServers}
                                                               setter={modalProjectServers.setter}
                                                               data={modalProjectServers.data}
                                                               selectedServers={modalProjectServers.selectedServers}
                                                               servers={servers}/> : ''}
            {modalConfirm.isOpen ? <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/> : ''}
        </>
    );
};

export default ProjectPage;