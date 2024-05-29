import React from 'react';
import s from './Header.module.scss';
import icon1 from '../../../../../assets/img/pumping-icon1.svg';
import icon2 from '../../../../../assets/img/pumping-icon2.svg';
import icon3 from '../../../../../assets/img/pumping-icon3.svg';

const Header = ({rangeData}) => {
    return (
        <div className={s.header}>
            <div className={s.titleBox}>
                <p className={s.title}>Просмотрено сайтов</p>
                <p className={s.subTitle}>
                    <span>профили </span>
                    <span className={s.gray}>/ просмотры</span>
                </p>
            </div>
            <div className={s.infoBox}>
                <p>
                    <img src={icon1} alt=""/>
                    <span>{rangeData?.numberOfProfiles}</span>
                </p>
                <p>
                    <img src={icon2} alt=""/>
                    <span>{rangeData?.avgOfVisitedSites}</span>
                </p>
                <p>
                    <img src={icon3} alt=""/>
                    <span>{rangeData?.sumOfSkips}</span>
                </p>
            </div>
        </div>
    );
};

export default Header;