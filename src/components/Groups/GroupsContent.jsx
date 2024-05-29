import React, {useEffect, useMemo} from 'react';
import s from './Groups.module.scss'
import GroupsItem from "./GroupsItem/GroupsItem";
import {filteredGroupTabs} from "../../utils/tools";

const GroupsContent = ({tabs, groups, setNoTab, activeTab, setModalGroup, setModalConfirm}) => {
    const filteredGroups = useMemo(() => {
        return filteredGroupTabs(tabs, groups);
    }, [groups, tabs]);

    useEffect(() => {
        if (filteredGroups?.notTabs.length) setNoTab(true);
    }, [filteredGroups]);

    return (
        <>
            {filteredGroups ? tabs?.map(tab => activeTab === tab.id || activeTab === 0 ?
                <div key={tab.id}>
                    <p className={s.title}>{tab.name}</p>
                    <div className={s.items}>
                        {filteredGroups[tab.id] && filteredGroups[tab.id].length ?
                            filteredGroups[tab.id].map(item =>
                                <GroupsItem key={item.id} data={item} setModalGroup={setModalGroup} setModalConfirm={setModalConfirm}/>)
                            : ''}
                    </div>
                </div> : '') : ''}
            {filteredGroups?.notTabs?.length && (activeTab === 1 || activeTab === 0) ?
                <div>
                    <p className={s.title}>Без вкладки</p>
                    <div className={s.items}>
                        {filteredGroups?.notTabs?.map(item =>
                            <GroupsItem key={item.id} data={item} setModalGroup={setModalGroup} setModalConfirm={setModalConfirm}/>)}
                    </div>
                </div> : ''}
        </>
    );
};

export default GroupsContent;