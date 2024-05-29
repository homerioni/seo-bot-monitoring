import React from 'react';
import 'reactflow/dist/style.css';
import s from './Communication.module.scss';
import {Background, ConnectionMode, Controls, MiniMap, ReactFlow} from "reactflow";
import PrintBtn from "./PrintBtn/PrintBtn";
import ComServerInfo from "./ComServerInfo/ComServerInfo";

const Communication = ({nodes, edges, onEdgesChange, onNodesChange, nodeTypes, onConnect, projectsData, selectedServer, setOpenServerId}) => {
    return (
        <>
            <ReactFlow nodes={nodes}
                       edges={edges}
                       onNodesChange={onNodesChange}
                       onEdgesChange={onEdgesChange}
                       onConnect={onConnect}
                       nodeTypes={nodeTypes}
                       defaultViewport={{x: 0, y: 0, zoom: 1}}
                       connectionLineStyle={{stroke: '#aaa'}}
                       connectionLineType={'straight'}
                       connectionMode={ConnectionMode.Loose}
                       snapToGrid={true}
                       snapGrid={[20, 20]}
                       className={s.flow}>
                <Background/>
                <Controls/>
                <MiniMap/>
                <PrintBtn/>
                {selectedServer &&
                    <ComServerInfo selectedServer={selectedServer} setOpenServerId={setOpenServerId} projectsData={projectsData}/>}
            </ReactFlow>
        </>
    );
};

export default Communication;