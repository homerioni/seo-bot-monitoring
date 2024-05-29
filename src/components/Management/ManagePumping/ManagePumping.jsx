import React from 'react';
import ManagePumpingItem from "./ManagePumpingItem/ManagePumpingItem";
import ManagePumpingHeader from "./ManagePumpingHeader/ManagePumpingHeader";

const ManagePumping = ({setModalManagement, data, queryClient, addAlert, setModalConfirm}) => {
    return (
        <div>
            <ManagePumpingHeader/>
            {data?.map(task =>
                <ManagePumpingItem key={task.id}
                                   data={task}
                                   setModalManagement={setModalManagement}
                                   queryClient={queryClient}
                                   addAlert={addAlert}
                                   setModalConfirm={setModalConfirm}/>)}
        </div>
    );
};

export default ManagePumping;