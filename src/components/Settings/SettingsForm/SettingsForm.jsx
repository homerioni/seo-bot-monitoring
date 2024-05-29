import React, {useContext, useEffect} from 'react';
import s from './SettingsForm.module.scss';
import SettingsFormButtons from "./SettingsFormButtons/SettingsFormButtons";
import {useForm} from "react-hook-form";
import {getErrorMessage, settingsForm} from "../../../utils/tools";
import {PMService} from "../../../API/PMService";
import {AlertContext} from "../../../App";
import {useQueryClient} from "react-query";
import settings from "../Settings";

const SettingsForm = ({data, setAddForm}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const {register, handleSubmit, formState: {isValid}, setValue} = useForm({
        mode: 'onChange',
        defaultValues: settingsForm(data)
    });

    useEffect(() => {
        const defValue = settingsForm(data);
        setValue('id', defValue.id);
        setValue('name', defValue.name);
        setValue('iconLink', defValue.iconLink);
    }, [data]);

    const onSubmit = (reqData) => {
        const successHandle = () => {
            queryClient.invalidateQueries('settings');
            addAlert([{status: true, message: `Тип ${reqData.name} успешно сохранен`}]);
            setAddForm({isOpen: false});
        };

        if (reqData.id) {
            PMService.settingsType.change(reqData.id, reqData).then(resp => successHandle()).catch(e => addAlert(getErrorMessage(e)));
        } else {
            PMService.settingsType.create(reqData).then(resp => successHandle()).catch(e => addAlert(getErrorMessage(e)));
        }
    }

    return (
        <form className={s.main} onSubmit={handleSubmit(onSubmit)}>
            <p className={s.title}>{data ? 'Редактирование' : 'Добавить ещё тип'}</p>
            <div className={s.form}>
                <div>
                    <p className={s.itemName}>ссылка на иконку</p>
                    <label className={`${s.label} ${s.link}`}>
                        <input {...register('iconLink', {required: 'Обязательное поле'})}/>
                    </label>
                </div>
                <div>
                    <p className={s.itemName}>Название</p>
                    <label className={`${s.label} ${s.name}`}>
                        <input {...register('name', {required: 'Обязательное поле'})}/>
                    </label>
                </div>
            </div>
            <SettingsFormButtons isValid={isValid} setAddForm={setAddForm}/>
        </form>
    );
};

export default SettingsForm;