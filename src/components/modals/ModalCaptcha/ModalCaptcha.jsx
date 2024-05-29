import React from 'react';
import s from './ModalCaptcha.module.scss';
import Modal from "../Modal";
import ModalCaptchaHeader from "./ModalCaptchaHeader/ModalCaptchaHeader";
import ModalCaptchaForm from "./ModalCaptchaForm/ModalCaptchaForm";

const ModalCaptcha = ({setModalCaptcha, data}) => {
    return (
        <Modal containerClass={s.container} onClose={() => setModalCaptcha({isOpen: false})}>
            <ModalCaptchaHeader title={data?.name ? `Редактировать ${data?.name}` : 'Новый сервер антикапчи'} isEdit={!!data}/>
            <ModalCaptchaForm data={data} setModalCaptcha={setModalCaptcha}/>
        </Modal>
    );
};

export default ModalCaptcha;