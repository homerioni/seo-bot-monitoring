import React, {useContext} from 'react';
import s from './TabsItem.module.scss';
import {PMService} from "../../../../API/PMService";
import {AlertContext} from "../../../../App";
import {useQueryClient} from "react-query";
import TabsItemDelBtn from "./TabsItemDelBtn";
import TabsItemEditBtn from "./TabsItemEditBtn";

const TabsItem = ({data, setModalConfirm, setModalGroupTab, tabs, groups}) => {
    const queryClient = useQueryClient()

    return (
        <div className={s.tab}>
            <p className={s.name}>{data.name}</p>
            <div>
                <TabsItemEditBtn setModalGroupTab={setModalGroupTab} data={data} tabs={tabs} groups={groups}/>
                <TabsItemDelBtn data={data} setModalConfirm={setModalConfirm} queryClient={queryClient}/>
            </div>
        </div>
    );
};

export default TabsItem;