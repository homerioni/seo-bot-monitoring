import React from 'react';
import s from "./ThreadFolder.module.scss";

const ThreadFolderEdit = ({onClick}) => {
    return (
        <button className={`${s.btn} ${s.edit}`} onClick={onClick}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.08876 1.00474L0.866469 7.22594C0.626689 7.46568 0.398907 7.93317 0.350951 8.2688L0.015261 10.6422C-0.104629 11.5053 0.494815 12.1046 1.35802 11.9847L3.73182 11.6491C4.06751 11.6012 4.53511 11.3734 4.77489 11.1337L10.9972 4.91247C12.0642 3.84563 12.5797 2.599 10.9972 1.01673C9.41463 -0.577532 8.16777 -0.07408 7.08876 1.00474Z" fill="#8B98EE"/>
                <path d="M6 2.25C6.50769 4.06154 7.92692 5.49231 9.75 6" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Редактировать</span>
        </button>
    );
};

export default ThreadFolderEdit;