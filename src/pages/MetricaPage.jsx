import React, {useMemo, useState} from 'react';
import YandexHeader from "../components/headers/YandexHeader";
import {useQuery} from "react-query";
import {ProjectsAPI} from "../API/ProjectsAPI";
import Loading from "../components/UI/Loading/Loading";
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import Metrika from "../components/Metrika/Metrika";
import ModalMetrika from "../components/modals/ModalMetrika/ModalMetrika";

const MetrikaPage = () => {
    const [searchData, setSearchData] = useState('');
    const [modalMetrika, setModalMetrika] = useState({isOpen: false, data: null});
    const yandexMetrika = useQuery('metrika', () => ProjectsAPI.metrika.getAll(), {keepPreviousData: true, refetchOnWindowFocus: false});
    const filteredMetrika = useMemo(() => {
        return yandexMetrika.data?.result.filter(item => item.name.includes(searchData) || item.token.includes(searchData));
    }, [searchData, yandexMetrika]);
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });

    return (
        <>
            <div className="main-content-box">
                <YandexHeader setSearchData={setSearchData} searchData={searchData} setModal={setModalMetrika} title={'Аккаунты Яндекс.Метрика'}/>
                <div className="main-content">
                    {yandexMetrika.isLoading ? <Loading/> : ''}
                    <Metrika filteredMetrika={filteredMetrika} setModalConfirm={setModalConfirm} setModalMetrika={setModalMetrika}/>
                </div>
            </div>
            {modalMetrika.isOpen && <ModalMetrika setModalMetrika={setModalMetrika} data={modalMetrika.data}/>}
            {modalConfirm.isOpen && <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/>}
        </>
    );
};

export default MetrikaPage;