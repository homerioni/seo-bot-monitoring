import React, {useContext, useState} from 'react';
import s from './ModalRouterForm.module.scss';
import {useForm} from "react-hook-form";
import ButtonsForm from "../../../../UI/Buttons/ButtonsForm/ButtonsForm";
import InputText from "../../../../UI/Form/InputText/InputText";
import ServersSelectList from "../../../../UI/Form/ServersSelectList/ServersSelectList";
import AddBtn from "../../../../headers/AddBtn/AddBtn";
import DelBtnForInput from "../../../../UI/Buttons/DelBtnForInput/DelBtnForInput";
import {PMService} from "../../../../../API/PMService";
import {defaultCatch, getFullIp, networkForm} from "../../../../../utils/tools";
import {AlertContext} from "../../../../../App";
import {useQueryClient} from "react-query";

const ModalRouterForm = ({data, servers, setModalNetwork}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [serversQty, setServersQty] = useState(data?.servers.length ?? 1);
    const {register, handleSubmit, formState: {isValid}, watch, reset} = useForm({
        mode: 'onChange',
        defaultValues: networkForm(data),
    });

    const onSubmit = reqData => {
        setIsLoading(true);
        reqData.ip = getFullIp(reqData.ip, false);
        if (data) {
            PMService.network.change(data.id, reqData).then(() => {
                setIsLoading(false);
                addAlert([{status: true, message: `Сеть ${reqData.name} успешно сохранена`}]);
                queryClient.invalidateQueries('ROUTER');
                setModalNetwork({isOpen: true, type: 'ROUTER', data: {...reqData, id: data.id}});
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            PMService.network.createRouter(reqData).then(resp => {
                setIsLoading(false);
                addAlert([{status: true, message: `Сеть ${reqData.name} успешно добавлена`}]);
                queryClient.invalidateQueries('ROUTER');
                setModalNetwork({isOpen: true, type: 'ROUTER', data: resp.result[0]});
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    const onDel = index => {
        if (serversQty > 1) {
            reset({...watch(), servers: watch('servers').filter((e, i) => i !== index)});
            setServersQty(prev => --prev);
        } else {
            reset({...watch(), servers: [{id: '', serverPort: '', updatePort: ''}]});
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.form}>
                <InputText register={{...register('name', {required: true})}} title='Название' className={s.flex33}/>
                <InputText register={{...register('ip', {required: true})}} title='ip-адрес' className={s.flex33}/>
                <InputText register={{...register('location', {required: true})}} title='локация' className={s.flex33}/>
            </div>
            <div className={s.formList}>
                <div className={s.title}>
                    <p>Подключенные серверы</p>
                </div>
                {Array.from({length: serversQty}, (e, index) => (
                    <div key={index} className={s.serverForm}>
                        <ServersSelectList selectedWatch={watch(`servers[${index}].id`)}
                                           register={{...register(`servers[${index}].id`, {required: true})}}
                                           list={servers.data?.result}
                                           className={s.flex33}
                                           title={index === 0 && 'Выберете сервер'}/>
                        <InputText register={{...register(`servers[${index}].serverPort`, {required: true})}} type='number' title={index === 0 && 'порт 1. главный'} className={s.flex33}/>
                        <InputText register={{...register(`servers[${index}].updatePort`, {required: true})}} type='number' title={index === 0 && 'порт 2. перезагрузка'} className={s.flex33}/>
                        <DelBtnForInput className={s.delBtn} onClick={() => onDel(index)}/>
                    </div>
                ))}
            </div>
            <div className={s.addBox}>
                <AddBtn onClick={() => setServersQty(prev => ++prev)}/>
                <p>Еще один сервер</p>
            </div>
            <ButtonsForm isValid={isValid} isLoading={isLoading} cancelClick={() => setModalNetwork({isOpen: false})}/>
        </form>
    );
};

export default ModalRouterForm;