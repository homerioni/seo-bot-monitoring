import React, {useContext, useEffect, useState} from 'react';
import {AlertContext} from "../../../App";
import {useQueryClient} from "react-query";
import {useForm} from "react-hook-form";
import {PMService} from "../../../API/PMService";
import Modal from "../Modal";
import s from "./ModalManagement.module.scss";
import ModalManageHeader from "./ModalManageForm/ModalManageHeader/ModalManageHeader";
import ModalManageForm from "./ModalManageForm/ModalManageForm";
import {defaultCatch} from "../../../utils/tools";

const ModalManagement = ({setModalManagement, data, edit, appiumProjects}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const {control, register, handleSubmit, watch, setValue} = useForm({
        mode: 'onChange',
        defaultValues: data ? {...data, text: data.steps?.map(item => item.text), projectId: String(data.project.id), file: data.linkWithPhrases} : {},
    });
    const isPromotion = appiumProjects.data?.result?.find(item => item.id == watch('projectId'))?.purposeType === 'PROMOTION';

    const onClose = () => setModalManagement({isOpen: false});

    const selectList = appiumProjects.data?.result?.map(project => ({
        val: project.id,
        name: `${project.name} - ${project.purposeType === 'PROMOTION' ? 'Накрутка' : 'Прокачка'}`,
        purposeType: project.purposeType
    }));

    const fileUpload = (id, file) => {
        PMService.task.phrases(id, file).then(() => {
            addAlert([{status: true, message: `Файл с фразами успешно загружен`}]);
        }).catch(e => defaultCatch(e, addAlert, setIsLoading));
    };

    const onSubmit = reqData => {
        console.log(reqData);
        setIsLoading(true);
        const formData = new FormData();
        const file = reqData.file && reqData.file[0] ? reqData.file[0] : false;
        if (typeof file === 'object') formData.append('file', file);

        reqData.steps = reqData.text.map((item, index) => {
            const text = item;
            return {number: index + 1, text}
        });

        delete reqData.text;
        delete reqData.file;

        if (edit) {
            reqData.active = data.active;
            PMService.task.change(data.id, reqData).then(() => {
                setIsLoading(false);
                queryClient.invalidateQueries('management');
                addAlert([{status: true, message: `Задача успешно обновлена`}]);
                if (typeof file === 'object') fileUpload(data.id, formData);
                setModalManagement({isOpen: false});
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            reqData.active = false;
            PMService.task.create(reqData).then(resp => {
                setIsLoading(false);
                queryClient.invalidateQueries('management');
                addAlert([{status: true, message: `Задача успешно создана`}]);
                if (typeof file === 'object') fileUpload(resp.result[0].id, formData);
                setModalManagement({isOpen: false});
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    return (
        <Modal containerClass={s.container} onClose={onClose}>
            <ModalManageHeader edit={edit}/>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <ModalManageForm register={register}
                                 isPromotion={isPromotion}
                                 isLoading={isLoading}
                                 watch={watch}
                                 appiumProjects={appiumProjects}
                                 setValue={setValue}
                                 data={data}
                                 onClose={onClose}
								 control={control}
                                 selectList={selectList}/>
            </form>
        </Modal>
    );
};

export default ModalManagement;
