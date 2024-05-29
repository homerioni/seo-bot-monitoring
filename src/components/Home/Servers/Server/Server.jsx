import React, {useRef, useState} from 'react';
import s from './Server.module.scss';
import ServerDetails from "../ServerDetails/ServerDetails";
import ServerContent from "../ServerContent/ServerContent";
import {getServerOrder} from "../../../../utils/tools";
import {useToggleDropDownList} from "../../../../hooks/useToggleDropDownList";

const Server = ({server, projectsData, setModalConfirm, setModalLoadLogs, setModalDist, setModalServer, setModalDamage, locations}) => {
    const [isUpper, setIsUpper] = useState(false);
    const serverRef = useRef();
    const [isDetailsOpen, setIsDetailsOpen, isClosingDetails] = useToggleDropDownList(serverRef, 280);

    return (
        <div className={`${s.main} ${isDetailsOpen ? s.active : ''} ${isClosingDetails ? s.closing : ''} ${isUpper ? s.upper : ''}`} style={{order: getServerOrder(server)}} ref={serverRef}>
            <ServerContent onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                           server={server}
                           isDetailsOpen={isDetailsOpen}
                           setIsUpper={setIsUpper}
                           setModalConfirm={setModalConfirm}
                           setModalServer={setModalServer}/>
            {isDetailsOpen &&
                <ServerDetails server={server}
                               projectsData={projectsData}
                               setModalConfirm={setModalConfirm}
                               setModalLoadLogs={setModalLoadLogs}
                               setModalDist={setModalDist}
                               setModalDamage={setModalDamage}
                               isClosingDetails={isClosingDetails}
                />}
        </div>
    );
};

export default Server;