import React from 'react';
import s from './ModalServerTabs.module.scss';
import ModalServerTab from "./ModalServerTab";
import {threadForm} from "../../../../utils/tools";

const ModalServerTabs = ({activeTab, setActiveTab, tabs, setThreads, server}) => {
    const addThread = () => {
        if (tabs[tabs.length - 1].isField) {
            setActiveTab(tabs.length);
            setThreads(prev => prev ? [...prev, threadForm(server.id, tabs.length)] : [threadForm(server.id, tabs.length)]);
        }
    }

    return (
        <div className={s.main}>
            {tabs.map((tab, i) => (
                <ModalServerTab key={i} isActive={activeTab === i ? s.active : ''} name={tab.name} classState={false} onClick={() => setActiveTab(i)}/>
            ))}
            <ModalServerTab name='Создать поток' classState={tabs[tabs.length - 1].isField ? s.add : s.disable} onClick={addThread}/>
        </div>
    );
};

export default ModalServerTabs;