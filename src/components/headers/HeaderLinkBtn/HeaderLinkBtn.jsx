import React from 'react';
import s from './HeaderLinkBtn.module.scss';
import {NavLink} from "react-router-dom";

const HeaderLinkBtn = ({url, text, icon}) => {
    return (
        <NavLink to={url} className={s.main}>
            {icon}
            <span>{text}</span>
        </NavLink>
    );
};

export default HeaderLinkBtn;