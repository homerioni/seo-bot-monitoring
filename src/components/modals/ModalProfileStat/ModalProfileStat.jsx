import React from 'react';
import s from './ModalProfileStat.module.scss';
import Modal from "../Modal";
import ModalProfileStatHeader from "./ModalProfileStatHeader/ModalProfileStatHeader";
import ModalProfileStatViewed from "./ModalProfileStatViewed/ModalProfileStatViewed";
import ModalProfileStatAge from "./ModalProfileStatAge/ModalProfileStatAge";
import {useQuery} from "react-query";
import {PMService} from "../../../API/PMService";
import Loading from "../../UI/Loading/Loading";

const ModalProfileStat = ({setModalProfStat, reqData, server, rangeData, folder}) => {
    const statistic = useQuery(`StatisticsGraph${reqData.id}${rangeData.rangeEnd}`,
        () => PMService.profileStatistic.getStatistic(reqData), {cacheTime: 0});
    const ages = useQuery(`AgesGraph${reqData.id}${rangeData.rangeEnd}`,
        () => PMService.profileStatistic.getAgeStatistic({
            id: reqData[0].id,
            types: reqData[0].types,
            rangeStart: rangeData.rangeStart,
            rangeEnd: rangeData.rangeEnd,
        }), {cacheTime: 0});


    return (
        <Modal containerClass={s.container} onClose={() => {setModalProfStat({isOpen: false})}}>
            {statistic.isLoading ? <Loading/> : ''}
            <ModalProfileStatHeader server={server} date={statistic.data?.result[0].updatedAt} folder={folder}/>
            <ModalProfileStatViewed statistic={statistic.data?.result[0].data} rangeData={rangeData}/>
            <ModalProfileStatAge ages={ages.data?.result}/>
        </Modal>
    );
};

export default ModalProfileStat;