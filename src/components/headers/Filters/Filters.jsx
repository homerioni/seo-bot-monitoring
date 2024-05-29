import React, {useRef} from 'react';
import s from './Filters.module.scss';
import FiltersBtn from "./FiltersBtn/FiltersBtn";
import FiltersContent from "./FiltersContent/FiltersContent";
import {useForm} from "react-hook-form";
import {useToggleDropDownList} from "../../../hooks/useToggleDropDownList";

const Filters = ({projectsData, serversData, locationsData, setFilterData, filterData}) => {
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
                <FiltersContent serversData={serversData}
                                isClosing={isClosing}
                                register={register}
                                handleSubmit={handleSubmit}
                                reset={reset}
                                projectsData={projectsData}
                                locationsData={locationsData}
                                setFilterData={setFilterData}
                                setIsOpenFilters={setIsOpenFilters}/>
                : ''}
        </div>
    );
};

export default Filters;