import React, {useEffect, useState} from 'react';
import s from './ModalServer.module.scss';
import ModalServerTitle from "./ModalServerTitle/ModalServerTitle";
import ModalServerTabs from "./ModalServerTabs/ModalServerTabs";
import {useQuery} from "react-query";
import {PMService} from "../../../API/PMService";
import ModalServerInfo from "./ModalServerInfo/ModalServerInfo";
import ModalServerThread from "./ModalServerThread/ModalServerThread";
import Modal from "../Modal";

const ModalServer = ({data, setModalServer, projects, accessory, locations}) => {
    const [server, setServer] = useState(data);
    const [threads, setThreads] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [isClose, setIsClose] = useState(false);
    const [tabs, setTabs] = useState([{name: 'О сервере', isField: !!server}]);
    const settingsType = useQuery('settingsType', () => PMService.settingsType.getAll(), {keepPreviousData: true});
    const threadsQuery = useQuery(`threads${server?.id}`,
        () => server?.id ? PMService.settings.getAllById(server.id) : false,
        {refetchOnWindowFocus: false, onSuccess: (e) => setThreads(e.result), onError: () => setThreads(false), retry: false});

    useEffect(() => {
        if (threads) {
            setTabs([
                {name: 'О сервере', isField: true},
                ...threads.map((item, i) => {return {name: item.name ? item.name : `Поток ${i + 1}`, isField: !!item.id}})
            ]);
        }
    }, [threads]);

    return (
        <Modal onClose={() => setModalServer({isOpen: false})} containerClass={s.container} close={isClose}>
            <ModalServerTitle title={server?.name} token={server?.token} threads={threads}/>
            <ModalServerTabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} setTabs={setTabs} setThreads={setThreads} server={server}/>
            <ModalServerInfo server={server}
                             projectsResult={projects.data?.result}
                             setServer={setServer}
                             setTabs={setTabs}
                             setIsClose={setIsClose}
                             accessory={accessory}
                             locations={locations}
                             isShow={activeTab === 0}/>
            {threads ? threads.map((thread, i) => (
                <ModalServerThread key={i}
                                   setActiveTab={setActiveTab}
                                   settingsType={settingsType.data?.result}
                                   thread={thread}
                                   setThreads={setThreads}
                                   index={i}
                                   isShow={activeTab === (i + 1)}
                />
            )) : ''}
        </Modal>
    );
};

export default ModalServer;