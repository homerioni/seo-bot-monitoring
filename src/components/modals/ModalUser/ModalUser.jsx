import React, {useContext, useState} from 'react';
import Modal from "../Modal";
import s from './ModalUser.module.scss';
import InputText from "../../UI/Form/InputText/InputText";
import SubmitBtn from "../../UI/Buttons/SubmitBtn/SubmitBtn";
import {UsersAPI} from "../../../API/UsersAPI";
import {defaultCatch} from "../../../utils/tools";
import {useForm} from "react-hook-form";
import {AlertContext} from "../../../App";
import {useQueryClient} from "react-query";

const ModalUser = ({setModalUser, rolesData, data}) => {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const addAlert = useContext(AlertContext);
    const {register, handleSubmit, formState: {isValid}} = useForm({
        mode: "onChange",
        defaultValues: {...data, roles: data?.roles.map(role => role.name)}
    });

    const onSubmit = (reqData) => {
        setIsLoading(true);
        if (data) {
            UsersAPI.user.change(data.id, {...reqData, active: data.active}).then(() => {
                setIsLoading(false);
                addAlert([{status: true, message: `Пользователь ${reqData.firstName} ${reqData.lastName} успешно изменен`}]);
                setModalUser({isOpen: false});
                queryClient.invalidateQueries('usersList')
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            UsersAPI.auth.signUp(reqData).then(() => {
                setIsLoading(false);
                addAlert([{status: true, message: `Пользователь ${reqData.firstName} ${reqData.lastName} успешно создан`}]);
                setModalUser({isOpen: false});
                queryClient.invalidateQueries('usersList')
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    return (
        <Modal containerClass={s.container} onClose={() => setModalUser({isOpen: false})}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.formTitle}>
                    <div className={`${s.icon} ${data ? s.blue : ''}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="white"/>
                            <path d="M17.08 14.15C14.29 12.29 9.73996 12.29 6.92996 14.15C5.65996 15 4.95996 16.15 4.95996 17.38C4.95996 18.61 5.65996 19.75 6.91996 20.59C8.31996 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z" fill="white"/>
                        </svg>
                    </div>
                    <span>
                        {!data ?
                            'Создание нового пользователя' :
                            `Изменение пользователя "${data.firstName} ${data.lastName}"`}
                    </span>
                </div>
                <div className={s.inputsBox}>
                    <InputText register={{...register('firstName', {required: 'Обязательное поле'})}} title={'Имя'} className={s.input}/>
                    <InputText register={{...register('lastName', {required: 'Обязательное поле'})}} title={'Фамилия'} className={s.input}/>
                    <InputText register={{...register('login', {required: 'Обязательное поле'})}} title={'Логин'} className={s.input}/>
                    {!data &&
                        <InputText register={{...register('password', {required: 'Обязательное поле'})}} title={'Пароль'} className={s.input}/>}
                    <div className={s.checkboxList}>
                        <p>Выберите роли:</p>
                        <div>
                            <input style={{display: 'none'}} {...register('roles', {required: 'Обязательное поле'})} type="checkbox" value={'test'}/>
                            {rolesData?.map(role => (
                                <label key={role.id} className={s.checkbox}>
                                    <input {...register('roles', {required: 'Обязательное поле'})} type="checkbox" value={role.name}/>
                                    <i/>
                                    <span>{role.alias}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <SubmitBtn isValid={isValid} text={!data ? 'Создать' : 'Сохранить'} isLoading={isLoading}/>
            </form>
        </Modal>
    );
};

export default ModalUser;