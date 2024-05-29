import React, {useState} from 'react';
import s from './ModalConfigFullFilterContent.module.scss';
import sModal from "../../ModalDashboard.module.scss";
import Loading from "../../../../UI/Loading/Loading";
import ModalDashboardSearch from "../../UI/ModalDashboardSearch/ModalDashboardSearch";
import ConfigFullFilterItem
    from "./ConfigFullFilterItem/ConfigFullFilterItem";

const ModalConfigFullFilterContent = ({filteredConfigs, isLoading, value, onChange}) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div>
            <p className={sModal.contentTitle}>Какие комплектации и сервера выводим в статистику?</p>
            <div className={sModal.content}>
                {isLoading && <Loading/>}
                <ModalDashboardSearch placeholder={'Поиск по комплектации или серверу'} value={searchValue} setValue={setSearchValue}/>
                <div className={s.listBox}>
                    {filteredConfigs?.map(config =>
                        <ConfigFullFilterItem config={config} searchValue={searchValue} onChange={onChange} value={value}/>)}
                </div>
            </div>
        </div>
    );
};

export default ModalConfigFullFilterContent;