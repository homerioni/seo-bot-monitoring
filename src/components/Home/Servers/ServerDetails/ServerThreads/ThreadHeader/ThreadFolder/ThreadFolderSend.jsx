import React, {useContext, useEffect, useState} from 'react';
import {PMService} from "../../../../../../../API/PMService";
import s from "./ThreadFolder.module.scss";
import {defaultCatch} from "../../../../../../../utils/tools";
import {AlertContext} from "../../../../../../../App";
import Loading from "../../../../../../UI/Loading/Loading";

const ThreadFolderSend = ({data, setModalConfirm}) => {
    const id = data.folderDistribution.folderDistributionId;
    const addAlert = useContext(AlertContext);
    const [reqId, setReqId] = useState(data.folderDistribution.request?.id);
    const [isLoading, setIsLoading] = useState(!!PMService.folderDistribution.whoIsActive.find(el => el.id === reqId));
    const sendHandle = () => {
        if (!isLoading) {
            setModalConfirm({
                isOpen: true,
                data: {
                    title: `Начать копирование по настройке <b>${data.name}?</b>`,
                    color: 'green',
                    btnText: `Да, отправить`,
                    iconType: 'server',
                    onConfirm: (close) => {
                        setIsLoading(true);
                        PMService.folderDistribution.start(id).then(resp => {
                            setReqId(resp.result[0].id);
                            PMService.folderDistribution.whoIsActive.push({id: resp.result[0].id, serverName: data.server.name, serverId: data.server.id, threadId: data.id, threadName: data.name});
                            addAlert([{status: true, message: `Начато копирование на сервере ${data.server.name} (${data.name})`}]);
                        }).catch(e => {
                            defaultCatch(e, addAlert, setIsLoading);
                        });
                        close();
                    },
                }
            });
        }
    };

    useEffect(() => {
        if (data.folderDistribution.request?.status === 'WAITING' && !PMService.folderDistribution.whoIsActive.find(el => el.id === reqId)) {
            PMService.folderDistribution.whoIsActive.push({id: reqId, serverName: data.server.name, serverId: data.server.id, threadId: data.id, threadName: data.name});
            setIsLoading(true);
        }

        const timer = setInterval(() => {
            if (isLoading && !PMService.folderDistribution.whoIsActive.find(el => el.id === reqId)) setIsLoading(false);
        }, 2000);

        return () => {
            clearInterval(timer);
        };
    }, [isLoading, reqId]);

    return (
        <button className={`${s.btn} ${s.send}`} onClick={sendHandle}>
            {isLoading && <Loading/>}
            <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.5274 0.520889C-5.96046e-08 1.04178 0 1.87911 0 3.55556C0 5.232 -5.96046e-08 6.06933 0.5274 6.59022C1.0548 7.11111 1.9026 7.11111 3.6 7.11111H14.4C16.0974 7.11111 16.9452 7.11111 17.4726 6.59022C18 6.06933 18 5.232 18 3.55556C18 1.87911 18 1.04178 17.4726 0.520889C16.9452 -5.96046e-08 16.0974 0 14.4 0H3.6C1.9026 0 1.0548 -5.96046e-08 0.5274 0.520889ZM6.3 5.11111C6.12098 5.11111 5.94929 5.04087 5.8227 4.91585C5.69612 4.79082 5.625 4.62126 5.625 4.44444V2.66667C5.625 2.48986 5.69612 2.32029 5.8227 2.19526C5.94929 2.07024 6.12098 2 6.3 2C6.47902 2 6.65071 2.07024 6.7773 2.19526C6.90388 2.32029 6.975 2.48986 6.975 2.66667V4.44444C6.975 4.62126 6.90388 4.79082 6.7773 4.91585C6.65071 5.04087 6.47902 5.11111 6.3 5.11111ZM10.35 2.88889C10.171 2.88889 9.99929 2.95913 9.8727 3.08415C9.74612 3.20918 9.675 3.37874 9.675 3.55556C9.675 3.73237 9.74612 3.90194 9.8727 4.02696C9.99929 4.15198 10.171 4.22222 10.35 4.22222H14.4C14.579 4.22222 14.7507 4.15198 14.8773 4.02696C15.0039 3.90194 15.075 3.73237 15.075 3.55556C15.075 3.37874 15.0039 3.20918 14.8773 3.08415C14.7507 2.95913 14.579 2.88889 14.4 2.88889H10.35ZM3.6 5.11111C3.42098 5.11111 3.24929 5.04087 3.1227 4.91585C2.99612 4.79082 2.925 4.62126 2.925 4.44444V2.66667C2.925 2.48986 2.99612 2.32029 3.1227 2.19526C3.24929 2.07024 3.42098 2 3.6 2C3.77902 2 3.95071 2.07024 4.0773 2.19526C4.20388 2.32029 4.275 2.48986 4.275 2.66667V4.44444C4.275 4.62126 4.20388 4.79082 4.0773 4.91585C3.95071 5.04087 3.77902 5.11111 3.6 5.11111ZM0.5274 9.40978C-5.96046e-08 9.93067 0 10.768 0 12.4444C0 14.1209 -5.96046e-08 14.9582 0.5274 15.4791C1.0548 16 1.9026 16 3.6 16H14.4C16.0974 16 16.9452 16 17.4726 15.4791C18 14.9582 18 14.1209 18 12.4444C18 10.768 18 9.93067 17.4726 9.40978C16.9452 8.88889 16.0974 8.88889 14.4 8.88889H3.6C1.9026 8.88889 1.0548 8.88889 0.5274 9.40978ZM2.925 13.3333C2.925 13.5101 2.99612 13.6797 3.1227 13.8047C3.24929 13.9298 3.42098 14 3.6 14C3.77902 14 3.95071 13.9298 4.0773 13.8047C4.20388 13.6797 4.275 13.5101 4.275 13.3333V11.5556C4.275 11.3787 4.20388 11.2092 4.0773 11.0842C3.95071 10.9591 3.77902 10.8889 3.6 10.8889C3.42098 10.8889 3.24929 10.9591 3.1227 11.0842C2.99612 11.2092 2.925 11.3787 2.925 11.5556V13.3333ZM6.3 14C6.12098 14 5.94929 13.9298 5.8227 13.8047C5.69612 13.6797 5.625 13.5101 5.625 13.3333V11.5556C5.625 11.3787 5.69612 11.2092 5.8227 11.0842C5.94929 10.9591 6.12098 10.8889 6.3 10.8889C6.47902 10.8889 6.65071 10.9591 6.7773 11.0842C6.90388 11.2092 6.975 11.3787 6.975 11.5556V13.3333C6.975 13.5101 6.90388 13.6797 6.7773 13.8047C6.65071 13.9298 6.47902 14 6.3 14Z" fill="#78C33B"/>
                <circle cx="16" cy="13" r="8" fill="white"/>
                <path d="M20.8002 13C20.8002 15.6531 18.6533 17.8 16.0002 17.8C13.3471 17.8 11.7325 15.1295 11.7325 15.1295M11.7325 15.1295H13.8969M11.7325 15.1295V17.5295M11.2002 13C11.2002 10.3469 13.3297 8.20001 16.0002 8.20001C19.2031 8.20001 20.8002 10.8706 20.8002 10.8706M20.8002 10.8706V8.47056M20.8002 10.8706H18.6707" stroke="#78C33B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Отправить</span>
        </button>
    );
};

export default ThreadFolderSend;