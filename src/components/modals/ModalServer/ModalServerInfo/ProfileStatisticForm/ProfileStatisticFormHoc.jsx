import React, {useState} from 'react';
import s from './ProfileStatisticForm.module.scss';
import ProfileStatisticForm from "./ProfileStatisticForm";
import {useForm} from "react-hook-form";
import SubmitBtn from "../../../../UI/Buttons/SubmitBtn/SubmitBtn";
import {defaultCatch, profileStatisticForm} from "../../../../../utils/tools";
import {PMService} from "../../../../../API/PMService";
import {useQuery} from "react-query";
import Loading from "../../../../UI/Loading/Loading";

const ProfileStatisticFormHoc = ({serverId, isShow, addAlert, queryClient}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {isValid}, watch, reset, setValue} = useForm({
        mode: 'onChange',
        defaultValues: profileStatisticForm(null, serverId),
    });
    const settings = useQuery(`profileStatisticSetting${serverId}`, () => serverId ? PMService.profileStatistic.getSetting(serverId) : false, {
        refetchOnWindowFocus: false,
        retry: false,
        onError: () => {},
        onSuccess: e => serverId ? reset(e.result[0]) : false,
    });

    const onSubmit = (reqData) => {
        if (serverId) {
            setIsLoading(true);
            if (reqData.id) {
                PMService.profileStatistic.change(reqData.id, {...reqData, serverId}).then(() => {
                    setIsLoading(false);
                    addAlert([{status: true, message: `Настройка статстики профилей успешно сохранена`}]);
                }).catch(e => defaultCatch(e, addAlert, setIsLoading));
            } else {
                PMService.profileStatistic.create({...reqData, serverId}).then(() => {
                    setIsLoading(false);
                    queryClient.invalidateQueries(`profileStatisticSetting${serverId}`);
                    addAlert([{status: true, message: `Настройка статстики профилей успешно сохранена`}]);
                }).catch(e => defaultCatch(e, addAlert, setIsLoading));
            }
        } else {
            addAlert([{status: false, message: 'Для создания настройки нужно создать сервер'}]);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{display: !isShow ? 'none' : ''}}>
            {settings.isLoading ? <Loading/> : ''}
            <ProfileStatisticForm register={register} watch={watch} setValue={setValue}/>
            <div className={s.buttons}>
                <SubmitBtn isLoading={isLoading} isValid={isValid}/>
            </div>
        </form>
    );
};

export default ProfileStatisticFormHoc;