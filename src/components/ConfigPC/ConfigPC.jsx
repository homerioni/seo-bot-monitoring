import React, {useEffect, useState} from 'react';
import s from './ConfigPC.module.scss';
import ConfigItem from "./ConfigItem/ConfigItem";
import {configPCIcons} from "./configPCIcons";

const ConfigPc = ({setModalConfig, accessory, setModalConfirm}) => {
    const [accessoryData, setAccessoryData] = useState({});

    useEffect(() => {
        const data = {PROCESSOR: [], HARD_DRIVE: [], RAM: [], VIDEO_ADAPTER: [], POWER_SUPPLY: [], THERMAL_PASTE: []};
        accessory.data?.result.forEach(item => data[item.type].push(item));
        setAccessoryData(data);
    }, [accessory]);

    const openModalConfig = type => e => {
        e.stopPropagation();
        setModalConfig({isOpen: true, type});
    };

    const postAttr = (type) => {return {icon: configPCIcons[type], data: accessoryData[type], modalOpen: openModalConfig(type), setModalConfig, setModalConfirm}};

    return (
        <div className={s.main}>
            <ConfigItem {...postAttr('PROCESSOR')} title='Процессоры'/>
            <ConfigItem {...postAttr('HARD_DRIVE')} title='SSD / HDD'/>
            <ConfigItem {...postAttr('RAM')} title='RAM'/>
            <ConfigItem {...postAttr('VIDEO_ADAPTER')} title='Видеокарты'/>
            <ConfigItem {...postAttr('POWER_SUPPLY')} title='Блоки питания'/>
            <ConfigItem {...postAttr('THERMAL_PASTE')} title='Термопаста'/>
        </div>
    );
};

export default ConfigPc;