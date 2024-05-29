import React, {useMemo} from 'react';
import s from './ModalConfigFullFilter.module.scss';
import ModalDashboardTitle from "../UI/ModalDashboardTitle/ModalDashboardTitle";
import Modal from "../../Modal";
import ModalConfigFullFilterContent from "./ModalConfigFullFilterContent/ModalConfigFullFilterContent";

const ModalConfigFullFilter = ({title, setModalConfigFullFilter, configs, value, onChange}) => {
    const filteredConfigs = useMemo(() => {
        const arr = [];
        for (let key in configs) {
            arr.push({id: key, ...configs[key]});
        }
        return arr;
    }, [configs]);

    return (
        <Modal containerClass={s.container} onClose={() => setModalConfigFullFilter({isOpen: false})}>
            <ModalDashboardTitle title={title} subtitle={'Настройка'}/>
            <ModalConfigFullFilterContent filteredConfigs={filteredConfigs} isLoading={!configs} value={value} onChange={onChange}/>
        </Modal>
    );
};

export default ModalConfigFullFilter;