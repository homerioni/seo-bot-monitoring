import React, {useContext, useState} from 'react';
import s from './ModalDamage.module.scss';
import Modal from "../Modal";
import ButtonsForm from "../../UI/Buttons/ButtonsForm/ButtonsForm";
import ModalDamageTitle from "./ModalDamageTitle/ModalDamageTitle";
import ModalDamageForm from "./ModalDamageForm/ModalDamageForm";
import {useForm} from "react-hook-form";
import {PMService} from "../../../API/PMService";
import {AlertContext} from "../../../App";
import {defaultCatch} from "../../../utils/tools";
import {useQueryClient} from "react-query";
import {useIsSavedForm} from "../../../hooks/useIsSavedForm";

const ModalDamage = ({setModalDamage, data}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [close, setClose] = useState(false);
    const {register, handleSubmit, formState: {isSubmitSuccessful, isDirty, isSubmitting}, reset} = useForm({
        mode: "onChange",
        defaultValues: {warmup: data?.thread?.warmup ?? ''},
    });
    const isSaved = useIsSavedForm(reset, isSubmitSuccessful, isSubmitting, isDirty);

    const onClose = () => setModalDamage({isOpen: false});

    const onSubmit = (reqData) => {
        setIsLoading(true);
        PMService.settings.change(data?.thread.id, {...data?.thread, ...reqData}).then(resp => {
            setIsLoading(false);
            queryClient.invalidateQueries(`threads${data.thread.server.id}`);
            addAlert([{status: true, message: `Восстановление профилей ${data.thread.name} сохранено успешно`}]);
        }).catch(e => defaultCatch(e, addAlert, setIsLoading));
    };

    return (
        <Modal containerClass={s.container} onClose={onClose} close={close}>
            <ModalDamageTitle thread={data?.thread}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalDamageForm register={register} number={data?.number} name={data?.thread.name}/>
                <ButtonsForm isSaved={isSaved} cancelClick={() => setClose(true)} isValid={true} isLoading={isLoading}/>
            </form>
        </Modal>
    );
};

export default ModalDamage;