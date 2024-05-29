import React, {useEffect, useState} from 'react';
import s from "./EthernetHeaderInfo.module.scss";
import EthernetHeaderInfoButtons from "./EthernetHeaderInfoButtons/EthernetHeaderInfoButtons";
import {useForm} from "react-hook-form";
import {PMService} from "../../../../../../../API/PMService";
import {defaultCatch} from "../../../../../../../utils/tools";

const EthernetFormIp = ({testSettings, serverId, addAlert, queryClient, token}) => {
    const [isEdit, setIsEdit] = useState(false);
    const {register, handleSubmit, setValue} = useForm({
        mode: 'onChange',
        defaultValues: {staticIp: testSettings?.staticIp},
    });

    useEffect(() => {
        setValue('staticIp', testSettings?.staticIp);
    }, [testSettings]);

    const onSubmit = reqData => {
        if (testSettings) {
            PMService.testConnection.change(testSettings.id, {...testSettings, ...reqData}).then(() => {
                queryClient.invalidateQueries(`testSettings${token}`);
                addAlert([{status: true, message: `Настройка тестирования соединения успешно сохранена`}]);
            }).catch(e => defaultCatch(e));
        } else {
            PMService.testConnection.create({
                active: true,
                interval: 10,
                serverId: serverId,
                staticIp: reqData.staticIp
            }).then(() => {
                queryClient.invalidateQueries(`testSettings${token}`);
                addAlert([{status: true, message: `Настройка тестирования соединения успешно создана`}]);
            }).catch(e => defaultCatch(e));
        }
    };

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <p>Статический IP:</p>
            <div className={s.labelBox}>
                <label className={s.label}>
                    <input {...register('staticIp', {required: true})} disabled={!isEdit} placeholder='не задан'/>
                </label>
                <EthernetHeaderInfoButtons isEdit={isEdit} setIsEdit={setIsEdit}/>
            </div>
        </form>
    );
};

export default EthernetFormIp;