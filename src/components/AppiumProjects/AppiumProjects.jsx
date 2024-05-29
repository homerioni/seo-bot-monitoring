import React, {useContext} from 'react';
import s from './AppiumProjects.module.scss';
import AppiumProjectsItem from "./AppiumProjectsItem/AppiumProjectsItem";
import APContentHeader from "./APContentHeader/APContentHeader";
import {useQueryClient} from "react-query";
import {AlertContext} from "../../App";
import {PMService} from "../../API/PMService";
import {defaultCatch} from "../../utils/tools";

const AppiumProjects = ({APData, setModalProjects}) => {
    const queryClient = useQueryClient();
    const addAlert = useContext(AlertContext);
    const pumpingData = APData?.filter(data => data.purposeType === 'PUMPING');
    const promotionData = APData?.filter(data => data.purposeType === 'PROMOTION');

    const onDel = (data) => {
        PMService.projectPromotion.remove(data.id).then(() => {
            queryClient.invalidateQueries('appiumProjects');
            addAlert([{status: true, message: `Проект ${data.name} успешно удален`}]);
        }).catch(e => defaultCatch(e, addAlert));
    };

    return (
        <div className={s.main}>
            <APContentHeader/>
            <div className={s.content}>
                <p className={s.title}><span>В прокачке</span><sup>{pumpingData?.length ?? 0}</sup></p>
                {pumpingData?.map(item => <AppiumProjectsItem key={item.id} data={item} setModalProjects={setModalProjects} onDel={onDel}/>)}
            </div>
            <div className={s.content}>
                <p className={s.title}><span>В накрутке</span><sup>{promotionData?.length ?? 0}</sup></p>
                {promotionData?.map(item => <AppiumProjectsItem key={item.id} data={item} setModalProjects={setModalProjects} onDel={onDel}/>)}
            </div>
        </div>
    );
};

export default AppiumProjects;