import React, {useMemo} from 'react';
import s from './DashRepairItem.module.scss';
import {getConfigTypeMinText, getDayText} from "../../../dashboardTools";

const DashRepairItem = ({server, index, isActive}) => {
    const errorDate = new Date(server.errorDate);
    const errorDateWaiting = Math.floor((Date.now() - errorDate) / 1000 / 60 / 60 / 24);

    const accessory = useMemo(() => {
        const set = {PROCESSOR: [], HARD_DRIVE: [], RAM: [], VIDEO_ADAPTER: [], POWER_SUPPLY: [], THERMAL_PASTE: []};
        server.accessories.forEach(item => {
            set[item.type].push(item);
        });

        const PROCESSOR = set.PROCESSOR.length > 0 ? [{...set.PROCESSOR[0], qty: set.PROCESSOR.length}] : [];
        const RAM = set.RAM.length > 0 ? [{...set.RAM[0], qty: set.RAM.length}] : [];

        return [
            ...PROCESSOR,
            ...RAM,
            ...set.HARD_DRIVE,
            ...set.VIDEO_ADAPTER,
            ...set.POWER_SUPPLY,
            ...set.THERMAL_PASTE
        ];
    }, [server]);

    return (
        <div className={`${s.main} ${isActive ? s.active : ''}`}>
            <div className={s.nameBox}>
                <div className={s.name}>
                    <span>{index + 1}</span>
                    <span>{server.name}</span>
                </div>
                <div className={`${s.location} mobile`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8592 3.92195C10.2676 1.21756 7.99719 0 6.00282 0C6.00282 0 6.00282 0 5.99718 0C4.00845 0 1.73238 1.21171 1.14083 3.9161C0.481677 6.93658 2.26196 9.49463 3.87323 11.1044C4.47042 11.7015 5.23662 12 6.00282 12C6.76902 12 7.53522 11.7015 8.12677 11.1044C9.73804 9.49463 11.5183 6.94244 10.8592 3.92195ZM6 6.54546C5.07953 6.54546 4.33333 5.81283 4.33333 4.90909C4.33333 4.00535 5.07953 3.27273 6 3.27273C6.92047 3.27273 7.66667 4.00535 7.66667 4.90909C7.66667 5.81283 6.92047 6.54546 6 6.54546Z" fill="#1E1E22"/>
                    </svg>
                    <span>{server.location?.name}</span>
                </div>
            </div>
            <div className={s.configList}>
                <div>
                    {accessory?.map((item, i) => (
                        <p className={s.config} key={i}>
                            <span>{getConfigTypeMinText(item)}</span>
                            <span>{item.name}{item.qty ? ` x${item.qty}` : ''}</span>
                        </p>
                    ))}
                </div>
            </div>
            <div className={s.error}>
                <div className={s.errorIcon}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.61758 3.04701C6.03229 3.04701 5.793 2.60829 6.08403 2.07016C6.25218 1.75826 6.15193 1.36066 5.85767 1.18243L5.29824 0.843105C5.04279 0.682011 4.71295 0.777982 4.56097 1.04876L4.5254 1.11388C4.23437 1.652 3.75579 1.652 3.46152 1.11388L3.42595 1.04876C3.28044 0.777982 2.95061 0.682011 2.69515 0.843105L2.13572 1.18243C1.84146 1.36066 1.74121 1.76168 1.90937 2.07359C2.20363 2.60829 1.96434 3.04701 1.37904 3.04701C1.04274 3.04701 0.764648 3.33835 0.764648 3.69824V4.30149C0.764648 4.65795 1.03951 4.95272 1.37904 4.95272C1.96434 4.95272 2.20363 5.39144 1.90937 5.92956C1.74121 6.24147 1.84146 6.63906 2.13572 6.8173L2.69515 7.15662C2.95061 7.31772 3.28044 7.22175 3.43242 6.95097L3.46799 6.88585C3.75902 6.34772 4.2376 6.34772 4.53187 6.88585L4.56744 6.95097C4.71942 7.22175 5.04925 7.31772 5.30471 7.15662L5.86414 6.8173C6.1584 6.63906 6.25864 6.23804 6.09049 5.92956C5.79623 5.39144 6.03552 4.95272 6.62081 4.95272C6.95711 4.95272 7.23521 4.66138 7.23521 4.30149V3.69824C7.23198 3.34178 6.95711 3.04701 6.61758 3.04701ZM3.99831 5.11381C3.41949 5.11381 2.94737 4.61339 2.94737 3.99986C2.94737 3.38634 3.41949 2.88592 3.99831 2.88592C4.57714 2.88592 5.04925 3.38634 5.04925 3.99986C5.04925 4.61339 4.57714 5.11381 3.99831 5.11381Z" fill="white"/>
                    </svg>
                </div>
                <span>
                    {server.error}
                </span>
            </div>
            <div className={s.date}>
                <p>{errorDate.toLocaleDateString()}</p>
                <p className={s.red}>{errorDateWaiting} {getDayText(errorDateWaiting)} ожидания</p>
            </div>
            <div className={`${s.location} desktop`}>{server.location?.name}</div>
        </div>
    );
};

export default DashRepairItem;