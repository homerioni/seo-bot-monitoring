import React, {useContext, useState} from 'react';
import s from './ModalAuth.module.scss';
import {AlertContext} from "../../../App";
import {useForm} from "react-hook-form";
import Modal from "../Modal";
import ModalAuthTitle from "./ModalAuthTitle/ModalAuthTitle";
import ModalAuthForm from "./ModalAuthForm/ModalAuthForm";
import {updateTokenUsers, UsersAPI} from "../../../API/UsersAPI";
import {updateTokenPM} from "../../../API/PMService";
import {updateTokenProjects} from "../../../API/ProjectsAPI";
import SubmitBtn from "../../UI/Buttons/SubmitBtn/SubmitBtn";

const ModalAuth = ({queryClient, setIsAuth}) => {
    const addAlert = useContext(AlertContext);
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {isValid}, reset} = useForm({
        mode: "onChange",
    });

    const onSubmit = (reqData) => {
        setIsLoading(true);
        UsersAPI.auth.signIn(reqData).then(resp => {
            setIsLoading(false);
            localStorage.setItem('jwtToken', resp.result.jwtToken);
            localStorage.setItem('refreshToken', resp.result.refreshToken);
            updateTokenUsers(resp.result.jwtToken);
            updateTokenPM(resp.result.jwtToken);
            updateTokenProjects(resp.result.jwtToken);
            queryClient.invalidateQueries();
            setIsAuth(true);
        }).catch(e => {
            setIsLoading(false);
            addAlert([{status: false, message: e.response?.data?.error?.message}]);
            reset({password: ''});
        });
    };

    return (
        <Modal containerClass={s.container}>
            <ModalAuthTitle/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalAuthForm register={register}/>
                <SubmitBtn className={s.btn} isValid={isValid} isLoading={isLoading} text={'Войти'}/>
            </form>
        </Modal>
    );
};

export default ModalAuth;