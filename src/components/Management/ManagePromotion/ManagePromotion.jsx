import React from 'react';
import ManagePromotionItem from "./ManagePromotionItem/ManagePromotionItem";
import ManagePromotionHeader from "./ManagePromotionHeader/ManagePromotionHeader";

const ManagePromotion = ({setModalManagement, data, setModalConfirm, queryClient, addAlert}) => {
    return (
        <div>
            <ManagePromotionHeader/>
            {data?.map(task =>
                <ManagePromotionItem key={task.id}
                                     setModalManagement={setModalManagement}
                                     data={task}
                                     setModalConfirm={setModalConfirm}
                                     addAlert={addAlert}
                                     queryClient={queryClient}/>)}
        </div>
    );
};

export default ManagePromotion;