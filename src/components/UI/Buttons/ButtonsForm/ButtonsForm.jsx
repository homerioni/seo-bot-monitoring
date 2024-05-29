import React from 'react';
import s from './ButtonsForm.module.scss';
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import CancelBtn from "../CancelBtn/CancelBtn";

const ButtonsForm = ({className, isValid, isSaved, isLoading, type, submitText, CancelText, cancelClick}) => {
    return (
        <div className={className ?? s.main}>
            <SubmitBtn isValid={isValid} isSaved={isSaved} isLoading={isLoading} type={type} text={submitText}/>
            <CancelBtn text={CancelText} onClick={cancelClick}/>
        </div>
    );
};

export default ButtonsForm;