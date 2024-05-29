import React, {useContext, useEffect, useState} from 'react';
import s from './ServerBAS.module.scss';
import {useQuery} from "react-query";
import {PMService} from "../../../../../API/PMService";
import Loading from "../../../../UI/Loading/Loading";
import EthernetHeaderInfoButtons from "../ServerEthernet/EthernetHeader/EthernetHeaderInfo/EthernetHeaderInfoButtons/EthernetHeaderInfoButtons";
import {defaultCatch} from "../../../../../utils/tools";
import {useForm} from "react-hook-form";
import {AlertContext} from "../../../../../App";
import DelBtn from "../../../../headers/DelBtn/DelBtn";

const ServerBas = ({server, queryClient, setModalConfirm}) => {
    const cycleServer = useQuery(`cycle${server.id}`, () => PMService.performanceCycle.get([server.id]), {keepPreviousData: true, onError: () => {}, retry: false, refetchOnWindowFocus: false});
    const [isEdit, setIsEdit] = useState(false);
    const addAlert = useContext(AlertContext);
    const {register, handleSubmit, setValue} = useForm({
        mode: 'onChange',
        defaultValues: {statisticFilePath: cycleServer.data?.result[0] ? cycleServer.data?.result[0].statisticFilePath : ''},
    });

    useEffect(() => {
        setValue('statisticFilePath', cycleServer.data?.result[0] ? cycleServer.data?.result[0].statisticFilePath : '');
    }, [cycleServer.data]);

    const onSubmit = reqData => {
        if (cycleServer.data?.result[0]) {
            const id = cycleServer.data?.result[0].id;
            PMService.performanceCycle.update(id,{serverId: server.id, ...reqData}).then(() => {
                queryClient.invalidateQueries(`cycle${server.id}`);
                addAlert([{status: true, message: `Настройка цикла успешно сохранена`}]);
            }).catch(e => defaultCatch(e, addAlert));
        } else {
            PMService.performanceCycle.create({serverId: server.id, ...reqData}).then(() => {
                queryClient.invalidateQueries(`cycle${server.id}`);
                addAlert([{status: true, message: `Настройка цикла успешно создана`}]);
            }).catch(e => defaultCatch(e, addAlert));
        }
    };

    const delClick = () => {
        setModalConfirm({
            isOpen: true,
            data: {
                title: `Удалить настройку циклов BAS на сервере <b>${server.name}?</b>`,
                color: 'red',
                btnText: `Да, удалить`,
                iconType: 'server',
                onConfirm: (close) => {
                    PMService.performanceCycle.delete(cycleServer.data?.result[0].id).then(() => {
                        queryClient.setQueriesData(`cycle${server.id}`, () => null);
                        addAlert([{status: true, message: `Настройка цикла успешно удалена`}]);
                        close();
                    }).catch(e => defaultCatch(e, addAlert));
                },
            }
        })
    }

    return (
        <div className={s.main}>
            {cycleServer.isLoading && <Loading/>}
            <div>
                {cycleServer.data?.result[0] &&
                    <div className={s.buttons}>
                        <DelBtn className={s.delBtn} onClick={delClick}/>
                    </div>}
                <p className={s.title}>Настройка циклов BAS</p>
            </div>
            <div>
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <p>Путь:</p>
                    <div className={s.labelBox}>
                        <label className={s.label}>
                            <input {...register('statisticFilePath', {required: true})} disabled={!isEdit} placeholder='не задан'/>
                        </label>
                        <EthernetHeaderInfoButtons isEdit={isEdit} setIsEdit={setIsEdit}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServerBas;