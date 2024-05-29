import React, {useState} from 'react';
import ProjectsHeader from "../components/headers/ProjectsHeader";
import Projects from "../components/Projects/Projects";
import ModalProject from "../components/modals/ModalProject/ModalProject";
import ModalProjectServers from "../components/modals/ModalProjectServers/ModalProjectServers";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";

const ProjectsPage = ({servers, projects}) => {
    const [searchData, setSearchData] = useState('');
    const [modalProject, setModalProject] = useState({isOpen: false, data: null});
    const [modalProjectServers, setModalProjectServers] = useState({isOpen: false, setter: null, selectedServers: null, data: null});
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });

    return (
        <>
            <div className="main-content-box">
                <ProjectsHeader searchData={searchData} setSearchData={setSearchData} qtyProjects={projects.data?.count} setModalProject={setModalProject}/>
                <div className="main-content">
                    <Projects projects={projects} searchData={searchData} setModalConfirm={setModalConfirm}/>
                </div>
            </div>
            {modalProject.isOpen && <ModalProject setModalProject={setModalProject}
                                                 servers={servers}
                                                 data={modalProject.data}
                                                 setModalProjectServers={setModalProjectServers}/>}
            {modalProjectServers.isOpen && <ModalProjectServers setModalProjectServers={setModalProjectServers}
                                                               setter={modalProjectServers.setter}
                                                               data={modalProjectServers.data}
                                                               selectedServers={modalProjectServers.selectedServers}
                                                               servers={servers}/>}
            {modalConfirm.isOpen && <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/>}
        </>
    );
};

export default ProjectsPage;