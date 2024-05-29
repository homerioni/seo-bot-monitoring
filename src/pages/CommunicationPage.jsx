import React, {useCallback, useEffect, useMemo, useState} from 'react';
import CommHeader from "../components/headers/CommHeader";
import Communication from "../components/Communication/Communication";
import LocationNodeType from "../components/Communication/nodesType/LocationNodeType";
import {addEdge, useEdgesState, useNodesState, useViewport} from "reactflow";
import routerNodeType from "../components/Communication/nodesType/RouterNodeType";
import microticNodeType from "../components/Communication/nodesType/MicroticNodeType";
import switchNodeType from "../components/Communication/nodesType/SwitchNodeType";
import serverNodeType from "../components/Communication/nodesType/ServerNodeType";
import ModalComServer from "../components/modals/ModalComServer/ModalComServer";
import TableNodeType from "../components/Communication/nodesType/TableNodeType/TableNodeType";
import {useParams} from "react-router";

let itemId = 1;
const getId = () => `${itemId++}`;
const setId = newId => itemId = newId ? newId : 1;
const nodeTypes = {location: LocationNodeType, router: routerNodeType, micro: microticNodeType, switch: switchNodeType, server: serverNodeType, table: TableNodeType};

const CommunicationPage = ({servers, projects, locations}) => {
    const {id} = useParams();
    const [modalComServer, setModalComServer] = useState({isOpen: false, setServerId: null, serverId: null});
    const [openServerId, setOpenServerId] = useState(null);
    const [projectsData, setProjectsData] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const viewportData = useViewport();

    const location = useMemo(() => {
        const thisData = locations.data?.result.find(loc => loc.id == id);
        if (thisData?.jsonScheme) {
            const jsonScheme = JSON.parse(thisData.jsonScheme);
            if (itemId < jsonScheme.lastId) setId(Number(jsonScheme.lastId) + 1);
            return {...thisData, jsonScheme};
        }
        return thisData;
    }, [id, locations.data]);

    useEffect(() => {
        setNodes(prev => prev?.length ? prev.map(node => {
            if (node.type === 'server') return {...node, data: {...node.data, servers}};
            return node;
        }) : []);
    }, [servers]);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => addEdge({...params, type: 'smoothstep', style: {stroke: '#aaa'}}, eds)),
        []);

    useEffect(() => {
        let data = {};
        projects.data?.result?.forEach(project => {
            project.settingResponse?.servers?.forEach(server => {
                if (data[server.serverId]) {
                    data[server.serverId].push({id: project.id, name: project.name});
                } else {
                    data[server.serverId] = [{id: project.id, name: project.name}];
                }
            });
        });
        setProjectsData(data);
    }, [projects]);

    return (
        <>
            <div className='main-content-box'>
                <CommHeader setNodes={setNodes}
                            setEdges={setEdges}
                            nodes={nodes}
                            edges={edges}
                            getId={getId}
                            viewportData={viewportData}
                            servers={servers}
                            location={location}
                            setModalComServer={setModalComServer}
                            setOpenServerId={setOpenServerId}/>
                <div className='main-content not-padding'>
                    <Communication nodes={nodes}
                                   edges={edges}
                                   onNodesChange={onNodesChange}
                                   onEdgesChange={onEdgesChange}
                                   onConnect={onConnect}
                                   nodeTypes={nodeTypes}
                                   projectsData={projectsData}
                                   selectedServer={servers.data?.result.find(server => server.id == openServerId)}
                                   setOpenServerId={setOpenServerId}/>
                </div>
            </div>
            {modalComServer.isOpen &&
                <ModalComServer servers={servers} setModalComServer={setModalComServer} setServerId={modalComServer.setServerId} serverId={modalComServer.serverId}/>}
        </>
    );
};

export default CommunicationPage;