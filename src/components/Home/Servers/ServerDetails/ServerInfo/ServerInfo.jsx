import React from 'react';
import ServerInfoBoxOne from "./ServerInfoBox/ServerInfoBoxOne";
import ServerInfoBoxTwo from "./ServerInfoBox/ServerInfoBoxTwo";
import ServerInfoGroups from "./ServerInfoGroups/ServerInfoGroups";
import ServerInfoProjects from "./ServerInfoProjects/ServerInfoProjects";

const ServerInfo = ({server, projectsData}) => {
    return (
        <div>
            <ServerInfoBoxOne server={server}/>
            <ServerInfoBoxTwo server={server}/>
            <ServerInfoGroups server={server}/>
            <ServerInfoProjects server={server} projectsData={projectsData}/>
        </div>
    );
};

export default ServerInfo;