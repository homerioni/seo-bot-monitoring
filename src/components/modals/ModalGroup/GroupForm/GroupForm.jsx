import React, {useContext, useState} from 'react';
import s from './GroupForm.module.scss';
import GroupFormText from "./GroupFormText/GroupFormText";
import {useForm} from "react-hook-form";
import {defaultCatch, groupForm} from "../../../../utils/tools";
import {PMService} from "../../../../API/PMService";
import {useQueryClient} from "react-query";
import {AlertContext} from "../../../../App";
import ButtonsForm from "../../../UI/Buttons/ButtonsForm/ButtonsForm";
import {useIsSavedForm} from "../../../../hooks/useIsSavedForm";
import GroupFormServers from "./GroupFormServers/GroupFormServers";

const GroupForm = ({setIsClose, servers, data, setModalGroup}) => {
    const queryClient = useQueryClient();
    const addAlert = useContext(AlertContext);
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {isValid, isDirty, isSubmitting, isSubmitSuccessful}, watch, setValue, reset} = useForm({
        mode: 'onChange',
        defaultValues: groupForm(data),
    });
    const isSaved = useIsSavedForm(reset, isSubmitSuccessful, isSubmitting, isDirty);


    const reassignGroup = (reqData) => {
        PMService.group.reassign(reqData).then(resp => {
            setIsLoading(false);
            queryClient.invalidateQueries('groups');
            setModalGroup({isOpen: true, data: resp.result[0]});
            addAlert([{status: true, message: `Группа ${reqData.name} успешно сохранена`}]);
        }).catch(e => defaultCatch(e, addAlert, setIsLoading));
    }

    const onSubmit = (reqData) => {
        setIsLoading(true);
        if (reqData.groupId) {
            reassignGroup(reqData);
        } else {
            PMService.group.create({name: reqData.name}).then(resp => {
                setValue('groupId', resp.result[0].id);
                reassignGroup({...reqData, groupId: resp.result[0].id});
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <GroupFormText register={register}/>
            <GroupFormServers servers={servers} watch={watch} register={register}/>
            <ButtonsForm cancelClick={() => setIsClose(true)} isValid={isValid} isLoading={isLoading} className={s.buttons} isSaved={isSaved}/>
        </form>
    );
};

export default GroupForm;