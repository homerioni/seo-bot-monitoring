import React from 'react';
import {Handle, Position} from "reactflow";

const HandleBox = ({id}) => {
    return (
        <>
            <Handle type="source" position={Position.Top} id={id + 'Top'} />
            <Handle type="source" position={Position.Bottom} id={id + 'Bottom'} />
            <Handle type="source" position={Position.Left} id={id + 'Left'} />
            <Handle type="source" position={Position.Right} id={id + 'Right'} />
        </>
    );
};

export default HandleBox;