import React from 'react';
import s from './ModalConfigFilterContent.module.scss';
import sModal from '../../ModalDashboard.module.scss';
import Loading from "../../../../UI/Loading/Loading";
import ModalDashboardCheckbox from "../../UI/ModalDashboardCheckbox/ModalDashboardCheckbox";

const ModalConfigFilterContent = ({filteredConfigs, isLoading, value, onChange}) => {
    return (
        <div>
            <p className={sModal.contentTitle}>Выбор комплектаций</p>
            <div className={sModal.content}>
                {isLoading && <Loading/>}
                <div className={s.listBox}>
                    {filteredConfigs?.map(config => (
                        <label key={config.id} className={s.listItem}>
                            <ModalDashboardCheckbox onChange={onChange} defaultChecked={!value?.includes(config.id)} value={config.id}/>
                            <div className={s.nameBox}>
                                {config.data.qtyCpu > 1 ? <div className={s.qty}>x{config.data.qtyCpu}</div> : ''}
                                <p>{config.data.cpuName} {config.data.valueRam}Gb</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModalConfigFilterContent;