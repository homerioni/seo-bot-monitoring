import React, {useMemo, useState} from 'react';
import YandexHeader from "../components/headers/YandexHeader";
import Xml from "../components/Xml/Xml";
import {useQuery} from "react-query";
import {ProjectsAPI} from "../API/ProjectsAPI";
import Loading from "../components/UI/Loading/Loading";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import ModalXml from "../components/modals/ModalXml/ModalXml";

const XmlPage = () => {
    const [searchData, setSearchData] = useState('');
    const [modalXml, setModalXml] = useState({isOpen: false, data: null});
    const xmlAccounts = useQuery('xml', () => ProjectsAPI.yandex.getAll(), {keepPreviousData: true, refetchOnWindowFocus: false});
    const filteredXml = useMemo(() => {
        return xmlAccounts.data?.result.filter(acc => acc.ipProxy.includes(searchData));
    }, [searchData, xmlAccounts]);
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });

    return (
        <>
            <div className="main-content-box">
                <YandexHeader setSearchData={setSearchData} searchData={searchData} setModal={setModalXml} title='Аккаунты ЯндексXML'/>
                <div className="main-content">
                    {xmlAccounts.isLoading ? <Loading/> : ''}
                    <Xml filteredXml={filteredXml} setModalConfirm={setModalConfirm} setModalXml={setModalXml}/>
                </div>
            </div>
            {modalXml.isOpen ? <ModalXml setModalXml={setModalXml} data={modalXml.data}/> : ''}
            {modalConfirm.isOpen ? <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/> : ''}
        </>
    );
};

export default XmlPage;