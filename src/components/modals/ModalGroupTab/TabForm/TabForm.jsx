import React from 'react';
import s from './TabForm.module.scss';
import TabFormItem from "./TabFormItem/TabFormItem";
import TabFormButtons from "./TabFormButtons/TabFormButtons";

const TabForm = ({setIsClose, isLoading, register, watch, isValid, groups}) => {
    return (
        <div className={s.form}>
            <TabFormItem register={register} watch={watch} groups={groups}/>
            <TabFormButtons setIsClose={setIsClose} isValid={isValid} isLoading={isLoading}/>
        </div>
    );
};

export default TabForm;