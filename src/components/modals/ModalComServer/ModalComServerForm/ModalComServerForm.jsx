import React, {useState} from 'react';
import s from './ModalComServerForm.module.scss';
import {useForm} from "react-hook-form";
import ComServersList from "./ComServersList/ComServersList";
import SubmitBtn from "../../../UI/Buttons/SubmitBtn/SubmitBtn";

const ModalComServerForm = ({servers, setServerId, onClose, serverId}) => {
    const [selectedServer, setSelectedServer] = useState(servers.data?.result.find(server => server.id == serverId) ?? null);
    const {register, handleSubmit, formState: {isValid}} = useForm({
        mode: 'onChange',
        defaultValues: {
            serverId: serverId ?? '',
        }
    });

    const onSubmit = reqData => {
        setServerId(reqData.serverId);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.main}>
            <ComServersList servers={servers}
                            register={register}
                            selectedServer={selectedServer}
                            setSelectedServer={setSelectedServer}/>
            <SubmitBtn isValid={isValid} className={s.submit}/>
        </form>
    );
};

export default ModalComServerForm;