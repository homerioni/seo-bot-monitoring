import sProfileSum from "./ProfileSum/ProfileSumPie/ProfileSumPieGraph/ProfileSumPieGraph.module.scss";
import sConfigDiagram from "./ConfigDiagram/ConfigDiagramContent/ConfigDiagramContent.module.scss";
import {PMService} from "../../API/PMService";

export const dashboardColors = [
    '#8B98EE',
    '#5BC2FF',
    '#FE6E1E',
    "#008080", // темно-циановый
    "#FF0000", // красный
    "#08e808", // зеленый
    "#FF00FF", // пурпурный
    "#0be8e8", // голубой
    "#FFA500", // оранжевый
    "#8A2BE2", // сиреневый
    "#FF1493", // розовый
    "#008000", // темно-зеленый
    "#FFD700", // золотой
    "#FFC0CB", // розовато-персиковый
    "#800000", // темно-коричневый
    "#0000FF", // синий
    "#FF69B4", // розовато-лавандовый
    "#800080", // фиолетовый
];

export const getDashboardColor = (index) => dashboardColors[index % dashboardColors.length];

export const PieExternalTooltipHandler = (ref, context, maxValue) => {
    const {chart, tooltip} = context;
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
    const tooltipEl = ref.current;

    if (tooltip.opacity === 0) {
        tooltipEl.classList = sProfileSum.tooltip;
        return;
    }

    tooltipEl.innerHTML = '';

    if (tooltip.body) {
        const bodyLines = tooltip.body.map(b => b.lines);

        bodyLines.forEach(body => {
            const div = document.createElement('div');
            const div2 = document.createElement('div');
            const text = document.createTextNode(body);
            const val = Number(body[0].replace(/\s/ig, ''));
            const text2 = document.createTextNode(`${Math.round(val / maxValue * 100)}%`);
            div.appendChild(text);
            div2.appendChild(text2);
            tooltipEl.appendChild(div);
            tooltipEl.appendChild(div2);
        });
    }

    tooltipEl.classList = `${sProfileSum.tooltip} ${sProfileSum.show}`;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
};

export const statsEachDayData = (days) => {
    let arrDates = [];
    for (let i = 0; i < days; i++) {
        const startDate = (new Date(Date.now() - i * 24 * 3600000)).toJSON().slice(0, 10);
        arrDates.push({startDate: startDate, endDate: startDate});
    }
    return arrDates;
}

export const getGroupsStatDataSum = (arr) => {
    let sum = 0;
    arr?.forEach(item => item ? sum += item.numberOfSuccess : 0);
    return sum;
}

export const getConfigTypeMinText = (item) => {
    switch (item.type) {
        case 'PROCESSOR':
            return 'CPU';
        case 'HARD_DRIVE':
            return item.characteristics.type;
        case 'RAM':
            return 'RAM';
        case 'VIDEO_ADAPTER':
            return 'GPU';
        case 'POWER_SUPPLY':
            return 'PSU';
        case 'THERMAL_PASTE':
            return 'TP';
        default:
            return;
    }
}

export const getDayText = (num) => {
    if ((num > 10 && num < 15) || num % 10 === 0) return 'дней';
    if (num % 10 > 1 && num % 10 < 5) return 'дня';
    if (num % 10 === 1) return 'день';
    return 'дней';
};

export const configAccessoryCalcForAP = (server, list) => {
    const data = {cpuId: 0, qtyCpu: 0, valueRam: 0, cpuName: ''};

    server.accessories.forEach(item => {
        if (item.type === 'PROCESSOR') {
            const nameStart = item.name.indexOf('E5') + 3;
            const nameEnd = item.name.indexOf('@') - 1;
            data.qtyCpu++;
            data.cpuId = item.id;
            data.cpuName = item.name.slice(nameStart, nameEnd);
        } else if (item.type === 'RAM') {
            data.valueRam += Number(item.characteristics.capacity);
        }
    });

    if (data.cpuId && data.valueRam) {
        const dataName = '' + data.qtyCpu + data.cpuId + data.valueRam;
        if (list[dataName]) {
            list[dataName].qty++;
        } else {
            list[dataName] = {qty: 1, data};
        }
    }
}

