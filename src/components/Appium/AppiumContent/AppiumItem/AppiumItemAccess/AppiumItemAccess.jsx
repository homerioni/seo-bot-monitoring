import React from 'react';
import s from './AppiumItemAccess.module.scss';
import pcIconActive from "../../../../../assets/img/pc-icon.svg";
import pcIconDisable from "../../../../../assets/img/pc-icon-not-active.svg";
import PumpingTooltipBox from "../../../../PumpingServers/PumpingContentItem/PumpingTooltipBox/PumpingTooltipBox";
import anyDeskIconActive from "../../../../../assets/img/any-desk-icon.svg";
import anyDeskIconDisable from "../../../../../assets/img/any-desk-icon-non-active.svg";

const tooltipItems = [
    {name: 'IP-адрес', value: '255.254.90.250'},
    {name: 'оператор', value: 'МГТС'},
    {name: '№ оплаты', value: '6991234567'},
    {name: 'дата оплаты', value: '12.02.24'}
]

const AppiumItemAccess = () => {
    return (
        <div className={s.main}>
            <div className={s.item} style={{'--color': '#4285F4'}}>
                <img className={s.active} src={pcIconActive} alt=""/>
                <img className={s.disable} src={pcIconDisable} alt=""/>
                <PumpingTooltipBox items={tooltipItems}/>
                <div className={s.copyBox}>
                    Телефон успешно скопирован
                </div>
            </div>
            <div className={s.item} style={{'--color': '#EF443B'}}>
                <img className={s.active} src={anyDeskIconActive} alt=""/>
                <img className={s.disable} src={anyDeskIconDisable} alt=""/>
                <PumpingTooltipBox items={tooltipItems}/>
                <div className={s.copyBox}>
                    Телефон успешно скопирован
                </div>
            </div>
            <div className={s.item} style={{'--color': '#5BC2FF'}}>
                <span>J</span>
                <PumpingTooltipBox items={tooltipItems}/>
                <div className={s.copyBox}>
                    Телефон успешно скопирован
                </div>
            </div>
        </div>
    );
};

export default AppiumItemAccess;