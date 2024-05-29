import React, {useCallback, useEffect, useMemo, useState} from 'react';
import s from './DashboardCom.module.scss';
import {addEdge, useEdgesState, useNodesState, useReactFlow} from "reactflow";
import LocationNodeType from "../../Communication/nodesType/LocationNodeType";
import routerNodeType from "../../Communication/nodesType/RouterNodeType";
import microticNodeType from "../../Communication/nodesType/MicroticNodeType";
import switchNodeType from "../../Communication/nodesType/SwitchNodeType";
import serverNodeType from "../../Communication/nodesType/ServerNodeType";
import TableNodeType from "../../Communication/nodesType/TableNodeType/TableNodeType";
import {useForm} from "react-hook-form";
import DashboardComFlow from "./DashboardComFlow/DashboardComFlow";
import DashboardComHeader from "./DashboardComHeader/DashboardComHeader";

const nodeTypes = {location: LocationNodeType, router: routerNodeType, micro: microticNodeType, switch: switchNodeType, server: serverNodeType, table: TableNodeType};

const DashboardCom = ({servers, projects, locations}) => {
    const [locId, setLocId] = useState(6);
    const {fitView} = useReactFlow();
    const [openServerId, setOpenServerId] = useState(null);
    const [projectsData, setProjectsData] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {register, unregister, watch, setValue, reset} = useForm({
        mode: 'onChange',
        defaultValues: '',
    });

    const location = useMemo(() => {
        const thisData = locations.data?.result.find(loc => loc.id == locId);
        if (thisData?.jsonScheme) {
            const jsonScheme = JSON.parse(thisData.jsonScheme);
            return {...thisData, jsonScheme};
        }
        return thisData;
    }, [locId, locations.data]);

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

    useEffect(() => {
        if (location?.jsonScheme) {
            location.jsonScheme.nodes.map(node => {
                node.data.register = register;
                node.data.unregister = unregister;
                node.data.disabled = true;
                if (node.type === 'table') {
                    node.data.watch = watch;
                    node.data.setValue = setValue;
                }
                if (node.type === 'server') {
                    node.data.watch = watch;
                    node.data.setValue = setValue;
                    node.data.setOpenServerId = setOpenServerId;
                }
            });
            reset(location?.jsonScheme?.form);
            setNodes(location?.jsonScheme?.nodes);
            setEdges(location?.jsonScheme?.edges);
        } else {
            reset();
            setNodes([]);
            setEdges([]);
        }
        const t = setTimeout(() => {
            fitView(true);
            clearTimeout(t);
        }, 100);
    }, [location, servers, locId]);

    useEffect(() => {
        setNodes(prev => prev?.length ? prev.map(node => {
            if (node.type === 'server') return {...node, data: {...node.data, servers}};
            return node;
        }) : []);
    }, [servers, locId]);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => addEdge({...params, type: 'smoothstep', style: {stroke: '#aaa'}}, eds)),
        []);

    return (
        <div className={s.main}>
            <DashboardComHeader locations={locations} setLocId={setLocId} locId={locId}/>
            <DashboardComFlow nodes={nodes}
                              edges={edges}
                              onNodesChange={onNodesChange}
                              onEdgesChange={onEdgesChange}
                              nodeTypes={nodeTypes}
                              onConnect={onConnect}
                              projectsData={projectsData}
                              selectedServer={servers.data?.result.find(server => server.id == openServerId)}
                              setOpenServerId={setOpenServerId}/>
        </div>
    );
};

export default DashboardCom;