export const ConfigExternalTooltipHandler = (ref, context, maxValue) => {
    const {chart, tooltip} = context;
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
    const tooltipEl = ref.current;

    if (tooltip.opacity === 0) {
        tooltipEl.classList = sConfigDiagram.tooltip;
        return;
    }

    tooltipEl.innerHTML = '';

    if (tooltip.body) {
        const bodyLines = tooltip.body.map(b => b.lines);
        const val = Number(bodyLines[0][0].replace(/\s/ig, ''));

        tooltipEl.innerHTML = `<div>`
                + `<div>${context.tooltip.dataPoints[0].raw.name}</div>`
                + `<div>`
                    + `<svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">`
                        + `<path fill-rule="evenodd" clip-rule="evenodd" d="M0.293 0.380562C-2.98023e-08 0.641006 0 1.05967 0 1.89789C0 2.73612 -2.98023e-08 3.15478 0.293 3.41523C0.586 3.67567 1.057 3.67567 2 3.67567H8C8.943 3.67567 9.414 3.67567 9.707 3.41523C10 3.15478 10 2.73612 10 1.89789C10 1.05967 10 0.641006 9.707 0.380562C9.414 0.120117 8.943 0.120117 8 0.120117H2C1.057 0.120117 0.586 0.120117 0.293 0.380562ZM3.5 2.67567C3.40054 2.67567 3.30516 2.64055 3.23484 2.57804C3.16451 2.51553 3.125 2.43074 3.125 2.34234V1.45345C3.125 1.36505 3.16451 1.28026 3.23484 1.21775C3.30516 1.15524 3.40054 1.12012 3.5 1.12012C3.59946 1.12012 3.69484 1.15524 3.76516 1.21775C3.83549 1.28026 3.875 1.36505 3.875 1.45345V2.34234C3.875 2.43074 3.83549 2.51553 3.76516 2.57804C3.69484 2.64055 3.59946 2.67567 3.5 2.67567ZM5.75 1.56456C5.65054 1.56456 5.55516 1.59968 5.48484 1.66219C5.41451 1.7247 5.375 1.80949 5.375 1.89789C5.375 1.9863 5.41451 2.07109 5.48484 2.1336C5.55516 2.19611 5.65054 2.23123 5.75 2.23123H8C8.09946 2.23123 8.19484 2.19611 8.26517 2.1336C8.33549 2.07109 8.375 1.9863 8.375 1.89789C8.375 1.80949 8.33549 1.7247 8.26517 1.66219C8.19484 1.59968 8.09946 1.56456 8 1.56456H5.75ZM2 2.67567C1.90054 2.67567 1.80516 2.64055 1.73483 2.57804C1.66451 2.51553 1.625 2.43074 1.625 2.34234V1.45345C1.625 1.36505 1.66451 1.28026 1.73483 1.21775C1.80516 1.15524 1.90054 1.12012 2 1.12012C2.09946 1.12012 2.19484 1.15524 2.26517 1.21775C2.33549 1.28026 2.375 1.36505 2.375 1.45345V2.34234C2.375 2.43074 2.33549 2.51553 2.26517 2.57804C2.19484 2.64055 2.09946 2.67567 2 2.67567ZM0.293 4.82501C-2.98023e-08 5.08545 0 5.50412 0 6.34234C0 7.18056 -2.98023e-08 7.59923 0.293 7.85967C0.586 8.12012 1.057 8.12012 2 8.12012H8C8.943 8.12012 9.414 8.12012 9.707 7.85967C10 7.59923 10 7.18056 10 6.34234C10 5.50412 10 5.08545 9.707 4.82501C9.414 4.56456 8.943 4.56456 8 4.56456H2C1.057 4.56456 0.586 4.56456 0.293 4.82501ZM5.375 6.34234C5.375 6.25393 5.41451 6.16915 5.48484 6.10664C5.55516 6.04412 5.65054 6.00901 5.75 6.00901H8C8.09946 6.00901 8.19484 6.04412 8.26517 6.10664C8.33549 6.16915 8.375 6.25393 8.375 6.34234C8.375 6.43075 8.33549 6.51553 8.26517 6.57804C8.19484 6.64055 8.09946 6.67567 8 6.67567H5.75C5.65054 6.67567 5.55516 6.64055 5.48484 6.57804C5.41451 6.51553 5.375 6.43075 5.375 6.34234ZM1.625 6.78678C1.625 6.87519 1.66451 6.95997 1.73483 7.02249C1.80516 7.085 1.90054 7.12012 2 7.12012C2.09946 7.12012 2.19484 7.085 2.26517 7.02249C2.33549 6.95997 2.375 6.87519 2.375 6.78678V5.89789C2.375 5.80949 2.33549 5.72471 2.26517 5.66219C2.19484 5.59968 2.09946 5.56456 2 5.56456C1.90054 5.56456 1.80516 5.59968 1.73483 5.66219C1.66451 5.72471 1.625 5.80949 1.625 5.89789V6.78678ZM3.5 7.12012C3.40054 7.12012 3.30516 7.085 3.23484 7.02249C3.16451 6.95997 3.125 6.87519 3.125 6.78678V5.89789C3.125 5.80949 3.16451 5.72471 3.23484 5.66219C3.30516 5.59968 3.40054 5.56456 3.5 5.56456C3.59946 5.56456 3.69484 5.59968 3.76516 5.66219C3.83549 5.72471 3.875 5.80949 3.875 5.89789V6.78678C3.875 6.87519 3.83549 6.95997 3.76516 7.02249C3.69484 7.085 3.59946 7.12012 3.5 7.12012Z" fill="#A1B1C5"/>`
                    + `</svg>`
                    + `<span>${val}</span>`
                    + `<span>/</span>`
                    + `<span>${Math.round(val / maxValue * 100)}%</span>`
                + `</div>`
            + `</div>`;
    }

    tooltipEl.classList = `${sConfigDiagram.tooltip} ${sConfigDiagram.show}`;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
};

