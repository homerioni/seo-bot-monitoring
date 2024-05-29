import React, {useState} from 'react';
import s from './ModalGroup.module.scss';
import Modal from "../Modal";
import ModalGroupTitle from "./ModalGroupTitle/ModalGroupTitle";
import GroupForm from "./GroupForm/GroupForm";

const ModalGroup = ({setModalGroup, data, servers}) => {
    const [isClose, setIsClose] = useState(false);

    return (
        <Modal containerClass={s.container} onClose={() => setModalGroup({isOpen: false})} close={isClose}>
            <ModalGroupTitle data={data}/>
            <GroupForm data={data} setModalGroup={setModalGroup} servers={servers} setIsClose={setIsClose}/>
        </Modal>
    );
};

export default ModalGroup;