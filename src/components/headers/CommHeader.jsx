import React, {useContext, useEffect, useState} from 'react';
import HeaderAdd from "./HeaderBtnAdd/HeaderAdd";
import s from "./Header.module.scss";
import {useForm} from "react-hook-form";
import SubmitBtn from "../UI/Buttons/SubmitBtn/SubmitBtn";
import {PMService} from "../../API/PMService";
import {useQueryClient} from "react-query";
import {AlertContext} from "../../App";
import {defaultCatch} from "../../utils/tools";
import locationIcon from "../../assets/img/locationIcon.svg";
import BackLink from "./BackLink/BackLink";

const CommHeader = ({setNodes, setEdges, nodes, edges, getId, viewportData, servers, setModalComServer, setOpenServerId, location}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [schemeIsLoad, setSchemeIsLoad] = useState(false);
    const queryClient = useQueryClient();
    const addAlert = useContext(AlertContext);
    const {register, unregister, watch, setValue, reset} = useForm({
        mode: 'onChange',
        defaultValues: '',
    });

    useEffect(() => {
        if (location?.jsonScheme && !schemeIsLoad) {
            setSchemeIsLoad(true);
            location.jsonScheme.nodes.map(node => {
                node.data.register = register;
                node.data.unregister = unregister;
                node.data.watch = watch;
                if (node.type === 'table') {
                    node.data.setValue = setValue;
                }
                if (node.type === 'server') {
                    node.data.setValue = setValue;
                    node.data.setModalComServer = setModalComServer;
                    node.data.setOpenServerId = setOpenServerId;
                }
            });
            reset(location?.jsonScheme?.form);
            setNodes(location?.jsonScheme?.nodes);
            setEdges(location?.jsonScheme?.edges);
        }
    }, [location, servers]);

    const position = {
        x: (-viewportData.x + 600) / viewportData.zoom,
        y: (-viewportData.y + 100) / viewportData.zoom,
    };

    const onSubmit = () => {
        setIsLoading(true);
        const nodesData = nodes.map(item => {return {...item, data: {id: item.data.id}}});

        PMService.location.update(location?.id, {
            ...location,
            jsonScheme: JSON.stringify({nodes: nodesData, edges, form: watch(), lastId: getId()})
        }).then(() => {
            setIsLoading(false);
            queryClient.invalidateQueries('locations');
            addAlert([{status: true, message: `Схема локации "${location.name}" успешно сохранена`}]);
        }).catch(e => defaultCatch(e, addAlert, setIsLoading));
    };

    const onAddLocation = () => setNodes((nodes) => {
        const id = `location${getId()}`;
        return nodes.concat({id, type: 'location', position, data: {id, register, unregister}});
    });

    const onAddRouter = () => setNodes((nodes) => {
        const id = `router${getId()}`;
        return nodes.concat({id, type: 'router', position, data: {id, register, unregister}});
    });

    const onAddMicrotic = () => setNodes((nodes) => {
        const id = `micro${getId()}`;
        return nodes.concat({id, type: 'micro', position, data: {id, register, unregister}});
    });

    const onAddSwitch = () => setNodes((nodes) => {
        const id = `switch${getId()}`;
        return nodes.concat({id, type: 'switch', position, data: {id, register, unregister}});
    });

    const onAddServer = () => setNodes((nodes) => {
        const id = `server${getId()}`;
        return nodes.concat({id, type: 'server', position, data: {id, register, unregister, watch, setValue, servers, setModalComServer, setOpenServerId}});
    });

    const onAddTable = () => setNodes((nodes) => {
        const id = `table${getId()}`;
        return nodes.concat({id, type: 'table', position, data: {id, register, unregister, watch, setValue}});
    });

    return (
        <div className={s.main}>
            <div>
                <BackLink src={`/locations/${location?.id}`}/>
                <div className={`${s.title} ${s.flex}`}>
                    <div className={s.icon}>
                        <img src={locationIcon} alt=""/>
                    </div>
                    <span>{location?.name}</span>
                </div>
            </div>
            <div>
                <HeaderAdd text='Локация' onClick={onAddLocation}/>
                <HeaderAdd text='Роутер' onClick={onAddRouter}/>
                <HeaderAdd text='Микротик' onClick={onAddMicrotic}/>
                <HeaderAdd text='Свитч' onClick={onAddSwitch}/>
                <HeaderAdd text='Сервер' onClick={onAddServer}/>
                <HeaderAdd text='Таблица' onClick={onAddTable}/>
                <SubmitBtn isValid={true} isLoading={isLoading} type='button' onClick={onSubmit}/>
            </div>
        </div>
    );
};

export default CommHeader;