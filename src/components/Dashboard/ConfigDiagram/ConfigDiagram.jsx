import React, {useEffect, useMemo, useState} from 'react';
import s from './ConfigDiagram.module.scss';
import ConfigDiagramHeader from "./ConfigDiagramHeader";
import ConfigDiagramContent from "./ConfigDiagramContent/ConfigDiagramContent";
import Loading from "../../UI/Loading/Loading";
import EmptyData from "../../UI/EmptyData/EmptyData";

const ConfigDiagram = ({title, type, servers, configs, setModalConfigFilter}) => {
    const [selectedConfigs, setSelectedConfigs] = useState(!!localStorage.getItem(`configDiagram${type}`) ? localStorage.getItem(`configDiagram${type}`).split(',') : []);
    const configsList = useMemo(() => {
        const list = {qty: 0, result: []};

        for (let key in configs) {
            const serversData = configs[key]?.servers.filter(el => el.purpose.toLowerCase() === type);
            if (serversData.length && !selectedConfigs?.includes(key)) {
                list.qty += serversData.length;
                list.result.push({data: configs[key].data, servers: serversData});
            }
        }

        list.result.sort((a, b) => b.servers?.length - a.servers?.length);

        return list;
    }, [configs, selectedConfigs]);

    useEffect(() => localStorage.setItem(`configDiagram${type}`, selectedConfigs), [selectedConfigs]);

    return (
        <div className={s.main}>
            {servers.isLoading && <Loading/>}
            <ConfigDiagramHeader title={title} setModalConfigFilter={setModalConfigFilter}
                                 setSelectedConfigs={setSelectedConfigs} selectedConfigs={selectedConfigs}/>
            {configsList?.qty === 0 ? <EmptyData/> : <ConfigDiagramContent configsList={configsList}/>}
        </div>
    );
};

export default ConfigDiagram;