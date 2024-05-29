import React, {useContext, useState} from 'react';
import s from './ModalConfig.module.scss';
import Modal from "../Modal";
import ModalConfigHeader from "./ModalConfigHeader/ModalConfigHeader";
import {useForm} from "react-hook-form";
import ConfigFormCpu from "./ConfigForm/ConfigFormCpu";
import ConfigFormGpu from "./ConfigForm/ConfigFormGpu";
import ConfigFormPower from "./ConfigForm/ConfigFormPower";
import ConfigFormStorage from "./ConfigForm/ConfigFormStorage";
import ConfigFormRam from "./ConfigForm/ConfigFormRam";
import ConfigFormThermal from "./ConfigForm/ConfigFormThermal";
import {AlertContext} from "../../../App";
import {useQueryClient} from "react-query";
import {defaultCatch, getLink} from "../../../utils/tools";
import {PMService} from "../../../API/PMService";

const ModalConfig = ({setModalConfig, data, type}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [close, setClose] = useState(false);
    const {register, handleSubmit, formState: {isValid}, watch} = useForm({
        mode: 'onChange',
        defaultValues: data
    });

    const submitFunc = (reqData, setIsLoading, type, successMessage) => {
        reqData.type = type;
        reqData.linkToSpecification = getLink(reqData.linkToSpecification);
        setIsLoading(true);

        if (data) {
            PMService.accessory.change(data.id, type, reqData).then(resp => {
                setIsLoading(false);
                addAlert([{status: true, message: successMessage}]);
                queryClient.invalidateQueries('accessory');
                setModalConfig({isOpen: true, data: resp.result[0], type});
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            PMService.accessory.create(reqData).then(() => {
                setIsLoading(false);
                addAlert([{status: true, message: successMessage}]);
                queryClient.invalidateQueries('accessory');
                setModalConfig({isOpen: false});
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    }

    const postAttr = () => {return {register, handleSubmit, isValid, setClose, data, submitFunc}};

    return (
        <Modal containerClass={s.container} onClose={() => setModalConfig({isOpen: false})} close={close}>
            <ModalConfigHeader type={type} data={data}/>
            {{
                PROCESSOR: <ConfigFormCpu {...postAttr()}/>,
                VIDEO_ADAPTER: <ConfigFormGpu {...postAttr()}/>,
                POWER_SUPPLY: <ConfigFormPower {...postAttr()}/>,
                HARD_DRIVE: <ConfigFormStorage {...postAttr()} watch={watch}/>,
                RAM: <ConfigFormRam {...postAttr()} watch={watch}/>,
                THERMAL_PASTE: <ConfigFormThermal {...postAttr()}/>
            }[type]}
        </Modal>
    );
};

export default ModalConfig;