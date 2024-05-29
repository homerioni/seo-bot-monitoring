import React from 'react';
import EthernetContentHeader from "./EthernetContentHeader/EthernetContentHeader";
import EthernetContentItems from "./EthernetContentItems/EthernetContentItems";

const EthernetContent = ({activeTime, setActiveTime, filteredStatistic}) => {
    return (
        <div>
            <EthernetContentHeader filteredStatistic={filteredStatistic}/>
            <EthernetContentItems activeTime={activeTime} setActiveTime={setActiveTime} filteredStatistic={filteredStatistic}/>
        </div>
    );
};

export default EthernetContent;