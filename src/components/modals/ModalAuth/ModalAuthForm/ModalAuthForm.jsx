import React from 'react';
import s from './ModalAuthForm.module.scss';
import InputText from "../../../UI/Form/InputText/InputText";

const ModalAuthForm = ({register}) => {
    return (
        <div className={s.content}>
            <div>
                <InputText register={{...register('login', {required: 'Обязательное поле'})}} title={'Логин'}/>
            </div>
            <div>
                <InputText register={{...register('password', {required: 'Обязательное поле'})}} type={'password'} title={'Пароль'}/>
            </div>
        </div>
    );
};

export default ModalAuthForm;