import React from 'react';
import s from "./SwitchBtn.module.scss";

const SwitchBtn = ({active, isBgGray, onClick, ...props}) => {
    return (
        <>
            <button
                type="button"
                className={`${s.switchBtn} ${active !== undefined ? (active ? s.active : s.disable) : ''} ${isBgGray ? s.gray : ''}`}
                {...props}
                onClick={onClick}
            />
        </>
    );
};

export default SwitchBtn;