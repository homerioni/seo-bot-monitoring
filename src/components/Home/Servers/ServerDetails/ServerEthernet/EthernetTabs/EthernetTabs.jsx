import React, {useState} from 'react';
import s from "./EthernetTabs.module.scss";
import EthernetHoc from "../EthernetHoc/EthernetHoc";
import {getDateForRequest} from "../../../../../../utils/tools";

const EthernetTabs = ({testSettings}) => {
    const [activeTab, setActiveTab] = useState(1);
    const tabs = [
        'Вчера',
        'Сегодня',
    ];

    const yesterday = getDateForRequest(new Date(Date.now() - 86400000));
    const today = getDateForRequest(new Date());

    const content = tabs.map((item, i) => <EthernetHoc testSettings={testSettings} date={i === 0 ? yesterday : today}/>);
    const tabsContent = tabs.map((item, i) => (
        <button type='button' key={i}
                className={`${s.item} ${activeTab === i ? s.active : ''}`}
                onClick={() => setActiveTab(i)}
        >
            {item}
        </button>
    ));

    return (
        <>
            <div className={s.main}>
                {tabsContent}
            </div>
            {content[activeTab]}
        </>
    );
};

export default EthernetTabs;