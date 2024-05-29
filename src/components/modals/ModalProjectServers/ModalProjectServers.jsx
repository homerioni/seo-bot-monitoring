import React from 'react';
import s from './ModalProjectServers.module.scss';
import Modal from "../Modal";
import ModalProjectServerTitle from "./ModalProjectServerTitle/ModalProjectServerTitle";
import ModalProjectServerForm from "./ModalProjectServerForm/ModalProjectServerForm";

const ModalProjectServers = ({setModalProjectServers, servers, setter, selectedServers, data}) => {
    const onClose = () => setModalProjectServers({isOpen: false});

    return (
        <Modal containerClass={s.container} onClose={onClose}>
            <ModalProjectServerTitle data={data}/>
            <ModalProjectServerForm servers={servers} setter={setter} onClose={onClose} selectedServers={selectedServers} data={data}/>
        </Modal>
    );
};

export default ModalProjectServers;