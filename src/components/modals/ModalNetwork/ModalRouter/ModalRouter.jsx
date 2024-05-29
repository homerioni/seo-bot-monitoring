import React from 'react';
import s from './ModalRouter.module.scss';
import Modal from "../../Modal";
import ModalNetworkHeader from "../ModalNetworkHeader/ModalNetworkHeader";
import ModalRouterForm from "./ModalRouterForm/ModalRouterForm";
import Loading from "../../../UI/Loading/Loading";

const ModalRouter = ({data, servers, setModalNetwork}) => {
    const onClose = () => setModalNetwork({isOpen: false});

    return (
        <Modal containerClass={s.container} onClose={onClose}>
            <ModalNetworkHeader title={data ? `Редактирование <b>${data.name}</b>` : 'Создание нового роутера'} isEdit={!!data}/>
            {servers.isLoading ?
                <Loading/>
                :
                <ModalRouterForm data={data} servers={servers} setModalNetwork={setModalNetwork}/>}
        </Modal>
    );
};

export default ModalRouter;