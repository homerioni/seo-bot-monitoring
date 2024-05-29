import React, {useEffect, useState} from 'react';
import s from './ServerConfig.module.scss';
import ServerConfigItem from "./ServerConfigItem/ServerConfigItem";
import {useQuery} from "react-query";
import {PMService} from "../../../../../API/PMService";
import Loading from "../../../../UI/Loading/Loading";
import EmptyData from "../../../../UI/EmptyData/EmptyData";

const ServerConfig = ({server}) => {
    const config = useQuery(`config${server?.id}`, () => PMService.accessory.getForServer(server.id), {keepPreviousData: true, refetchOnWindowFocus: false});
    const [accessory, setAccessory] = useState(null);

    useEffect(() => {
        const set = {PROCESSOR: [], HARD_DRIVE: [], RAM: [], VIDEO_ADAPTER: [], POWER_SUPPLY: [], THERMAL_PASTE: []};
        config.data?.result.forEach(item => {
            set[item.type].push(item);
        });

        const PROCESSOR = set.PROCESSOR.length > 0 ? [{...set.PROCESSOR[0], qty: set.PROCESSOR.length}] : [];
        const RAM = set.RAM.length > 0 ? [{...set.RAM[0], qty: set.RAM.length}] : [];

        setAccessory([
            ...PROCESSOR,
            ...RAM,
            ...set.HARD_DRIVE,
            ...set.VIDEO_ADAPTER,
            ...set.POWER_SUPPLY,
            ...set.THERMAL_PASTE
        ]);
    }, [config.data]);

    return (
        <div>
            <div className={s.list}>
                {config.isLoading && <Loading/>}
                {accessory && accessory.length ?
                    accessory.map(item => <ServerConfigItem key={`${item.type}${item.id}`} data={item}/>)
                    : <><i/><i/><EmptyData/></>}
            </div>
        </div>
    );
};

export default ServerConfig;