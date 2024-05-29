import React from 'react';
import s from './ProfStatFilterContent.module.scss';
import FiltersButtons from "../../../headers/Filters/FiltersContent/FiltersButtons/FiltersButtons";
import ProfStatFilterItem from "./ProfStatFilterItem/ProfStatFilterItem";

const ProfStatFilterContent = ({setFilterData, setIsOpenFilters, handleSubmit, register, reset, isClosing}) => {
    const purpose = [
        {name: 'Накрутка', value: 'Накрутка'},
        {name: 'Прокачка', value: 'Прокачка'},
        {name: 'Склад', value: 'Склад'},
    ];

    const onSubmit = data => {
        setFilterData(data);
        setIsOpenFilters(false);
    };

    const onCancel = () => {
        reset({});
        setFilterData(null);
        setIsOpenFilters(false, 'reset');
    }

    return (
        <form className={`${s.main} ${isClosing ? s.closing : ''}`} onSubmit={handleSubmit(onSubmit)}>
            <ProfStatFilterItem checkboxes={purpose} title={'Назначение'} register={{...register('purpose')}}/>
            <FiltersButtons onCancel={onCancel}/>
        </form>
    );
};

export default ProfStatFilterContent;