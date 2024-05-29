import React from 'react';
import s from './GroupFormText.module.scss';

const GroupFormText = ({register}) => {
    return (
        <div className={s.main}>
            <div className={s.titleBox}>
                <p>Название</p>
                <div className={s.tooltip}>
                    <p>Наименование группы серверов.</p>
                </div>
            </div>
            <label className={s.label}>
                <input {...register('name', {required: 'Обязательное поле'})}/>
            </label>
        </div>
    );
};

export default GroupFormText;