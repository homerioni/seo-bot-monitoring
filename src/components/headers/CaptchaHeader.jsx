import React from 'react';
import s from './Header.module.scss';
import AddBtn from "./AddBtn/AddBtn";
import StatServers from "./StatServers/StatServers";
import SearchInput from "./SearchInput/SearchInput";

const CaptchaHeader = ({searchData, setSearchData, captchaServers, setModalCaptcha}) => {
    return (
        <div className={s.main}>
            <div>
                <AddBtn onClick={() => setModalCaptcha({isOpen: true})}/>
                <div className={s.titleBox}>
                    <p className={s.title}>
                        <span>Все серверы антикапчи</span>
                        <sup>{captchaServers.data?.result.length}</sup>
                    </p>
                    <StatServers serversData={captchaServers.data?.result} captcha={true}/>
                </div>
            </div>
            <div>
                <SearchInput placeholder='Поиск по IP, названию...' setSearchData={setSearchData} searchData={searchData}/>
            </div>
        </div>
    );
};

export default CaptchaHeader;