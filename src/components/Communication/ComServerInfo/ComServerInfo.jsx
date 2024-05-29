import React from 'react';
import s from './ComServerInfo.module.scss';
import {Panel} from "reactflow";
import {useQuery} from "react-query";
import {PMService} from "../../../API/PMService";
import ComServerInfoHeader from "./ComServerInfoHeader/ComServerInfoHeader";
import ComServerInfoDesc from "./ComServerInfoDesc/ComServerInfoDesc";
import ComServerInfoGroups from "./ComServerInfoGroups/ComServerInfoGroups";
import ComServerInfoProjects from "./ComServerInfoProjects/ComServerInfoProjects";
import ComServerInfoThreads from "./ComServerInfoThreads/ComServerInfoThreads";

const ComServerInfo = ({selectedServer, setOpenServerId, projectsData}) => {
    const threads = useQuery(`threads${selectedServer.id}`,
        () => selectedServer?.modes?.length ? PMService.settings.getAllById(selectedServer.id) : false,
        {
            onError: () => {},
            onSuccess: resp => {
                let isSentActive = false;
                resp.result?.forEach(thread => thread.isActive ? isSentActive = true : '');
            }
        });

    return (
        <Panel position={'top-left'} className={s.panel}>
            <div className={s.main}>
                <ComServerInfoHeader selectedServer={selectedServer} setOpenServerId={setOpenServerId}/>
                <ComServerInfoDesc selectedServer={selectedServer}/>
                <ComServerInfoGroups selectedServer={selectedServer}/>
                <ComServerInfoProjects selectedServer={selectedServer} projectsData={projectsData}/>
                <ComServerInfoThreads threads={threads}/>
            </div>
        </Panel>
    );
};

export default ComServerInfo;