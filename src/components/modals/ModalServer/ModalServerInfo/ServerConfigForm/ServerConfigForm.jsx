import React, {useContext, useState} from 'react';
import s from './ServerConfigForm.module.scss';
import ServerConfigFormItem from "./ServerConfigFormItem/ServerConfigFormItem";
import TextAddBtn from "../../../../UI/Buttons/TextAddBtn/TextAddBtn";
import {useForm} from "react-hook-form";
import {PMService} from "../../../../../API/PMService";
import {AlertContext} from "../../../../../App";
import {useQueryClient} from "react-query";
import {defaultCatch, getAccessoryForm} from "../../../../../utils/tools";
import SubmitBtn from "../../../../UI/Buttons/SubmitBtn/SubmitBtn";

const ServerConfigForm = ({isShow, accessoryData, server, config}) => {
    const defaultData = getAccessoryForm(config.data?.result);
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [qtyValues, setQtyValues] = useState({cpu: defaultData.accessories[0]?.ids?.length || 1, ram: defaultData.accessories[1]?.ids?.length || 1});
    const {register, handleSubmit, formState: {isValid}, watch, resetField} = useForm({
        mode: 'onChange',
        defaultValues: defaultData
    });

    const onAddHardDrive = () => resetField(`accessories[2].ids`, {defaultValue: [...watch(`accessories[2].ids`), '']});
    const onDelHardDrive = (arr, index) => resetField(`accessories[2].ids`, {defaultValue: arr.filter((el, i) => index !== i)})

    const onSubmit = reqData => {
        if (server?.id) {
            setIsLoading(true);
            reqData.accessories[0].ids = Array.from({length: qtyValues.cpu}, () => reqData.accessories[0].ids[0]);
            reqData.accessories[1].ids = Array.from({length: qtyValues.ram}, () => reqData.accessories[1].ids[0]);
            reqData.serverId = server.id;
            reqData.accessories = reqData.accessories.map(el => {
                if (!el.ids[0]) return {...el, ids: []};
                return el;
            });
            PMService.accessory.assign(reqData).then(() => {
                setIsLoading(false);
                addAlert([{status: true, message: `Конфигурация для сервера ${server?.name} успешно сохранена`}]);
                queryClient.invalidateQueries(`config${server.id}`);
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            addAlert([{status: false, message: `Ошибка: сервер не создан!`}]);
        }
    };

    return (
        <form className={s.main} onSubmit={handleSubmit(onSubmit)} style={{display: !isShow ? 'none' : ''}}>
            <div className={s.content}>
                <ServerConfigFormItem type='PROCESSOR'
                                      title='Процессор'
                                      accessoryData={accessoryData}
                                      register={{...register('accessories[0].ids[0]')}}
                                      setQtyValue={val => setQtyValues({...qtyValues, cpu: val})}
                                      qtyValue={qtyValues.cpu}
                                      selectId={watch('accessories[0].ids[0]')}
                                      className={s.flex50}
                                      isQtyBox={true}/>
                <ServerConfigFormItem type='RAM'
                                      title='RAM'
                                      accessoryData={accessoryData}
                                      register={{...register('accessories[1].ids[0]')}}
                                      setQtyValue={val => setQtyValues({...qtyValues, ram: val})}
                                      qtyValue={qtyValues.ram}
                                      selectId={watch('accessories[1].ids[0]')}
                                      className={s.flex50}
                                      isQtyBox={true}
                                      isRam={true}/>
                <div className={s.flexBox}>
                    <div className={s.title}>SSD / HDD</div>
                    {watch(`accessories[2].ids`).length ?
                        watch(`accessories[2].ids`).map((e, i, arr) =>
                            <ServerConfigFormItem key={Math.random()}
                                                  type='HARD_DRIVE'
                                                  accessoryData={accessoryData}
                                                  register={{...register(`accessories[2].ids[${i}]`)}}
                                                  selectId={watch(`accessories[2].ids[${i}]`)}
                                                  delClick={() => onDelHardDrive(arr, i)}
                                                  className={s.flex50}/>)
                        :
                        <ServerConfigFormItem key={Math.random()}
                                              type='HARD_DRIVE'
                                              accessoryData={accessoryData}
                                              register={{...register(`accessories[2].ids[0]`)}}
                                              selectId={watch(`accessories[2].ids[0]`)}
                                              delClick={() => onDelHardDrive([], 0)}
                                              className={s.flex50}/>}
                    <TextAddBtn className={s.addBtn} text='Еще SSD' type='button' onClick={onAddHardDrive}/>
                </div>
                <ServerConfigFormItem type='VIDEO_ADAPTER'
                                      title='Видеокарта'
                                      accessoryData={accessoryData}
                                      register={{...register('accessories[3].ids[0]')}}
                                      selectId={watch('accessories[3].ids[0]')}
                                      className={s.flex33}/>
                <ServerConfigFormItem type='POWER_SUPPLY'
                                      title='Блок питания'
                                      accessoryData={accessoryData}
                                      register={{...register('accessories[4].ids[0]')}}
                                      selectId={watch('accessories[4].ids[0]')}
                                      className={s.flex33}/>
                <ServerConfigFormItem type='THERMAL_PASTE'
                                      title='Термопаста'
                                      accessoryData={accessoryData}
                                      register={{...register('accessories[5].ids[0]')}}
                                      selectId={watch('accessories[5].ids[0]')}
                                      className={s.flex33}/>
            </div>
            <div className={s.flex100}>
                <SubmitBtn isLoading={isLoading} isValid={isValid}/>
            </div>
        </form>
    );
};

export default ServerConfigForm;