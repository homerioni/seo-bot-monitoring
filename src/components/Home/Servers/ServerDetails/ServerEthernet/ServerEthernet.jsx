import React, {useContext, useState} from 'react';
import EthernetHeader from "./EthernetHeader/EthernetHeader";
import EthernetTabs from "./EthernetTabs/EthernetTabs";
import EthernetAddBox from "./EthernetAddBox/EthernetAddBox";
import {useQuery, useQueryClient} from "react-query";
import {PMService} from "../../../../../API/PMService";
import {AlertContext} from "../../../../../App";

const ServerEthernet = ({token, serverId}) => {
    const queryClient = useQueryClient();
    const addAlert = useContext(AlertContext);
    const [isCreate, setIsCreate] = useState(false);
    const testSettings = useQuery(`testSettings${token}`, () => PMService.testConnection.getSetting(token), {onError: () => {}});

    return (
        <div>
            <EthernetAddBox setIsCreate={setIsCreate} isVisible={!isCreate && !testSettings.data}/>
            <EthernetHeader testSettings={testSettings.data?.result} serverId={serverId} queryClient={queryClient} addAlert={addAlert} token={token}/>
            {testSettings.data?.result ? <EthernetTabs testSettings={testSettings}/> : ''}
        </div>
    );
};

export default ServerEthernet;