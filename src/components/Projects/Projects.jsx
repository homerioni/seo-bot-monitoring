import React, {useEffect, useState} from 'react';
import ProjectsContentHeader from "./ProjectsContentHeader/ProjectsContentHeader";
import ProjectsContent from "./ProjectsContent/ProjectsContent";

const Projects = ({projects, searchData, setModalConfirm}) => {
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        setFilteredProjects(projects.data?.result?.filter(project => project.name.includes(searchData)));
    }, [searchData, projects]);

    return (
        <div>
            <ProjectsContentHeader/>
            <ProjectsContent filteredProjects={filteredProjects} setModalConfirm={setModalConfirm}/>
        </div>
    );
};

export default Projects;