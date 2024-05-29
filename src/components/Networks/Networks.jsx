import React, {useContext, useEffect, useState} from 'react';
import s from './Networks.module.scss';
import NetworksContentHeader from "./NetworksContentHeader/NetworksContentHeader";
import NetworkItem from "./NetworkItem/NetworkItem";
import Loading from "../UI/Loading/Loading";
import {PMService} from "../../API/PMService";
import {getErrorMessage} from "../../utils/tools";
import {AlertContext} from "../../App";
import {useQueryClient} from "react-query";

const Networks = ({networks, setModalConfirm, searchData, activeTab, setModalNetwork}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [openItem, setOpenItem] = useState();
    const filteredNetworks = networks.data?.result.filter(item => item.name.includes(searchData) || item.ip.includes(searchData));
    useEffect(() => setOpenItem(null), [activeTab]);

    const handleDel = (name, id, type) => setModalConfirm({
        isOpen: true,
        data: {
            title: `Удалить сеть <b>${name}?</b>`,
            color: 'red',
            btnText: 'Да, удалить',
            iconType: 'server',
            onConfirm: (close) => PMService.network.delete(id).then(() => {
                addAlert([{status: true, message: `Сеть ${name} успешно удалена`}]);
                queryClient.invalidateQueries(type);
                close();
            }).catch(e => getErrorMessage(e))
        }
    });

    return (
        <div className={s.main}>
            {networks.isLoading && <Loading/>}
            <NetworksContentHeader/>
            {filteredNetworks?.map(network =>
                <NetworkItem key={network.id} data={network} openItem={openItem} setOpenItem={setOpenItem} handleDel={handleDel} setModalNetwork={setModalNetwork}/>)}
        </div>
    );
};

export default Networks;