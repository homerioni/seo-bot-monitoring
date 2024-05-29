import React, {useState} from 'react';
import s from './RecipientForm.module.scss';
import RecipientFormHeader from "./RecipientFormHeader/RecipientFormHeader";
import RecipientFormItem from "./RecipientFormItem/RecipientFormItem";
import TextAddBtn from "../../../../UI/Buttons/TextAddBtn/TextAddBtn";

const RecipientForm = ({thread}) => {
    const [recipients, setRecipients] = useState(thread.servers?.length ? thread.servers : [null]);

    return (
        <>
            <div className={s.title}>
                <p>Принимающие серверы</p>
                {thread?.id ? '' : <span>Чтобы добавить сервер, заполните и сохраните настройки</span>}
            </div>
            {thread?.id ?
                <>
                    <RecipientFormHeader/>
                    <div className={s.form}>
                        <TextAddBtn onClick={() => setRecipients(prev => [...prev, null])} className={s.addBtn} text={'Еще один сервер'}/>
                        {recipients.map((item, i) =>
                            <RecipientFormItem key={item ? item.recipientId : i} thread={thread} data={item} index={i} recipients={recipients} setRecipients={setRecipients}/>
                        )}
                    </div>
                </> : ''}
        </>
    );
};

export default RecipientForm;