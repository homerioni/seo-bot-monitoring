import React, {useRef} from 'react';
import s from './ProfStatFilter.module.scss';
import {useToggleDropDownList} from "../../../hooks/useToggleDropDownList";
import {useForm} from "react-hook-form";
import FiltersBtn from "../../headers/Filters/FiltersBtn/FiltersBtn";
import ProfStatFilterContent from "./ProfStatFilterContent/ProfStatFilterContent";

const ProfStatFilter = ({serversData, setFilterData, filterData}) => {
    const filterRef = useRef(null);
    const [isOpenFilters, setIsOpenFilters, isClosing] =
        useToggleDropDownList(filterRef, 150, (state, data) => reset(data === 'reset' ? {} : filterData));
    const {register, handleSubmit, reset} = useForm({
        mode: 'onChange',
        defaultValues: filterData,
    });

    return (
        <div className={s.main} ref={filterRef}>
            <FiltersBtn setIsOpenFilters={setIsOpenFilters}/>
            {isOpenFilters ?
                <ProfStatFilterContent serversData={serversData}
                                       isClosing={isClosing}
                                       register={register}
                                       handleSubmit={handleSubmit}
                                       reset={reset}
                                       setFilterData={setFilterData}
                                       setIsOpenFilters={setIsOpenFilters}/>
                : ''}
        </div>
    );
};

export default ProfStatFilter;