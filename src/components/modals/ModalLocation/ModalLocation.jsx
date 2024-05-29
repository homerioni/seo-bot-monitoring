import React, {useContext, useState} from 'react';
import s from './ModalLocation.module.scss';
import Modal from "../Modal";
import ModalLocationTitle from "./ModalLocationTitle/ModalLocationTitle";
import ModalLocationContent from "./ModalLocationContent/ModalLocationContent";
import ButtonsForm from "../../UI/Buttons/ButtonsForm/ButtonsForm";
import {useForm} from "react-hook-form";
import {PMService} from "../../../API/PMService";
import {useQueryClient} from "react-query";
import {AlertContext} from "../../../App";
import {defaultCatch} from "../../../utils/tools";

const ModalLocation = ({setModalLocation, data}) => {
    const queryClient = useQueryClient();
    const addAlert = useContext(AlertContext);
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {isValid}} = useForm({
        mode: 'onChange',
        defaultValues: {name: data?.name ?? '', jsonScheme: ''},
    });

    const onClose = () => setModalLocation({isOpen: false});

    const onSubmit = reqData => {
        setIsLoading(true)
        if (data) {
            PMService.location.update(data.id, reqData).then(resp => {
                setIsLoading(false);
                queryClient.invalidateQueries('locations');
                setModalLocation({isOpen: true, data: resp.result[0]});
                addAlert([{status: true, message: `Локация ${reqData.name} успешно сохранена`}]);
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            PMService.location.create(reqData).then(resp => {
                setIsLoading(false);
                queryClient.invalidateQueries('locations');
                setModalLocation({isOpen: true, data: resp.result[0]});
                addAlert([{status: true, message: `Локация ${reqData.name} успешно сохранена`}]);
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    return (
        <Modal containerClass={s.container} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalLocationTitle register={register} data={data}/>
                <div className={s.content}>
                    <ModalLocationContent type={'camera'}/>
                    <ModalLocationContent type={'degree'}/>
                    <ModalLocationContent type={'socket'}/>
                </div>
                <ButtonsForm isValid={isValid} isLoading={isLoading} cancelClick={onClose}/>
            </form>
        </Modal>
    );
};

export default ModalLocation;