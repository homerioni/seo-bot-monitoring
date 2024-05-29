import React, {useState} from 'react';
import s from './ModalProjectServerForm.module.scss';
import {useForm} from "react-hook-form";
import InputText from "../../../UI/Form/InputText/InputText";
import ProjectServersList from "./ProjectServersList/ProjectServersList";
import SubmitBtn from "../../../UI/Buttons/SubmitBtn/SubmitBtn";

const ModalProjectServerForm = ({servers, setter, onClose, selectedServers, data}) => {
    const [selectedServer, setSelectedServer] = useState(data?.server ?? null);
    const {register, handleSubmit, formState: {isValid}} = useForm({
        mode: 'onChange',
        defaultValues: {
            serverId: data?.serverId ?? '',
            path: data?.path ?? '',
        }
    });

    const onSubmit = reqData => {
        if (data) {
            setter(prev => prev.map(el => {
                if (el.serverId == data.serverId) return {...reqData, server: selectedServer}
                return el
            }));
        } else {
            setter(prev => [...prev, {...reqData, server: selectedServer}]);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.main}>
            <ProjectServersList servers={servers}
                                register={register}
                                data={data}
                                selectedServer={selectedServer}
                                setSelectedServer={setSelectedServer}
                                selectedServers={selectedServers}/>
            <InputText register={{...register('path', {required: true})}} title='Папка со статистикой кликов'/>
            <SubmitBtn isValid={isValid} className={s.submit}/>
        </form>
    );
};

export default ModalProjectServerForm;