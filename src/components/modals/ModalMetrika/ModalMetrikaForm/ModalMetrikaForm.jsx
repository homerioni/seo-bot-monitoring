import React, {useContext, useState} from 'react';
import s from './ModalMetrikaForm.module.scss';
import {useForm} from "react-hook-form";
import ButtonsForm from "../../../UI/Buttons/ButtonsForm/ButtonsForm";
import InputText from "../../../UI/Form/InputText/InputText";
import {defaultCatch, metrikaForm} from "../../../../utils/tools";
import {AlertContext} from "../../../../App";
import {useQueryClient} from "react-query";
import {ProjectsAPI} from "../../../../API/ProjectsAPI";

const ModalMetrikaForm = ({data, setModalMetrika}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {isValid}} = useForm({
        mode: 'onChange',
        defaultValues: metrikaForm(data),
    });

    const onSubmit = (reqData) => {
        setIsLoading(true);
        if (data) {
            ProjectsAPI.metrika.update(data.id, reqData).then(resp => {
                setIsLoading(false);
                queryClient.invalidateQueries('metrika');
                addAlert([{status: true, message: `Изменения для аккаунта #${resp.result[0].id - 999} успешно сохранены`}]);
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            ProjectsAPI.metrika.create(reqData).then(resp => {
                setIsLoading(false);
                queryClient.invalidateQueries('metrika');
                addAlert([{status: true, message: `Аккаунт #${resp.result[0].id - 999} успешно создан`}]);
                setModalMetrika({isOpen: false});
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <div className={s.content}>
                <InputText register={{...register('token', {required: true})}} title='токен' className={s.flex50}/>
                <InputText register={{...register('name', {required: true})}} title='id-счетчика' className={s.flex50}/>
            </div>
            <ButtonsForm isValid={isValid} isLoading={isLoading}/>
        </form>
    );
};

export default ModalMetrikaForm;