import React, {useContext, useState} from 'react';
import s from './ModalUpdatea.module.scss';
import Modal from "../Modal";
import ModalUpdateTitle from "./ModalUpdateTitle/ModalUpdateTitle";
import GroupFormServers from "../ModalGroup/GroupForm/GroupFormServers/GroupFormServers";
import {useForm} from "react-hook-form";
import {useQueryClient} from "react-query";
import {AlertContext} from "../../../App";
import ModalUpdateButtons from "./ModalUpdateButtons/ModalUpdateButtons";
import {PMService} from "../../../API/PMService";
import {defaultCatch, ending} from "../../../utils/tools";

const ModalUpdate = ({setIsOpenModalUpdate, setStatus, servers, version}) => {
    const queryClient = useQueryClient();
    const addAlert = useContext(AlertContext);
    const [isLoading, setIsLoading] = useState(false);
    const [close, setClose] = useState(false);
    const {register, handleSubmit, formState: {isValid}} = useForm({
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        setIsLoading(true);

        const status = {servers: {}};
        servers.data?.result
            .filter(el => data.servers.includes(String(el.id)))
            .map(el => status.servers[el.id] = 'wait');
        setStatus(status);

        PMService.server.update(version.data?.id, data.servers).then(resp => {
            queryClient.invalidateQueries('servers');
            const alertMessages = [];
            if (resp.successCount)
                alertMessages.push({status: true, message: `Успешно обновлено: ${resp.successCount} сервер${ending(resp.successCount)}`})
            if (resp.failCount)
                alertMessages.push({status: false, message: `Ошибок: ${resp.failCount} сервер${ending(resp.failCount)}`})
            addAlert(alertMessages);

            resp.servers.map(item => status.servers[item.serverId] = item.status);
            setStatus(status);
        }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        setIsOpenModalUpdate(false);
    };

    return (
        <Modal containerClass={s.container} onClose={() => setIsOpenModalUpdate(false)} close={close}>
            <ModalUpdateTitle/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <GroupFormServers register={register} servers={servers}/>
                <ModalUpdateButtons isLoading={isLoading} isValid={isValid} setClose={setClose}/>
            </form>
        </Modal>
    );
};

export default ModalUpdate;