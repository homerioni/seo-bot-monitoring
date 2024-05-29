import React from 'react';
import s from './Project.module.scss';
import ServersBox from "../ServersBox/ServersBox";

const Project = ({project, projects, servers, setModalConfirm, locations, accessory, setModalDamage}) => {
    const serverIds = {servers: project?.settingResponse.servers.map(el => {return {id: el.serverId}})};

    return (
        <>
            <p className={s.title}>Серверы на проекте</p>
            <ServersBox setModalConfirm={setModalConfirm} servers={servers} thisServers={serverIds} projects={projects} accessory={accessory} locations={locations} setModalDamage={setModalDamage}/>
        </>
    );
};

export default Project;