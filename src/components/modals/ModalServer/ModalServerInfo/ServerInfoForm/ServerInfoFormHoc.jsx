import React, {useState} from 'react';
import ServerInfoForm from "./ServerInfoForm";
import {useForm} from "react-hook-form";
import {getFullIp, serverInfoForm} from "../../../../../utils/tools";
import {changeServer, createServer} from "../ModalServerInfoHandle";
import ButtonsForm from "../../../../UI/Buttons/ButtonsForm/ButtonsForm";
import {useIsSavedForm} from "../../../../../hooks/useIsSavedForm";

const ServerInfoFormHoc = ({server, projects, addAlert, queryClient, projectsResult, setServer, setIsClose, setTabs, antiCaptcha, isShow, locations}) => {
    const [isLoading, setIsLoading] = useState();
    const {register, handleSubmit, formState: {errors, isValid, isSubmitSuccessful, isDirty, isSubmitting}, watch, reset} = useForm({
        mode: 'onChange',
        defaultValues: serverInfoForm(server, projects),
    });
    const isSaved = useIsSavedForm(reset, isSubmitSuccessful, isSubmitting, isDirty);

    const onSubmit = (data) => {
        if (data.purpose === 'ANOTHER') data.purpose = data.anotherPurpose;
        data.ip = getFullIp(data.ip);
        setIsLoading(true);

        if (server) {
            changeServer(server, data, setIsLoading, queryClient, setServer, addAlert, projectsResult);
        } else {
            createServer(server, data, setIsLoading, queryClient, setServer, addAlert, setTabs, projectsResult);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{display: !isShow ? 'none' : ''}}>
            <ServerInfoForm register={register} errors={errors} watch={watch} server={server} projects={projects} antiCaptcha={antiCaptcha} locations={locations}/>
            <ButtonsForm isSaved={isSaved} isLoading={isLoading} isValid={isValid} cancelClick={() => setIsClose(true)} CancelText={'Отменить создание'}/>
        </form>
    );
};

export default ServerInfoFormHoc;