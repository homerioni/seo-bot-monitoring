import React from 'react';
import s from './ServerThreads.module.scss';
import ServerRecipient from "./ServerRecipient/ServerRecipient";
import ThreadHeader from "./ThreadHeader/ThreadHeader";
import Loading from "../../../../UI/Loading/Loading";
import EmptyData from "../../../../UI/EmptyData/EmptyData";

const ServerThreads = ({threads, setModalConfirm, setModalDist}) => {
    threads.data?.result?.forEach((el, i) => {
        threads.data.result[i].servers.sort((a, b) => {
            if (a.isAlive < b.isAlive) return 1;
            if (a.isAlive > b.isAlive) return -1;
            if (a.isActive < b.isActive) return 1;
            if (a.isActive > b.isActive) return -1;
            return 0;
        });
    });

    return (
        <div className={s.main}>
            {threads.isLoading ?
                <Loading/>
                :
                threads.data?.result?.length ?
                    threads.data.result.map(item => {
                        return (
                            <div key={item.id} className={s.item}>
                                <ThreadHeader data={item} setModalConfirm={setModalConfirm} setModalDist={setModalDist}/>
                                <ul className={s.recipients}>
                                    {item.servers.map(recipient => <ServerRecipient key={recipient.recipientId} thread={item} data={recipient} setModalConfirm={setModalConfirm}/>)}
                                </ul>
                            </div>
                        )
                    })
                    : <EmptyData/>
            }
        </div>
    );
};

export default ServerThreads;