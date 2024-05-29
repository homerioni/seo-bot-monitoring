import React from 'react';
import s from './Management.module.scss';
import ManagePumping from "./ManagePumping/ManagePumping";
import ManagePromotion from "./ManagePromotion/ManagePromotion";

const Management = ({activeTab, setModalManagement, taskData, queryClient, addAlert, setModalConfirm}) => {
    const pumpingData = taskData?.filter(task => task.project.purposeType === 'PUMPING');
    const promotionData = taskData?.filter(task => task.project.purposeType === 'PROMOTION');

    return (
        <div className={s.main}>
            {activeTab === 'PUMPING' &&
                <ManagePumping setModalManagement={setModalManagement}
                               data={pumpingData}
                               queryClient={queryClient}
                               addAlert={addAlert}
                               setModalConfirm={setModalConfirm}/>}
            {activeTab === 'PROMOTION' &&
                <ManagePromotion setModalManagement={setModalManagement}
                                 data={promotionData}
                                 queryClient={queryClient}
                                 addAlert={addAlert}
                                 setModalConfirm={setModalConfirm}/>}
        </div>
    );
};

export default Management;