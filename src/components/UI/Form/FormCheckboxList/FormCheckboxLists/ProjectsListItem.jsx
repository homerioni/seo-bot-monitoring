import React from 'react';
import s from "../FormCheckboxList.module.scss";

const ProjectsListItem = ({register, data, searchData, setItems, icon}) => {
    const isIncludes = data.name.includes(searchData);

    const onChange = e => {
        e.target.checked ?
            setItems(prev => [...prev, {id: data.id, text: [data.name], htmlFor: `modalProject${data.id}`}])
            : setItems(prev => prev.filter(e => e.id !== data.id));
    }

    return (
        <div className={`${s.listItem} ${isIncludes ? '' : s.hide}`}>
            <input id={`modalProject${data.id}`} {...register} value={data.id} type="checkbox" onInput={onChange}/>
            <div className={s.listItemBox}>
                <label className={s.checkbox} htmlFor={`modalProject${data.id}`}>
                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1.5L4.75 9.75L1 6" stroke="#86E28A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
                <div className={s.listIcon}>
                    <img src={icon} alt=""/>
                </div>
                <p>{data.name}</p>
            </div>
        </div>
    );
};

export default ProjectsListItem;