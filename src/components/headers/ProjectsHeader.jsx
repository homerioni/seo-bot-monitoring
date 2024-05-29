import React from 'react';
import s from './Header.module.scss';
import AddBtn from "./AddBtn/AddBtn";
import SearchInput from "./SearchInput/SearchInput";
import HeaderLinkBtn from "./HeaderLinkBtn/HeaderLinkBtn";
import {routeNames} from "../../router/routeNames";

const ProjectsHeader = ({searchData, setSearchData, qtyProjects, setModalProject}) => {
    return (
        <div className={s.main}>
            <div>
                <AddBtn onClick={() => setModalProject({isOpen: true})}/>
                <div>
                    <p className={s.title}>
                        <span>Проекты</span>
                        <sup>{qtyProjects}</sup>
                    </p>
                </div>
            </div>
            <div>
                <HeaderLinkBtn url={routeNames.yandexMetrika} text={'Акк я.метрика'}/>
                <HeaderLinkBtn url={routeNames.yandexAccounts} text={'Акк Xml'}/>
                <SearchInput placeholder={'Поиск проекта...'} searchData={searchData} setSearchData={setSearchData}/>
            </div>
        </div>
    );
};

export default ProjectsHeader;