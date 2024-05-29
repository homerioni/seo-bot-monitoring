import React, {useContext, useEffect, useState} from 'react';
import s from "./ModalProject.module.scss";
import Modal from "../Modal";
import ModalProjectTitle from "./ModalProjectTitle/ModalProjectTitle";
import ModalProjectForm from "./ModalProjectForm/ModalProjectForm";
import {useForm} from "react-hook-form";
import {useQuery, useQueryClient} from "react-query";
import {ProjectsAPI} from "../../../API/ProjectsAPI";
import {defaultCatch, projectForm} from "../../../utils/tools";
import {AlertContext} from "../../../App";

const ModalProject = ({setModalProject, data, servers, setModalProjectServers}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedServers, setSelectedServers] = useState(data?.settingResponse.servers.map(el => {
        return {...el, server: servers.data?.result.find(server => server.id === el.serverId)};
    }) ?? []);
    const xmlList = useQuery('yandexXML', () => ProjectsAPI.yandex.getAll(), {keepPreviousData: true});
    const metrikaList = useQuery('yandexMetrika', () => ProjectsAPI.metrika.getAll(), {keepPreviousData: true});
    const {register, handleSubmit, formState: {isValid}, watch} = useForm({
        mode: 'onChange',
        defaultValues: projectForm(data),
    });

    useEffect(() => {
        setSelectedServers(prev => prev.map(el => {
            return {...el, server: servers.data?.result.find(server => server.id === el.serverId)};
        }));
    }, [servers]);

    const onSubmit = reqData => {
        reqData.phrases = reqData.phrases.trim().split('\n');
        if (reqData.yandexMetricaAccountId === 'undefined') {
            delete reqData.yandexMetricaAccountId;
        }
        setIsLoading(true);
        if (data) {
            ProjectsAPI.settings.update(reqData).then(() => {
                setIsLoading(false);
                addAlert([{status: true, message: 'Изменения проекта успешно сохранено'}]);

                ProjectsAPI.settings.assignAccount({accIds: reqData.accIds, projectId: data.id}).then(() => {
                    queryClient.invalidateQueries('projects');
                }).catch(e => defaultCatch(e, addAlert, setIsLoading));

                ProjectsAPI.settings.assignServers({
                    projectId: data.id,
                    servers: selectedServers.map(el => {return {path: el.path, serverId: el.serverId}})
                }).then(() => {
                    queryClient.invalidateQueries('projects');
                }).catch(e => {
                    defaultCatch(e, addAlert, setIsLoading);
                    queryClient.invalidateQueries('projects');
                });
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            ProjectsAPI.project.create(reqData).then(resp => {
                setIsLoading(false);
                addAlert([{status: true, message: 'Проект успешно создан'}]);
                setModalProject({isOpen: false});

                if (reqData.accIds?.length) {
                    ProjectsAPI.settings.assignAccount({accIds: reqData.accIds, projectId: resp.result[0].id}).then(() => {
                        queryClient.invalidateQueries('projects');
                    }).catch(e => defaultCatch(e, addAlert, setIsLoading));
                }

                if (selectedServers?.length) {
                    ProjectsAPI.settings.assignServers({
                        projectId: resp.result[0].id,
                        servers: selectedServers.map(el => {return {path: el.path, serverId: el.serverId}})
                    }).then(() => {
                        queryClient.invalidateQueries('projects');
                    }).catch(e => {
                        defaultCatch(e, addAlert, setIsLoading);
                        queryClient.invalidateQueries('projects');
                    });
                } else {
                    queryClient.invalidateQueries('projects');
                }
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    const onCancel = () => setModalProject({isOpen: false});

    return (
        <Modal containerClass={s.container} onClose={onCancel}>
            <ModalProjectTitle title={data?.name}/>
            <ModalProjectForm register={register}
                              data={data}
                              setModalProjectServers={setModalProjectServers}
                              onSubmit={handleSubmit(onSubmit)}
                              isValid={isValid}
                              isLoading={isLoading}
                              xmlList={xmlList}
                              metrikaList={metrikaList}
                              watch={watch}
                              selectedServers={selectedServers}
                              setSelectedServers={setSelectedServers}
                              servers={servers}
                              onCancel={onCancel}/>
        </Modal>
    );
};

export default ModalProject;