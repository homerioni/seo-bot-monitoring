import React, {useState} from 'react';
import s from './AveragePowerContent.module.scss';
import AveragePowerItem from "./AveragePowerItem/AveragePowerItem";
import {getDashboardColor} from "../../dashboardTools";
import EmptyData from "../../../UI/EmptyData/EmptyData";
import AveragePowerItemBAS from "./AveragePowerItemBAS/AveragePowerItemBAS";

const AveragePowerContent = ({filteredConfigs, dates, qtyDaysStat, selectedGroup, isBAS}) => {
    const [maxValue, setMaxValue] = useState(1500);

    return (
        <div className={s.main}>
            {!!selectedGroup && selectedGroup !== 'null' ? <>
                {filteredConfigs.length > 0 ?
                    <>
                        {filteredConfigs?.map((item, i) => isBAS ?
                            <AveragePowerItemBAS key={item.result.id} data={item} color={getDashboardColor(i)}
                                                 dates={dates} qtyDaysStat={qtyDaysStat} setMaxValue={setMaxValue}
                                                 maxValue={maxValue}/>
                            :
                            <AveragePowerItem key={item.result.id} data={item} color={getDashboardColor(i)}
                                              dates={dates} qtyDaysStat={qtyDaysStat} setMaxValue={setMaxValue}
                                              maxValue={maxValue}/>)}
                        <div className={s.background}>
                            {Array.from({length: 14}, (el, i) =>
                                <div key={i}>
                                    <span>{Math.ceil(maxValue / 13 * i)}</span>
                                </div>)}
                        </div>
                    </>
                    : <EmptyData>Нет серверов</EmptyData>}
            </> : <EmptyData>Группа не выбрана</EmptyData>}
        </div>
    );
};

export default AveragePowerContent;