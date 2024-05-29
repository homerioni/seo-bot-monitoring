import React from 'react';
import s from '../headers/Header.module.scss';
import DashSettingBtn from "../headers/UI/DashSettingBtn/DashSettingBtn";

const ConfigDiagramHeader = ({title, setModalConfigFilter, setSelectedConfigs, selectedConfigs}) => {
    const onChangeFilter = (e) => {
        if (e.target.checked) {
            setSelectedConfigs(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSelectedConfigs(prev => prev === null ? [e.target.value] : [...prev, e.target.value]);
        }
    };

    return (
        <div className={`${s.main} ${s.flexMob}`}>
            <div>
                <p className={s.title}>{title}</p>
            </div>
            <div>
                <DashSettingBtn onClick={() => setModalConfigFilter({isOpen: true, title, value: selectedConfigs, onChange: onChangeFilter})}/>
            </div>
        </div>
    );
};

export default ConfigDiagramHeader;