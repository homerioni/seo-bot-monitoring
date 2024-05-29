import React, {useMemo} from 'react';
import s from '../headers/Header.module.scss';
import DashSettingBtn from "../headers/UI/DashSettingBtn/DashSettingBtn";
import DashSearchInput from "../headers/UI/DashSearchInput/DashSearchInput";
import DashDateBtn from "../headers/UI/DashDateBtn/DashDateBtn";
import DashSelect from "../headers/UI/DashSelect/DashSelect";
import DashSortFilter from "../headers/UI/DashSortFilter/DashSortFilter";

const PumpingPowerHeader = ({isBAS, setSortType, searchData, setSearchData, configs, setConfigFilter, setQtyDaysStat, setDates, dates, selectedConfigs, setModalConfigFilter, setSelectedConfigs}) => {
    const isMobile = window.innerWidth <= 768;

    const title = isBAS ?
        'Результативность серверов прокачки по количеству циклов BAS'
        : 'Результативность по количеству созданных профилей';

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
        <div className={s.container}>
            <div className={s.main}>
                <div>
                    <p className={s.title}>{title}</p>
                    {isMobile &&
                        <DashSettingBtn onClick={() => setModalConfigFilter({isOpen: true, title, value: selectedConfigs, onChange: onChangeFilter})}/>}
                </div>
                <div></div>
            </div>
            <div className={s.main}>
                <div>
                    {!isMobile &&
                        <DashSearchInput width={'20.4rem'} value={searchData} setValue={setSearchData}/>}
                    {!isMobile &&
                        <DashSortFilter name={isBAS ? 'pumpingSortBAS' : 'pumpingSort'} setValue={setSortType}/>}
                    <DashSelect list={configsList} subtitle={'комплектация'} defaultValue={1} setValue={setConfigFilter}/>
                    <DashDateBtn setQtyDaysStat={setQtyDaysStat} setDates={setDates} dates={dates}/>
                    {!isMobile &&
                        <DashSettingBtn onClick={() => setModalConfigFilter({
                            isOpen: true,
                            title,
                            value: selectedConfigs,
                            onChange: onChangeFilter
                        })}/>}
                </div>
                <div>
                    {isMobile &&
                        <DashSearchInput value={searchData} setValue={setSearchData}/>}
                </div>
                <div>
                    {isMobile &&
                        <DashSortFilter name={isBAS ? 'pumpingSortBAS' : 'pumpingSort'} setValue={setSortType}/>}
                </div>
            </div>
        </div>
    );
};

export default PumpingPowerHeader;