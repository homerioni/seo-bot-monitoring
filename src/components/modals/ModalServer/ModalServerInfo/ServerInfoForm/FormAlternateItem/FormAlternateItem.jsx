import React from 'react';
import s from './FormAlternateItem.module.scss';

const FormAlternateItem = ({className}) => {
    return (
        <div className={className}>
            <div className={s.titleBox}>
                <p>альтернатива</p>
                <p>основной порт</p>
                <p>порт 2</p>
            </div>
            <div className={s.labelBox}>
                <label className={s.switchBtn} style={{cursor: 'not-allowed'}}>
                    <input type="checkbox" disabled style={{cursor: 'not-allowed'}}/>
                </label>
                <label className={s.label} style={{cursor: 'not-allowed'}}>
                    <input placeholder="400" type="number" disabled style={{cursor: 'not-allowed'}}/>
                </label>
                <label className={s.label} style={{cursor: 'not-allowed'}}>
                    <input placeholder="80" type="number" disabled style={{cursor: 'not-allowed'}}/>
                </label>
            </div>
        </div>
    );
};

export default FormAlternateItem;