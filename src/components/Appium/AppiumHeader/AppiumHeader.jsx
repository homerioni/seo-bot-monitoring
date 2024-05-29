import React from 'react';
import s from '../../headers/Header.module.scss';
import AddBtn from "../../headers/AddBtn/AddBtn";
import SearchInput from "../../headers/SearchInput/SearchInput";
import AppiumHeaderSelect from "./AppiumHeaderSelect/AppiumHeaderSelect";

const AppiumHeader = ({serviceActive, setServiceActive}) => {
    return (
        <div className={s.main}>
            <div>
                <AddBtn/>
                <div>
                    <p className={s.title}>
                        <span>Серверы и смартфоны</span>
                        <sup>16 / 12</sup>
                    </p>
                </div>
            </div>
            <div>
                <AppiumHeaderSelect serviceActive={serviceActive} setServiceActive={setServiceActive}/>
                <SearchInput/>
            </div>
        </div>
    );
};

export default AppiumHeader;