import React, {useState} from 'react';
import s from './ProfStatFilterItem.module.scss';

const ProfStatFilterItem = ({checkboxes, title, register}) => {
    const [inputVal, setInputVal] = useState('');
    return (
        <div className={s.main}>
            <p className={s.title}>{title}</p>
            <div className={s.form}>
                {checkboxes?.map((item, i) => (
                    <label key={i} className={s.label}>
                        <input {...register} type="radio" value={item.value}/>
                        <span className={s.checkbox}/>
                        <span>{item.name}</span>
                    </label>
                ))}
                <label className={s.label}>
                    <input {...register} type="radio" value={inputVal}/>
                    <span className={s.checkbox}/>
                    <span className={s.textInput}>
                        <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}/>
                    </span>
                </label>
            </div>
        </div>
    );
};

export default ProfStatFilterItem;