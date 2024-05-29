import React from 'react';
import PumpingServersHeader from "../components/headers/PumpingServersHeader";
import PumpingServers from "../components/PumpingServers/PumpingServers";

const PumpingServersPage = () => {
    return (
        <div className='main-content-box full'>
            <PumpingServersHeader/>
            <div className='main-content'>
                <PumpingServers/>
            </div>
        </div>
    );
};

export default PumpingServersPage;