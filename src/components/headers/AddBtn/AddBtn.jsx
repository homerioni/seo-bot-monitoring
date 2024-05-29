import React from 'react';
import s from './AddBtn.module.scss';

const AddBtn = ({children, ...props}) => {
    return (
        <button type='button' className={`${s.main} ${children ? s.children : ''}`} {...props}>
            {children}
        </button>
    );
};

export default AddBtn;