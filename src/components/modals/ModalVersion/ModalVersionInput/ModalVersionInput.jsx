import React from 'react';
import s from './ModalVersionInput.module.scss';

const ModalVersionInput = ({register}) => {
    return (
        <div className={s.main}>
            <div className={s.titleBox}>
                <p className={s.title}>Название версии*</p>
            </div>
            <label className={s.label}>
                <input {...register('versionName', {required: 'Обязательное поле'})}/>
            </label>
        </div>
    );
};

export default ModalVersionInput;