import React from 'react';
import {Background, ConnectionMode, Controls, MiniMap, ReactFlow} from "reactflow";
import s from './DashboardComFlow.module.scss';
import ComServerInfo from "../../../Communication/ComServerInfo/ComServerInfo";

const DashboardComFlow = ({nodes, edges, onEdgesChange, onNodesChange, nodeTypes, onConnect, projectsData, selectedServer, setOpenServerId}) => {
    return (
        <div className={s.main}>
            <ReactFlow nodes={nodes}
                       edges={edges}
                       onNodesChange={onNodesChange}
                       onEdgesChange={onEdgesChange}
                       onConnect={onConnect}
                       nodeTypes={nodeTypes}
                       defaultViewport={{x: 0, y: 0, zoom: 1}}
                       fitView={true}
                       onInit={flow => flow}
                       connectionLineStyle={{stroke: '#aaa'}}
                       connectionLineType={'straight'}
                       connectionMode={ConnectionMode.Loose}
                       nodesDraggable={false}
                       nodesConnectable={false}
                       snapToGrid={true}
                       snapGrid={[20, 20]}
                       className={s.flow}>
                <Background/>
                <Controls showInteractive={false}/>
                <MiniMap/>
                {selectedServer &&
                    <ComServerInfo selectedServer={selectedServer} setOpenServerId={setOpenServerId} projectsData={projectsData}/>}
            </ReactFlow>
        </div>
    );
};

export default DashboardComFlow;