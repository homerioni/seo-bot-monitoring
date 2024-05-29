import React from 'react';
import ThreadFormTitle from "./ThreadFormTitle/ThreadFormTitle";
import ThreadForm from "./ThreadForm/ThreadForm";
import RecipientForm from "./RecipientForm/RecipientForm";

const ModalServerThread = ({index, thread, setThreads, settingsType, isShow, setActiveTab}) => {
    return (
        <div style={{display: isShow ? '' : 'none'}}>
            <ThreadFormTitle number={index + 1} thread={thread} setThreads={setThreads} setActiveTab={setActiveTab}/>
            <ThreadForm thread={thread} settingsType={settingsType} setThreads={setThreads}/>
            <RecipientForm thread={thread}/>
        </div>
    );
};

export default ModalServerThread;