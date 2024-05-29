import React from 'react';
import s from "./Header.module.scss";
import BackLink from "./BackLink/BackLink";
import {routeNames} from "../../router/routeNames";
import AddBtn from "./AddBtn/AddBtn";
import SearchInput from "./SearchInput/SearchInput";

const YandexHeader = ({title, setSearchData, searchData, setModal}) => {
    return (
        <div className={s.main}>
            <div>
                <BackLink src={routeNames.projects}/>
                <AddBtn onClick={() => setModal({isOpen: true})}/>
                <p className={s.title}>{title}</p>
            </div>
            <div>
                <SearchInput setSearchData={setSearchData} searchData={searchData} placeholder={'Поиск...'}/>
            </div>
        </div>
    );
};

export default YandexHeader;