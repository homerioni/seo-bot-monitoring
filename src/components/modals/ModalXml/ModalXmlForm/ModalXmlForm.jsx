import React, {useContext, useState} from 'react';
import s from './ModalXmlForm.module.scss';
import {useForm} from "react-hook-form";
import ButtonsForm from "../../../UI/Buttons/ButtonsForm/ButtonsForm";
import InputText from "../../../UI/Form/InputText/InputText";
import {cutIp, defaultCatch, xmlForm} from "../../../../utils/tools";
import {AlertContext} from "../../../../App";
import {useQueryClient} from "react-query";
import {ProjectsAPI} from "../../../../API/ProjectsAPI";

const ModalXmlForm = ({data, setModalXml}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {isValid}} = useForm({
        mode: 'onChange',
        defaultValues: xmlForm(data),
    });

    const onSubmit = (reqData) => {
        reqData.ipProxy = cutIp(reqData.ipProxy);
        setIsLoading(true);
        if (data) {
            ProjectsAPI.yandex.update({...reqData, id: data.id}).then(resp => {
                setIsLoading(false);
                queryClient.invalidateQueries('xml');
                addAlert([{status: true, message: `Изменения для аккаунта #${resp.result[0].id - 999} успешно сохранены`}]);
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            ProjectsAPI.yandex.create(reqData).then(resp => {
                setIsLoading(false);
                queryClient.invalidateQueries('xml');
                addAlert([{status: true, message: `Аккаунт #${resp.result[0].id - 999} успешно создан`}]);
                setModalXml({isOpen: false});
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <div className={s.content}>
                <InputText register={{...register('login', {required: true})}} title='логин аккаунта' className={s.flex33}/>
                <InputText register={{...register('key', {required: true})}} title='ключ для xml лимитов' className={s.flex33}/>
                <InputText register={{...register('ipProxy', {required: true})}} title='ip-адрес прокси' className={s.flex33}/>
                <InputText register={{...register('portProxy', {required: true})}} title='порт прокси' className={s.flex33}/>
                <InputText register={{...register('loginProxy', {required: true})}} title='логин прокси' className={s.flex33}/>
                <InputText register={{...register('passwordProxy', {required: true})}} title='пароль прокси' className={s.flex33}/>
            </div>
            <ButtonsForm isValid={isValid} isLoading={isLoading}/>
        </form>
    );
};

export default ModalXmlForm;