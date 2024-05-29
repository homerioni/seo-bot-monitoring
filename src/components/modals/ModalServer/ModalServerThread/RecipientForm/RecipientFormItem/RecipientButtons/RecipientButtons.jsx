import React from 'react';
import s from './RecipientButtons.module.scss';
import RecipientSwitchBtn from "./SwitchBtn/RecipientSwitchBtn";
import RecipientSubmitBtn from "./SubmitBtn/RecipientSubmitBtn";
import RecipientDelBtn from "./DelBtn/RecipientDelBtn";

const RecipientButtons = ({isValid, isDirty, data, threadId, setRecipients, index, isLoading}) => {
    return (
        <div className={s.main}>
            {data?.recipientId ? <RecipientSwitchBtn threadId={threadId} data={data}/> : ''}
            {data?.recipientId || isValid ? <RecipientSubmitBtn isDirty={isDirty} isNew={!data?.recipientId} isLoading={isLoading}/> : ''}
            <RecipientDelBtn threadId={threadId} data={data} setRecipients={setRecipients} index={index}/>
        </div>
    );
};

export default RecipientButtons;