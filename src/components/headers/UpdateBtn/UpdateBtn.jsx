import React from 'react';
import s from './UpdateBtn.module.scss';

const UpdateBtn = ({color, text, onClick}) => {
    return (
        <button type="button" className={`${s.main} ${s[color]}`} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
                <rect width="47" height="47" rx="23.5" fill="#A5DC79"/>
                <rect x="6" y="6" width="35" height="35" rx="17.5" fill="#BFE99F"/>
                <path d="M30.6663 23C30.6663 26.68 27.6797 29.6667 23.9997 29.6667C20.3197 29.6667 18.073 25.96 18.073 25.96M18.073 25.96H21.0863M18.073 25.96V29.2933M17.333 23C17.333 19.32 20.293 16.3333 23.9997 16.3333C28.4463 16.3333 30.6663 20.04 30.6663 20.04M30.6663 20.04V16.7067M30.6663 20.04H27.7063" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{text}</span>
        </button>
    );
};

export default UpdateBtn;