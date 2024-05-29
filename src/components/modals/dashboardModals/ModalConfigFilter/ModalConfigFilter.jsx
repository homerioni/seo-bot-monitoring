import React, {useMemo} from 'react';
import s from './ModalConfigFilter.module.scss'
import Modal from "../../Modal";
import ModalDashboardTitle from "../UI/ModalDashboardTitle/ModalDashboardTitle";
import ModalConfigFilterContent from "./ModalConfigFilterContent/ModalConfigFilterContent";

const ModalConfigFilter = ({setModalConfigFilter, title, configs, value, onChange}) => {
    const filteredConfigs = useMemo(() => {
        const arr = [];
        for (let key in configs) {
            arr.push({id: key, data: configs[key].data});
        }
        return arr;
    }, [configs]);

    return (
        <Modal containerClass={s.container} onClose={() => setModalConfigFilter({isOpen: false})}>
            <ModalDashboardTitle title={title} subtitle={'Настройка'}/>
            <ModalConfigFilterContent filteredConfigs={filteredConfigs} isLoading={!configs} value={value} onChange={onChange}/>
        </Modal>
    );
};

export default ModalConfigFilter;