import React, {useState} from 'react';
import MonitoringHeader from "../components/headers/MonitoringHeader";
import {useParams} from "react-router";
import {useQuery} from "react-query";
import {PMService} from "../API/PMService";
import Loading from "../components/UI/Loading/Loading";
import Monitoring from "../components/Monitoring/Monitoring";
import ModalStat from "../components/modals/ModalStat/ModalStat";

const statsEachDayData = (() => {
    const dateNow = Date.now();
    let arrDates = [];
    for (let i = 0; i < 30; i++) {
        const startDate = (new Date(dateNow - i * 24 * 3600000)).toJSON().slice(0, 10);
        arrDates.push({startDate: startDate, endDate: startDate});
    }
    return arrDates;
})();

const MonitoringPage = () => {
    const {id} = useParams();
    const [modalStat, setModalStat] = useState({isOpen: false, data: null});
    const statistics = useQuery(`statServer${id}`, () => PMService.statistics.server({items: [{id}]}), {keepPreviousData: true});
    const server = useQuery(`server${id}`, () => PMService.server.getAll({serverIds: [id]}), {keepPreviousData: true});
    const statsEachDay = useQuery(`statsEachDay${id}`,
        () => PMService.statistics.server({items: [{id, requestPeriods: statsEachDayData}]}),
        {keepPreviousData: true, refetchOnWindowFocus: false});

    return (
        <>
            <section className='main-content-box'>
                <MonitoringHeader serverData={server.data?.result[0]} isLoading={server.isLoading} statsEachDay={statsEachDay} setModalStat={setModalStat}/>
                <div className="main-content noBg">
                    {server.isLoading || statistics.isLoading ? <Loading/> : ''}
                    {!statistics.isLoading && <Monitoring statistics={statistics.data}/>}
                </div>
            </section>
            {modalStat.isOpen ? <ModalStat setModalStat={setModalStat} data={modalStat.data} name={server.data?.result[0].name}/> : ''}
        </>
    );
};

export default MonitoringPage;