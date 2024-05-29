import React from 'react';
import s from './ModalXml.module.scss';
import Modal from "../Modal";
import ModalXmlHeader from "./ModalXmlHeader/ModalXmlHeader";
import ModalXmlForm from "./ModalXmlForm/ModalXmlForm";

const ModalXml = ({setModalXml, data}) => {
    return (
        <Modal containerClass={s.container} onClose={() => setModalXml({isOpen: false})}>
            <ModalXmlHeader data={data}/>
            <ModalXmlForm setModalXml={setModalXml} data={data}/>
        </Modal>
    );
};

export default ModalXml;