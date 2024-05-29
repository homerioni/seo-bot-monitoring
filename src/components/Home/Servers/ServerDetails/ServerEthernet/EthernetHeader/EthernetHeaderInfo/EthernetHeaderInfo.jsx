import React from 'react';
import EthernetHeaderInfoStates from "./EthernetHeaderInfoStates/EthernetHeaderInfoStates";
import EthernetFormIp from "./EthernetFormIp";
import EthernetFormTime from "./EthernetFormTime";

const EthernetHeaderInfo = ({testSettings, serverId, addAlert, queryClient, token}) => {
    return (
        <div>
            <EthernetFormIp testSettings={testSettings} serverId={serverId} queryClient={queryClient} addAlert={addAlert} token={token}/>
            {testSettings ? <EthernetFormTime testSettings={testSettings} queryClient={queryClient} addAlert={addAlert} token={token}/> : ''}
            <EthernetHeaderInfoStates/>
        </div>
    );
};

export default EthernetHeaderInfo;