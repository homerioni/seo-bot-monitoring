import React, {useEffect, useState} from 'react';
import s from "./EthernetHeaderInfo.module.scss";
import EthernetHeaderInfoButtons from "./EthernetHeaderInfoButtons/EthernetHeaderInfoButtons";
import {useForm} from "react-hook-form";
import {PMService} from "../../../../../../../API/PMService";
import {defaultCatch} from "../../../../../../../utils/tools";

const EthernetFormTime = ({testSettings, addAlert, token, queryClient}) => {
    const [isEdit, setIsEdit] = useState(false);
    const {register, handleSubmit, setValue} = useForm({
        mode: 'onChange',
        defaultValues: {interval: testSettings?.interval},
    });

    const onSubmit = reqData => {
        PMService.testConnection.change(testSettings.id, {...testSettings, ...reqData}).then(() => {
            queryClient.invalidateQueries(`testSettings${token}`);
            addAlert([{status: true, message: `Настройка тестирования соединения успешно сохранена`}]);
        }).catch(e => defaultCatch(e));
    }

    useEffect(() => {
        setValue('interval', testSettings?.interval);
    }, [testSettings]);

    const inputActive = e => {
        let size = e.target.value.length;
        e.target.style.width = size < 1 ? '100%' : `${size}ch`;
        size < 1 ? e.target.classList.add(s.empty) : e.target.classList.remove(s.empty);
    };

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <p>Интервал:</p>
            <div className={`${s.labelBox} ${s.time}`}>
                <label className={s.label}>
                    <input {...register('interval', {required: true})} disabled={!isEdit} className={testSettings?.interval ? '' : s.empty} type='number' onInput={inputActive} placeholder='не задан'/>
                    <span>сек</span>
                </label>
                <EthernetHeaderInfoButtons isEdit={isEdit} setIsEdit={setIsEdit}/>
            </div>
        </form>
    );
};

export default EthernetFormTime;