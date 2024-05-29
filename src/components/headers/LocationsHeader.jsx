import React from 'react';
import s from './Header.module.scss'
import AddBtn from "./AddBtn/AddBtn";
import SearchInput from "./SearchInput/SearchInput";

const LocationsHeader = ({setModalLocation, searchData, setSearchData, locations}) => {
    return (
        <div className={s.main}>
            <div>
                <AddBtn onClick={() => setModalLocation({isOpen: true})}/>
                <div>
                    <p className={s.title}>
                        <span>Локации</span>
                        <sup>{locations.data?.result?.length}</sup>
                    </p>
                </div>
            </div>
            <div>
                <SearchInput placeholder={'Поиск локации...'} searchData={searchData} setSearchData={setSearchData}/>
            </div>
        </div>
    );
};

export default LocationsHeader;