export const pumpingPowerConfigGet = (server) => {
    const list = {
        qtyCpu: 0,
        cpuName: '',
        valueRam: 0,
    };

    server.accessories.forEach(item => {
        if (item.type === 'PROCESSOR') {
            const nameStart = item.name.indexOf('E5') + 3;
            const nameEnd = item.name.indexOf('@') - 1;
            list.qtyCpu++;
            list.cpuName = item.name.slice(nameStart, nameEnd);
        } else if (item.type === 'RAM') {
            list.valueRam += Number(item.characteristics.capacity);
        }
    });

    return list;
};

export const getConfigs = servers => {
    const configs = {};

    servers.data?.result?.forEach(server => {
        const data = {qtyCpu: 0, cpuId: 0, valueRam: 0, cpuName: '', price: 0};

        server.accessories.forEach(item => {
            data.price += item.price;
            if (item.type === 'PROCESSOR') {
                const nameStart = item.name.indexOf('E5') + 3;
                const nameEnd = item.name.indexOf('@') - 1;
                data.qtyCpu++;
                data.cpuId = item.id;
                data.cpuName = item.name.slice(nameStart, nameEnd);
            } else if (item.type === 'RAM') {
                data.valueRam += Number(item.characteristics.capacity);
            }
        });

        if (data.qtyCpu > 0 && data.valueRam > 0) {
            const id = '' + data.qtyCpu + data.cpuId + data.valueRam;

            if (configs[id]) {
                configs[id].data.price = Math.max(configs[id].data.price, data.price);
                configs[id].servers.push(server);
            } else {
                configs[id] = {};
                configs[id].servers = [server];
                configs[id].data = data;
            }
        }
    });

    return configs;
};

export const getStatusLoadingQueries = (arr) => {
    let status = false;
    arr.forEach(query => {
        if (query.isLoading) status = true;
    });
    return status;
};