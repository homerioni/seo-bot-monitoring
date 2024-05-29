import React from 'react';
import s from './Header.module.scss';
import AddBtn from "./AddBtn/AddBtn";
import SearchInput from "./SearchInput/SearchInput";
import SettingBtn from "./SettingBtn/SettingBtn";

const PumpingServersHeader = () => {
    return (
        <div className={s.main}>
            <div>
                <AddBtn/>
                <div>
                    <p className={s.title}>
                        <span>Сервера прокачки</span>
                        <sup>16</sup>
                    </p>
                </div>
            </div>
            <div>
                <SearchInput/>
                <SettingBtn/>
            </div>
        </div>
    );
};

export default PumpingServersHeader;