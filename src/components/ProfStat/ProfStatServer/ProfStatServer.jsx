import React, {useEffect, useRef, useState} from 'react';
import s from './ProfStatServer.module.scss';
import ProfStatServerHeader from "./ProfStatServerHeader/ProfStatServerHeader";
import ProfStatServerItem from "./ProfStatServerItem/ProfStatServerItem";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {PMService} from "../../../API/PMService";
import {staticReqData} from "../../../utils/tools";
import Loading from "../../UI/Loading/Loading";

const ProfStatServer = ({index, data, setModalProfStat, setModalConfirm, activeGlobalTab}) => {
    const [activeTab, setActiveTab] = useState(1);
    const queryClient = useQueryClient();
    const itemRef = useRef(null);
    const [isMutate, setIsMutate] = useState(false);
    const profStatData = useQuery(`ProfileStatMob${data?.id}`,
        () => {},
        {keepPreviousData: true, refetchOnWindowFocus: false, retry: false});
    const profStatDataMutation = useMutation({
        mutationFn: () => PMService.profileStatistic.getStatistic(staticReqData(data?.id)),
        onSuccess: mutationData => {
            queryClient.setQueryData(`ProfileStatMob${data?.id}`, () => mutationData);
        },
    });

    const openModalHandle = (reqData, rangeData) =>
        setModalProfStat({isOpen: true, server: data.server, reqData, rangeData, folder: data?.folder});

    useEffect(() => setActiveTab(activeGlobalTab), [activeGlobalTab]);

    useEffect( () => {
        let observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !isMutate) {
                    setIsMutate(true);
                    profStatDataMutation.mutate()
                }
            });
        });
        observer.observe(itemRef.current);

        return () => {
            observer.disconnect();
        };
    });

    return (
        <div className={s.main} ref={itemRef}>
            <ProfStatServerHeader activeTab={activeTab}
                                  setActiveTab={setActiveTab}
                                  index={index}
                                  data={data}
                                  updateDate={profStatData.data?.result[2].updatedAt}
                                  setModalConfirm={setModalConfirm}/>
            <div className={s.content}>
                {profStatData.isLoading || profStatDataMutation.isLoading ? <Loading/> : ''}
                {activeTab === 1 || activeTab === 2 ?
                    <ProfStatServerItem color={'#8B98EE'}
                                        reqData={{id: data?.id, types: ['DESKTOP']}}
                                        stat={profStatData.data?.result[0].data}
                                        folder={data?.folder}
                                        openModalHandle={openModalHandle}/> : ''}
                {activeTab === 1 || activeTab === 3 ?
                    <ProfStatServerItem color={'#87D449'}
                                        reqData={{id: data?.id, types: ['MOBILE']}}
                                        stat={profStatData.data?.result[1].data}
                                        folder={data?.folder}
                                        openModalHandle={openModalHandle}/> : ''}
                {activeTab === 4 ?
                    <ProfStatServerItem color={'#5BC2FF'}
                                        reqData={{id: data?.id, types: ['DESKTOP', 'MOBILE']}}
                                        stat={profStatData.data?.result[2].data}
                                        folder={data?.folder}
                                        openModalHandle={openModalHandle}/> : ''}
            </div>
        </div>
    );
};

export default ProfStatServer;