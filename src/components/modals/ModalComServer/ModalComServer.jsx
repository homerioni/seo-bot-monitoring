import React from 'react';
import s from './ModalComServer.module.scss';
import Modal from "../Modal";
import ModalComServerTitle from "./ModalComServerTitle/ModalComServerTitle";
import ModalComServerForm from "./ModalComServerForm/ModalComServerForm";

const ModalComServer = ({setModalComServer, servers, setServerId, serverId}) => {
    const onClose = () => setModalComServer({isOpen: false});

    return (
        <Modal containerClass={s.container} onClose={onClose}>
            <ModalComServerTitle serverId={serverId}/>
            <ModalComServerForm servers={servers} setServerId={setServerId} onClose={onClose} serverId={serverId}/>
        </Modal>
    );
};

export default ModalComServer;