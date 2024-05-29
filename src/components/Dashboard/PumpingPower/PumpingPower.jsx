import React, {useEffect, useRef, useState} from 'react';
import s from './PumpingPower.module.scss';
import PumpingPowerHeader from "./PumpingPowerHeader";
import PumpingPowerContentHeader from "./PumpingPowerContentHeader/PumpingPowerContentHeader";
import PumpingPowerItemHoc from "./PumpingPowerItemHOC/PumpingPowerItemHOC";
import PumpingPowerItemBasHoc from "./PumpingPowerItemBAS_HOC/PumpingPowerItemBAS_HOC";

const PumpingPower = ({servers, configs, setModalConfigFilter, serversIsHaveBAS}) => {
    const [selectedConfigs, setSelectedConfigs] = useState(!!localStorage.getItem(`pumpingPower${!!serversIsHaveBAS ? 'BAS' : ''}`) ? localStorage.getItem(`pumpingPower${!!serversIsHaveBAS ? 'BAS' : ''}`).split(',') : []);
    const [sortType, setSortType] = useState('AVERAGE');
    const [searchData, setSearchData] = useState('');
    const [configFilter, setConfigFilter] = useState('');
    const [qtyDaysStat, setQtyDaysStat] = useState(5);
    const [dates, setDates] = useState(null);
    const listRef = useRef(null);

    useEffect(() => {listRef.current.scrollTop = 0}, [sortType]);

    useEffect(() => localStorage.setItem(`pumpingPower${!!serversIsHaveBAS ? 'BAS' : ''}`, selectedConfigs), [selectedConfigs]);

    return (
        <div className={s.main}>
            <PumpingPowerHeader dates={dates}
                                isBAS={!!serversIsHaveBAS}
                                setDates={setDates}
                                setSortType={setSortType}
                                configs={configs}
                                setSearchData={setSearchData}
                                searchData={searchData}
                                setConfigFilter={setConfigFilter}
                                setQtyDaysStat={setQtyDaysStat}
                                setModalConfigFilter={setModalConfigFilter}
                                setSelectedConfigs={setSelectedConfigs}
                                selectedConfigs={selectedConfigs}/>
            <div className={s.content}>
                <PumpingPowerContentHeader/>
                <div className={s.list} ref={listRef}>
                    {!!serversIsHaveBAS ?
                        <PumpingPowerItemBasHoc configFilter={configFilter}
                                                qtyDaysStat={qtyDaysStat}
                                                dates={dates} servers={servers}
                                                selectedConfigs={selectedConfigs}
                                                configs={configs}
                                                searchData={searchData}
                                                sortType={sortType}
                                                serversIsHaveBAS={serversIsHaveBAS}/> :
                        <PumpingPowerItemHoc configFilter={configFilter}
                                             qtyDaysStat={qtyDaysStat}
                                             dates={dates} servers={servers}
                                             selectedConfigs={selectedConfigs}
                                             configs={configs}
                                             searchData={searchData}
                                             sortType={sortType}/>}
                </div>
            </div>
        </div>
    );
};

export default PumpingPower;