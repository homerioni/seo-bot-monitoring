import React, {useState} from 'react';
import ModalNetworkOptions from "./ModalNetworkOptions";
import ModalRouter from "./ModalRouter/ModalRouter";
import ModalRoot from "./ModalRoot/ModalRoot";

const ModalNetwork = ({setModalNetwork, servers, data, type}) => {
    const [modalOptions, setModalOptions] = useState(!type);
    const [modalRouter, setModalRouter] = useState(type === 'ROUTER');
    const [modalRoot, setModalRoot] = useState(type === 'ROOT');

    return (
        <>
            {modalOptions && <ModalNetworkOptions setModalNetwork={setModalNetwork}
                                                  setModalOptions={setModalOptions}
                                                  setModalRouter={setModalRouter}
                                                  setModalRoot={setModalRoot}/>}
            {modalRouter && <ModalRouter data={data} servers={servers} setModalNetwork={setModalNetwork}/>}
            {modalRoot && <ModalRoot data={data} servers={servers} setModalNetwork={setModalNetwork}/>}
        </>
    );
};

export default ModalNetwork;