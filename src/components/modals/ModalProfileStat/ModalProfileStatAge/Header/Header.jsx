import React from 'react';
import s from './Header.module.scss';
import icon1 from '../../../../../assets/img/pumping-icon4.svg';

const Header = ({average}) => {
    return (
        <div className={s.header}>
            <div className={s.titleBox}>
                <p className={s.title}>Возраст</p>
                <p className={s.subTitle}>
                    <span>профили </span>
                    <span className={s.gray}>/ просмотры</span>
                </p>
            </div>
            <div className={s.infoBox}>
                <img src={icon1} alt=""/>
                <span>{average} дней</span>
            </div>
        </div>
    );
};

export default Header;