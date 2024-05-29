import React, {useState} from 'react';
import s from './RecipientSubmitBtn.module.scss';
import Loading from "../../../../../../../UI/Loading/Loading";

const RecipientSubmitBtn = ({isDirty, isNew, isLoading}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button type="button" className={`${s.btn} ${isNew ? s.new : ''} ${!isDirty ? s.submitted : ''}`} onClick={() => setIsOpen(true)}>
                {isNew ?
                    <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.3109 5.09636C14.3192 4.79886 13.2284 4.60052 11.9987 4.60052C6.5247 4.60052 2.08203 9.04319 2.08203 14.5172C2.08203 19.9912 6.5247 24.4339 11.9987 24.4339C17.4727 24.4339 21.9154 19.9912 21.9154 14.5172C21.9154 13.2891 21.6932 12.1183 21.2875 11.035" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.722 5.37387L13.4297 1.58569" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.7188 5.37402L12.8711 8.19035" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    :
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                }
            </button>
            <div className={`${s.sureBox} ${isOpen ? s.show : ''}`}>
                <div className={s.sureContent}>
                    <p className={s.sureText}>Сохранить изменения?</p>
                    <button type="submit" className={s.sureBtn} onClick={() => setIsOpen(false)}>
                        {isLoading ? <Loading/> : ''}
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6.00366L9 17.0037L4 12.0037" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Да</span>
                    </button>
                    <button type="button" className={s.sureCancel} onClick={() => setIsOpen(false)}>
                        <span>Отмена</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default RecipientSubmitBtn;