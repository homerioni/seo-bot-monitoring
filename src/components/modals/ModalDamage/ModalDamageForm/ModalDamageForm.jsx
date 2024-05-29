import React from 'react';
import s from './ModalDamageForm.module.scss';
import InputText from "../../../UI/Form/InputText/InputText";

const ModalDamageForm = ({register, number, name}) => {
    return (
        <div className={s.content}>
            <div className={s.flex}>
                <div className={s.number}>{number}</div>
                <label className={s.label} style={{cursor: 'not-allowed'}}>
                    <input value={name} style={{cursor: 'not-allowed'}} disabled/>
                </label>
            </div>
            <div>
                <InputText register={{...register('warmup')}} title={'директория с “запчастями”'}/>
            </div>
        </div>
    );
};

export default ModalDamageForm;