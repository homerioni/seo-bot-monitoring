import React, {useEffect, useState} from 'react';
import s from './FiltersContent.module.scss';
import FiltersItem from "./FiltersItem/FiltersItem";
import FiltersButtons from "./FiltersButtons/FiltersButtons";

const FiltersContent = ({serversData, projectsData, locationsData, setFilterData, setIsOpenFilters, handleSubmit, register, reset, isClosing}) => {
    const [locations, setLocations] = useState([]);
    const [groups, setGroups] = useState([]);
    const [projects, setProjects] = useState([]);
    const isSentActive = [
        {name: 'Отправка работает', value: true},
        {name: 'Отправка выключена', value: false},
        {name: 'Недоступен', value: 'off'},
    ];

    useEffect(() => {
        const groupsArr = [];
        serversData?.forEach(item => {
            item.groups?.forEach(group => {
                if (!groupsArr.find(el => el.value === group.id))
                    groupsArr.push({name: group.name, value: group.id});
            });
        });
        setGroups(groupsArr);
    }, [serversData]);

    useEffect(() => {
        const locationsArr = locationsData?.map(item => {
            return {name: item.name, value: item.id};
        });
        setLocations(locationsArr);
    }, [locationsData]);

    useEffect(() => {
        const projectsIds = [];
        projectsData?.forEach(item => projectsIds.push({name: item.name, value: item.id}));
        setProjects(projectsIds);
    }, [projectsData]);

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
            <FiltersItem checkboxes={groups} title={'Группа'} register={{...register('groups')}}/>
            <FiltersItem checkboxes={isSentActive} title={'Работоспособность'} register={{...register('isSentActive')}}/>
            <FiltersItem checkboxes={locations} title={'Локация'} register={{...register('locations')}}/>
            <FiltersItem checkboxes={projects} title={'Проекты'} register={{...register('projects')}}/>
            <FiltersButtons onCancel={onCancel}/>
        </form>
    );
};

export default FiltersContent;