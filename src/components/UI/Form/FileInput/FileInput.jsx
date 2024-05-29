import React, {useState} from 'react';
import s from './FileInput.module.scss';
import TitleLabel from "../TitleLabel/TitleLabel";

const FileInput = ({className, title, tooltip, register, error, placeholder, defaultData}) => {
    const [value, setValue] = useState(defaultData ?? '');

    const onFile = e => {
        return setValue(e.target.files ? e.target.files[0]?.name : 'Не удалось отобразить имя файла!');
    };

    return (
        <div className={`${s.main} ${className}`}>
            {title ? <TitleLabel title={title} tooltip={tooltip}/> : ''}
            <div className={s.content}>
                <div className={s.labelBox}>
                    <div className={`${s.label} ${error ? s.error : ''}`}>
                        <p>{value}</p>
                        {error ? <span className={s.errorText}>{error}</span> : ''}
                    </div>
                </div>
                <label className={s.btn}>
                    <input type={'file'} {...register} placeholder={placeholder} onInput={onFile}/>
                    <span>Выбрать</span>
                </label>
            </div>
        </div>
    );
};

export default FileInput;