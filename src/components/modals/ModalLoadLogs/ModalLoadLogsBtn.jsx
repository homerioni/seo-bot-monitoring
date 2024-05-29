import React from 'react';
import s from "./ModalLoadLogs.module.scss";
import {PMService} from "../../../API/PMService";
import Loading from "../../UI/Loading/Loading";
import {getErrorMessage} from "../../../utils/tools";

const ModalLoadLogsBtn = ({dateValues, serverId, closeHandle, isLoading, setIsLoading}) => {
    const downloadHandle = () => {
        setIsLoading(true);
        PMService.monitoring.getLogs({
            startDate: dateValues.from,
            endDate: dateValues.to,
            serverId: serverId,
        }).then(resp => {
            window.open(resp.result[0].link);
            closeHandle();
        }).catch(e => closeHandle(getErrorMessage(e)));
    };

    return (
        <button type="button" className={s.btn} onClick={downloadHandle}>
            {isLoading ? <Loading/> : ''}
            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
                <rect width="47" height="47" rx="23.5" fill="#ADB8FF" fillOpacity="0.4"/>
                <rect x="6" y="6" width="35" height="35" rx="17.5" fill="#ADB8FF"/>
                <path d="M21.5469 22.7068L23.8935 25.0535L26.2402 22.7068" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23.8906 15.6667V24.9892" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M31.3307 23.165C31.3307 27.2167 28.5807 30.4984 23.9974 30.4984C19.4141 30.4984 16.6641 27.2167 16.6641 23.165" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>скачать файл</span>
        </button>
    );
};

export default ModalLoadLogsBtn;