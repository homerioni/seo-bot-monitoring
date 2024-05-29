import React, {useRef} from 'react';
import s from './ConfigDiagramContent.module.scss';
import {Doughnut} from "react-chartjs-2";
import {ConfigExternalTooltipHandler, dashboardColors, getDashboardColor} from "../../dashboardTools";
import {ArcElement, Chart as ChartJS, Tooltip} from "chart.js";
import ConfigDiagramItem from "./ConfigDiagramItem/ConfigDiagramItem";

const ConfigDiagramContent = ({configsList}) => {
    const tooltipRef = useRef(null)
    ChartJS.register(ArcElement, Tooltip);
    const maxValue = configsList?.qty;

    const data = {
        datasets: [
            {
                data: configsList?.result?.map(el => {return {val: el.servers.length, name: `${el.data.cpuName} ${el.data.valueRam}Gb`}}),
                backgroundColor: dashboardColors,
                borderWidth: 0,
                cutout: '55%',
            },
        ],
    };

    const options = {
        parsing: {
            key: 'val'
        },
        plugins: {
            tooltip: {
                enabled: false,
                position: 'nearest',
                external: context => ConfigExternalTooltipHandler(tooltipRef, context, maxValue)
            },
        },
    }

    return (
        <div className={s.main}>
            <div className={s.graphBox}>
                <Doughnut data={data} options={options}/>
                <div ref={tooltipRef} className={s.tooltip}/>
                <div className={s.qtyServersBox}>
                    <p>{maxValue}</p>
                    <p>всего серверов</p>
                </div>
            </div>
            <div className={s.statBox}>
                {configsList?.result?.map((item, i) =>
                    <ConfigDiagramItem key={i} data={item.data} qty={item.servers.length} maxValue={maxValue} color={getDashboardColor(i)}/>)}
            </div>
        </div>
    );
};

export default ConfigDiagramContent;