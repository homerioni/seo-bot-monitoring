import React, {useContext, useState} from 'react';
import s from './ThreadForm.module.scss';
import {useForm} from "react-hook-form";
import ThreadFormText from "./ThreadFormText/ThreadFormText";
import ThreadFormIcon from "./ThreadFormIcon/ThreadFormIcon";
import ThreadFormRadio from "./ThreadFormRadio/ThreadFormRadio";
import {PMService} from "../../../../../API/PMService";
import {useQueryClient} from "react-query";
import {AlertContext} from "../../../../../App";
import {defaultCatch} from "../../../../../utils/tools";
import SubmitBtn from "../../../../UI/Buttons/SubmitBtn/SubmitBtn";
import SelectTextList from "../../../../UI/Form/SelectTextList/SelectTextList";

const ThreadForm = ({thread, settingsType}) => {
    const queryClient = useQueryClient();
    const addAlert = useContext(AlertContext);
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {isValid}, watch} = useForm({
        mode: 'onChange',
        defaultValues: {...thread, settingsTypeId: String(thread.settingsTypeId), isSendingCopies: String(thread.isSendingCopies)},
    });

    const onSubmit = (data) => {
        setIsLoading(true);
        if (thread.id) {
            PMService.settings.change(thread.id, data).then(resp => {
                setIsLoading(false);
                addAlert([{status: true, message: `Поток ${resp.result[0].name} успешно сохранен`}]);
                queryClient.invalidateQueries([`threads${thread.server.id}`]);
                queryClient.invalidateQueries([`servers`]);
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            PMService.settings.create(data).then(resp => {
                setIsLoading(false);
                addAlert([{status: true, message: `Поток ${resp.result[0].name} успешно сохранен`}]);
                queryClient.invalidateQueries([`threads${thread.serverId}`]);
                queryClient.invalidateQueries([`servers`]);
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    return (
        <form className={s.main} onSubmit={handleSubmit(onSubmit)}>
            <ThreadFormIcon register={{...register("settingsTypeId", {required: 'Обязательное поле'})}}
                            settingsType={settingsType}
                            watch={watch}/>
            <ThreadFormText className={s.flex20}
                            register={{...register("name", {required: 'Обязательное поле'})}}
                            title={'Название'}
                            tooltip={'Наименование потока'}/>
            <ThreadFormRadio register={{...register("isSendingCopies", {required: 'Обязательное поле'})}}
                             title={'РЕЖИМ ОТПРАВКИ'}
                             tooltip={'Режим отправки профилей с потока. Копирование - копирует во все указанные папки. Распределение - распределяет по указанным папкам.'}
                             radioNames={['Копирование', 'Распределение']}
                             values={['true', 'false']}
                             watch={watch}/>
            <ThreadFormText className={s.flex25}
                            register={{...register("sendingPeriod", {required: 'Обязательное поле'})}}
                            title={'Период отправки (мин)'}
                            tooltip={'Периодичность с которой будет производится отправка профилей.'}
                            placeholder={"Например, 25"}
                            inputType={'number'}/>
            <ThreadFormText className={s.flex25}
                            register={{...register("numberOfProfiles", {required: 'Обязательное поле'})}}
                            title={'Кол-во профилей'}
                            tooltip={'Кол-во профилей в отправляемом пакете.'}
                            placeholder={"Например, 3000"}
                            inputType={'number'}/>
            <ThreadFormText className={s.flex25}
                            register={{...register("maxSuccessTransferredProfilesPerDay", {required: 'Обязательное поле'})}}
                            title={'лимит отправки в сутки'}
                            tooltip={'Количество профилей которое можно отправить за сутки.'}
                            placeholder={"Например, 3000"}
                            inputType={'number'}/>
            <ThreadFormText className={s.flex50}
                            register={{...register("folderForReading", {required: 'Обязательное поле'})}}
                            title={'директория откуда'}
                            tooltip={<>Директория из которой будут отправляться профили.<br/>Примеры при разных настройках типа BAS:<br/>По полному пути:<br/>{'D:\\folder\\6-2-2024\\00-24\\desktop'}<br/>С учетом времени:<br/>{'D:\\folder'}<br/>{'Во втором случае передача будет осуществляться из папки "D:\\folder\\{дата}\\...\\{название потока}"'}</>}
                            placeholder={"Путь к директории"}/>
            <SelectTextList className={s.flex25}
                            register={{...register("basType")}}
                            list={[{name: 'По полному пути', val: 'FULL_PATH'}, {name: 'С учетом времени', val: 'TIME'}]}
                            selectedWatch={watch('basType')}
                            title={'Тип BAS'}/>
            <div className={s.flex100}>
                <SubmitBtn isValid={isValid} isLoading={isLoading}/>
            </div>
        </form>
    );
};

export default ThreadForm;