import React from 'react';
import s from './FiltersItem.module.scss';

const FiltersItem = ({checkboxes, title, register}) => {
    return (
        <div className={s.main}>
            <p className={s.title}>{title}</p>
            <div className={s.form}>
                {checkboxes?.map((item, i) => (
                    <label key={i} className={s.label}>
                        <input {...register} type="checkbox" value={item.value}/>
                        <span className={s.checkbox}/>
                        <span>{item.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FiltersItem;