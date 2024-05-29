import React, {useRef, useState} from 'react';
import s from './TabFormItem.module.scss';
import TabFormItemTitle from "./TabFormItemTitle/TabFormItemTitle";
import TabFormItemSearch from "./TabFormItemSearch/TabFormItemSearch";
import TabFormGroupItem from "./TabFormGroupItem/TabFormGroupItem";
import TabFormGroupLabel from "./TabFormGroupLabel/TabFormGroupLabel";
import {useToggleDropDownList} from "../../../../../hooks/useToggleDropDownList";

const TabFormItem = ({register, watch, groups}) => {
    const listRef = useRef(null);
    const [searchData, setSearchData] = useState('');
    const [items, setItems] = useState([]);
    const [isListOpen, setIsListOpen] = useToggleDropDownList(listRef);

    return (
        <div className={s.main}>
            <TabFormItemTitle/>
            <div className={s.servers}>
                <button type="button" className={s.addBtn} onClick={() => setIsListOpen(!isListOpen)}>Добавить группу</button>
                <div className={`${s.listBox} ${isListOpen ? s.active : ''}`} ref={listRef}>
                    <TabFormItemSearch setSearchData={setSearchData} searchData={searchData}/>
                    <div className={s.list}>
                        {groups?.map(group =>
                            <TabFormGroupItem key={group.id} data={group} register={register} watch={watch} setItems={setItems} searchData={searchData}/>)}
                    </div>
                </div>
                {items?.length ?
                    items.map(item => <TabFormGroupLabel key={item.id} data={item}/>) : ''}
            </div>
        </div>
    );
};

export default TabFormItem;