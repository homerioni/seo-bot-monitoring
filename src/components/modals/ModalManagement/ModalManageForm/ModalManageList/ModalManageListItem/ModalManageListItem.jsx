import React from 'react';
import s from './ModalManageListItem.module.scss'
import FormTextarea from "../../../../../UI/Form/FormTextarea/FormTextarea";
import DelBtnForInput from "../../../../../UI/Buttons/DelBtnForInput/DelBtnForInput";

const mentionsData = [
    {
        value: '{poisk}',
        label: 'poisk',
    },
    {
        value: '{zapros}',
        label: 'zapros',
    },
    {
        value: '{site_url}',
        label: 'site_url',
    },
    {
        value: '{zapros_brand}',
        label: 'zapros_brand',
    },
    {
        value: '{max_str}',
        label: 'max_str',
    },
];

const ModalManageListItem = ({register, control, onDel, onSort, index}) => {
    return (
        <div className={s.main}>
            <FormTextarea classMain={s.textarea} classLabel={s.textareaLabel} register={{...register(`text[${index}]`)}} control={control} mentionsData={mentionsData}/>
            <div className={s.buttons}>
                <DelBtnForInput className={s.delBtn} onClick={() => onDel(index)}/>
                <button type='button' className={s.upBtn} onClick={() => onSort(index, -1)}>
                    <svg width="20px" height="18px" viewBox="0 0 20 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <path d="M0,9 L16,9" stroke='black'/>
                        <path d="M16,9 L7.93774223,0.937742233" stroke='black'/>
                        <path d="M16,9 L7.93774223,17.0622578" stroke='black'/>
                    </svg>
                </button>
                <button type='button' className={s.downBtn} onClick={() => onSort(index, 1)}>
                    <svg width="20px" height="18px" viewBox="0 0 20 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <path d="M0,9 L16,9" stroke='black'/>
                        <path d="M16,9 L7.93774223,0.937742233" stroke='black'/>
                        <path d="M16,9 L7.93774223,17.0622578" stroke='black'/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ModalManageListItem;
