import React from 'react';
import s from './ModalRoot.module.scss';
import Modal from "../../Modal";
import Loading from "../../../UI/Loading/Loading";
import ModalNetworkHeader from "../ModalNetworkHeader/ModalNetworkHeader";
import ModalRootForm from "./ModalRootForm/ModalRootForm";

const ModalRoot = ({data, setModalNetwork, servers}) => {
    const onClose = () => setModalNetwork({isOpen: false});

    return (
        <Modal containerClass={s.container} onClose={onClose}>
            <ModalNetworkHeader title={data ? `Редактирование <b>${data.name}</b>` : 'Создание новой внутренней сети'} isEdit={!!data}/>
            {servers.isLoading ?
                <Loading/>
                :
                <ModalRootForm data={data} servers={servers} setModalNetwork={setModalNetwork}/>}
        </Modal>
    );
};

export default ModalRoot;