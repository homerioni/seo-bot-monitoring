import React from 'react';
import s from './FiltersBtn.module.scss';

const FiltersBtn = ({setIsOpenFilters}) => {
    return (
        <div className={s.main} onClick={() => setIsOpenFilters(prev => !prev)}>
            <p>Фильтр</p>
            <div className={s.icon}>
                <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.22363 17.8233V11.9352" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.22363 3.52338V0.999878" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.4766 17.8232V15.2997" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.4766 6.88804V0.999878" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.74719 5.20565V10.2526C6.74719 11.1779 6.32661 11.935 5.06486 11.935H3.38253C2.12078 11.935 1.7002 11.1779 1.7002 10.2526V5.20565C1.7002 4.28037 2.12078 3.52332 3.38253 3.52332H5.06486C6.32661 3.52332 6.74719 4.28037 6.74719 5.20565Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 8.57015V13.6171C16 14.5424 15.5794 15.2995 14.3177 15.2995H12.6353C11.3736 15.2995 10.953 14.5424 10.953 13.6171V8.57015C10.953 7.64487 11.3736 6.88782 12.6353 6.88782H14.3177C15.5794 6.88782 16 7.64487 16 8.57015Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
};

export default FiltersBtn;