import React from 'react';
import s from './EditBtn.module.scss';

const EditBtn = ({onClick, className}) => {
    return (
        <button className={className || s.main} onClick={onClick}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.45168 1.33965L1.15529 9.63459C0.835586 9.95424 0.531876 10.5776 0.467935 11.0251L0.020348 14.1896C-0.139505 15.3404 0.659753 16.1395 1.8107 15.9797L4.97576 15.5321C5.42335 15.4682 6.04682 15.1645 6.36652 14.8449L14.6629 6.54996C16.0856 5.12751 16.773 3.46533 14.6629 1.35563C12.5528 -0.770042 10.8904 -0.0987733 9.45168 1.33965Z" fill="#8B98EE"/>
                <path d="M8 3C8.67692 5.41538 10.5692 7.32308 13 8" stroke="#EEEFF5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    );
};

export default EditBtn;