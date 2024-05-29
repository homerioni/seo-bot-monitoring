import React from 'react';
import s from './ModalLocationContentForm.module.scss';
import InputText from "../../../../UI/Form/InputText/InputText";
import DelBtnForInput from "../../../../UI/Buttons/DelBtnForInput/DelBtnForInput";

const ModalLocationContentForm = () => {
    return (
        <div className={s.main}>
            <InputText title='Название*' className={s.flex25} disabled={true}/>
            <InputText title='ip-адрес*' className={s.flex25} disabled={true}/>
            <InputText title='логин*' className={s.flex25} disabled={true}/>
            <InputText title='пароль*' className={s.flex25} disabled={true}/>
            <DelBtnForInput className={s.delBtn}/>
        </div>
    );
};

export default ModalLocationContentForm;