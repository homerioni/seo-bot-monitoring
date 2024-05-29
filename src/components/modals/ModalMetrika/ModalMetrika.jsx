import React from 'react';
import s from './ModalMetrika.module.scss';
import Modal from "../Modal";
import ModalMetrikaHeader from "./ModalMetrikaHeader/ModalMetrikaHeader";
import ModalMetrikaForm from "./ModalMetrikaForm/ModalMetrikaForm";

const ModalMetrika = ({setModalMetrika, data}) => {
    return (
        <Modal containerClass={s.container} onClose={() => setModalMetrika({isOpen: false})}>
            <ModalMetrikaHeader data={data}/>
            <ModalMetrikaForm setModalMetrika={setModalMetrika} data={data}/>
        </Modal>
    );
};

export default ModalMetrika;