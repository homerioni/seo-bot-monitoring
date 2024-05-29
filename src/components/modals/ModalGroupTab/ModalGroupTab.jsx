import React, {useContext, useState} from 'react';
import s from './ModalGroupTab.module.scss';
import sModal from '../Modal.module.scss';
import TabTitle from "./TabTitle/TabTitle";
import TabForm from "./TabForm/TabForm";
import {useForm} from "react-hook-form";
import {defaultCatch, getErrorMessage, tabForm} from "../../../utils/tools";
import {PMService} from "../../../API/PMService";
import {useQueryClient} from "react-query";
import {AlertContext} from "../../../App";
import Modal from "../Modal";

const ModalGroupTab = ({setModalGroupTab, data, groups}) => {
    const queryClient = useQueryClient();
    const addAlert = useContext(AlertContext);
    const [isClose, setIsClose] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {isValid}, watch} = useForm({
        mode: 'onChange',
        defaultValues: tabForm(data),
    });

    const responseHandle = (resp, reqData) => {
        setIsLoading(false);
        queryClient.invalidateQueries('groupsTabs');
        queryClient.invalidateQueries('groups');
        setModalGroupTab({isOpen: true, data: {...resp.result[0], groupIds: reqData.groupIds}});
        addAlert([{status: true, message: `Вкладка ${reqData.name} успешно сохранена`}]);
    }

    const onSubmit = (reqData) => {
        setIsLoading(true);

        if (data) {
            PMService.groupTab.change(data.id, reqData).then(resp => responseHandle(resp, reqData)).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            PMService.groupTab.create(reqData).then(resp => responseHandle(resp, reqData)).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    return (
        <Modal onClose={() => setModalGroupTab({isOpen: false, data: null})} containerClass={s.container} close={isClose}>
            <form onSubmit={handleSubmit(onSubmit)} onClick={e => e.stopPropagation()}>
                <TabTitle data={data} register={register}/>
                <TabForm register={register}
                         setIsClose={setIsClose}
                         isValid={isValid}
                         watch={watch}
                         isLoading={isLoading}
                         groups={groups.data?.result}/>
            </form>
        </Modal>
    );
};

export default ModalGroupTab;