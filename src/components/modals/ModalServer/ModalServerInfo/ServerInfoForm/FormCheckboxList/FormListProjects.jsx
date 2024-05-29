import React, {useEffect, useState} from 'react';
import s from "./FormCheckboxList.module.scss";
import projectIcon from '../../../../../../assets/img/project-icon-square.svg';

const ListItem = ({register, data, searchData, setItems, checkState}) => {
    const [isCheck, setIsCheck] = useState(checkState);
    const isIncludes = data.name.includes(searchData);

    useEffect(() => {
        if (checkState) {
            setItems(prev => [...prev, {id: data.id, text: [data.name], htmlFor: `modalProject${data.id}`}]);
        }
    }, [checkState]);

    const onChange = e => {
        setIsCheck(e.target.checked);
        e.target.checked ?
            setItems(prev => [...prev, {id: data.id, text: [data.name], htmlFor: `modalProject${data.id}`}])
            : setItems(prev => prev.filter(e => e.id !== data.id));
    }

    return (
        <li className={`${s.listItem} ${isCheck ? s.active : ''} ${isIncludes ? '' : s.hide}`}>
            <label className={s.checkbox}>
                <input id={`modalProject${data.id}`} {...register} value={data.id} type="checkbox" onInput={onChange}/>
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1.5L4.75 9.75L1 6" stroke="#86E28A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </label>
            <div className={s.listIcon}>
                <img src={projectIcon} alt=""/>
            </div>
            <p>{data.name}</p>
        </li>
    );
};

const FormListProjects = ({register, searchData, setItems, server, projects}) => {
    return (
        <ul className={s.list}>
            {projects.data?.result.map(item =>
                <ListItem key={item.id}
                          searchData={searchData}
                          register={register}
                          data={item}
                          setItems={setItems}
                          checkState={item.settingResponse?.servers?.filter(e => e.serverId === server?.id).length}/>
            )}
        </ul>
    );
};

export default FormListProjects;