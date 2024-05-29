import React, {useContext, useState} from 'react';
import s from './ModalAppiumProjects.module.scss';
import {AlertContext} from "../../../App";
import {useQueryClient} from "react-query";
import {useForm} from "react-hook-form";
import Modal from "../Modal";
import ModalAPHeader from "./ModalAPHeader/ModalAPHeader";
import ModalAPForm from "./ModalAPForm/ModalAPForm";
import {PMService} from "../../../API/PMService";
import {defaultCatch} from "../../../utils/tools";

const ModalAppiumProjects = ({setModalProjects, data}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {isValid}} = useForm({
        mode: 'onChange',
        defaultValues: data ? {...data, priorityType: data.priorityType === 'PRIORITY'} : {},
    });

    const onClose = () => setModalProjects({isOpen: false});

    const onSubmit = reqData => {
        setIsLoading(true);
        reqData.priorityType = reqData.priorityType ? 'PRIORITY' : 'NOT_PRIORITY';
        reqData.type = 'FAVORITES';

        if (data) {
            PMService.projectPromotion.update(data.id, reqData).then(() => {
                setIsLoading(false);
                queryClient.invalidateQueries('appiumProjects');
                addAlert([{status: true, message: `Проект ${reqData.name} успешно сохранен`}]);
                onClose();
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            PMService.projectPromotion.create(reqData).then(() => {
                setIsLoading(false);
                queryClient.invalidateQueries('appiumProjects');
                addAlert([{status: true, message: `Проект ${reqData.name} успешно создан`}]);
                onClose();
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    return (
        <Modal containerClass={s.container} onClose={onClose}>
            <ModalAPHeader data={data}/>
            <ModalAPForm register={register} onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} isValid={isValid} onClose={onClose}/>
        </Modal>
    );
};

export default ModalAppiumProjects;