import React, {useMemo} from 'react';
import s from '../headers/Header.module.scss';
import DashSearchInput from "../headers/UI/DashSearchInput/DashSearchInput";
import DashSelect from "../headers/UI/DashSelect/DashSelect";
import DashDateBtn from "../headers/UI/DashDateBtn/DashDateBtn";
import DashSettingBtn from "../headers/UI/DashSettingBtn/DashSettingBtn";

const CheatPowerHeader = ({configs, setConfigFilter, setQtyDaysStat, setDates, setSelectedConfigs, setModalConfigFilter, setSearchData, searchData, dates, selectedConfigs}) => {
    const isMobile = window.innerWidth <= 768;

    const configsList = useMemo(() => {
        let arr = [];

        for (let key in configs) {
            arr.push({id: key, result: configs[key]});
        }

        arr.sort((a, b) => {
            if (a.result.data.qtyCpu > b.result.data.qtyCpu) return -1;
            if (a.result.data.qtyCpu < b.result.data.qtyCpu) return 1;
            if (a.result.data.cpuName > b.result.data.cpuName) return -1;
            if (a.result.data.cpuName < b.result.data.cpuName) return 1;
            if (a.result.data.valueRam > b.result.data.valueRam) return -1;
            if (a.result.data.valueRam < b.result.data.valueRam) return 1;
            return 0;
        });

        arr = arr.map(el => {
            const name = (<div className={s.dashNameBox}>{el.result.data.qtyCpu > 1 ? <b>x{el.result.data.qtyCpu}</b> : ''} {el.result.data.cpuName} {el.result.data.valueRam}Gb</div>);
            return {name, value: el.id};
        });

        return [{name: 'Все', value: 1}, ...arr];
    }, [configs]);

    const onChangeFilter = (e) => {
        if (e.target.checked) {
            setSelectedConfigs(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSelectedConfigs(prev => prev === null ? [e.target.value] : [...prev, e.target.value]);
        }
    };

    return (
        <div className={s.main}>
            <div>
                <p className={s.title}>Результативность серверов накрутки</p>
                {isMobile &&
                    <DashSettingBtn onClick={() => setModalConfigFilter({
                        isOpen: true,
                        title: 'Результативность серверов накрутки',
                        value: selectedConfigs,
                        onChange: onChangeFilter
                    })}/>}
            </div>
            <div>
                {!isMobile && <DashSearchInput width={'17rem'} value={searchData} setValue={setSearchData}/>}
                <DashSelect list={configsList} setValue={setConfigFilter} subtitle={'комплектация'} defaultValue={1}/>
                <DashDateBtn setQtyDaysStat={setQtyDaysStat} setDates={setDates} dates={dates}/>
                {!isMobile &&
                    <DashSettingBtn onClick={() => setModalConfigFilter({
                        isOpen: true,
                        title: 'Результативность серверов накрутки',
                        value: selectedConfigs,
                        onChange: onChangeFilter
                    })}/>}
            </div>
            {isMobile && <div>
                <DashSearchInput value={searchData} setValue={setSearchData}/>
            </div>}
        </div>
    );
};

export default CheatPowerHeader;