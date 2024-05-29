import React from 'react';
import s from './SearchInput.module.scss';

const SearchInput = ({placeholder = 'Поиск...', searchData, setSearchData, onKeyUp, iconClick}) => {
    return (
        <label className={s.main}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={iconClick}>
                <path d="M10.0833 17.4167C14.1334 17.4167 17.4167 14.1334 17.4167 10.0833C17.4167 6.03325 14.1334 2.75 10.0833 2.75C6.03325 2.75 2.75 6.03325 2.75 10.0833C2.75 14.1334 6.03325 17.4167 10.0833 17.4167Z" stroke="#505050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.2512 19.2501L15.2637 15.2626" stroke="#505050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input placeholder={placeholder} value={searchData} onChange={e => setSearchData(e.target.value)} onKeyUp={onKeyUp}/>
        </label>
    );
};

export default SearchInput;