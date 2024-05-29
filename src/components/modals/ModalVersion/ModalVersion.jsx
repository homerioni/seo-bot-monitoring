import React, {useContext, useState} from 'react';
import s from './ModalVersion.module.scss';
import Modal from "../Modal";
import ModalVersionHeader from "./ModalVersionHeader/ModalVersionHeader";
import ModalVersionInfo from "./ModalVersionInfo/ModalVersionInfo";
import ModalVersionInput from "./ModalVersionInput/ModalVersionInput";
import ModalVersionButtons from "./ModalVersionButtons/ModalVersionButtons";
import {useForm} from "react-hook-form";
import {PMService} from "../../../API/PMService";
import {AlertContext} from "../../../App";
import {useQueryClient} from "react-query";
import {defaultCatch} from "../../../utils/tools";

const ModalVersion = ({setIsOpenModalVersion}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [close, setClose] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    const [percent, setPercent] = useState(0);
    const {register, handleSubmit, formState: {isValid}} = useForm({mode: 'onChange'});

    const progress = (percent) => setPercent(percent);

    const onSubmit = (data) => {
        setIsUpload(true);
        PMService.version.upload(data.versionName, data.file[0], progress).then(resp => {
            queryClient.invalidateQueries('version');
            addAlert([{status: true, message: `Файл ${resp.fileName} успешно загружен!`}]);
            setClose(true);
        }).catch(e => defaultCatch(e, addAlert, setIsUpload));
    };

    return (
        <Modal containerClass={s.container} onClose={() => setIsOpenModalVersion(false)} close={close}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalVersionHeader register={register}/>
                {isUpload ? <ModalVersionInfo percent={percent}/> : ''}
                <ModalVersionInput register={register}/>
                <ModalVersionButtons setClose={setClose} isValid={isValid}/>
            </form>
        </Modal>
    );
};

export default ModalVersion;