import React from 'react';
import s from '../headers/Header.module.scss';
import DashSettingBtn from "../headers/UI/DashSettingBtn/DashSettingBtn";
import DashSelect from "../headers/UI/DashSelect/DashSelect";
import DashDateBtn from "../headers/UI/DashDateBtn/DashDateBtn";

const AveragePowerHeader = ({isBAS, groups, selectedGroup, setModalConfigFilter, selectedConfigs, setSelectedConfigs, setSelectedGroup, dates, setDates, setQtyDaysStat}) => {
    const groupsData = groups.data?.result?.map(group => {return {name: group.name, value: group.id}});
    const title = isBAS ?
        'Средняя статистика BAS прокачка (сайты/сутки)'
        : 'Средняя результативность от комплектации (профили/сутки)'

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
                <div>
                    <p className={s.title}>{title}</p>
                    {isBAS && <p className={s.subtitle}>в зависимости от комплектации</p>}
                </div>
                <div className={'mobile'}>
                    <DashSettingBtn onClick={() => setModalConfigFilter({isOpen: true, title, value: selectedConfigs, onChange: onChangeFilter})}/>
                </div>
            </div>
            <div>
                {groupsData && <DashSelect list={groupsData} setValue={setSelectedGroup} defaultValue={selectedGroup} titleMob={'Промежуток'} subtitleMob={'(Исключая сегодня)'}/>}
                <DashDateBtn dates={dates} setDates={setDates} setQtyDaysStat={setQtyDaysStat} titleMob={'Выбор промежутка'}/>
                <DashSettingBtn onClick={() => setModalConfigFilter({isOpen: true, title, value: selectedConfigs, onChange: onChangeFilter})} className={'desktop'}/>
            </div>
        </div>
    );
};

export default AveragePowerHeader;