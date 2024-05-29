import React from 'react';
import s from './EthernetHeader.module.scss';
import EthernetHeaderTitle from "./EthernetHeaderTitle/EthernetHeaderTitle";
import EthernetHeaderInfo from "./EthernetHeaderInfo/EthernetHeaderInfo";

const EthernetHeader = ({testSettings, serverId, addAlert, queryClient, token}) => {
    return (
        <div className={s.main}>
            <EthernetHeaderTitle testSettings={testSettings} addAlert={addAlert} queryClient={queryClient} token={token}/>
            <EthernetHeaderInfo testSettings={testSettings} serverId={serverId} addAlert={addAlert} queryClient={queryClient} token={token}/>
        </div>
    );
};

export default EthernetHeader;