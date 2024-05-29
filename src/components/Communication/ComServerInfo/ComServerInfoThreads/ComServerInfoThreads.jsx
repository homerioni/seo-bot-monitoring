import React from 'react';
import s from './ComServerInfoThreads.module.scss';
import Loading from "../../../UI/Loading/Loading";
import ComServerInfoThreadHeader from "./ComServerInfoThreadHeader/ComServerInfoThreadHeader";
import ComServerRecipient from "./ComServerRecipient/ComServerRecipient";

const ComServerInfoThreads = ({threads}) => {
    return (
        <div className={s.main}>
            {threads.isLoading ?
                <Loading/>
                :
                threads.data ? threads.data?.result.map(item => {
                    return (
                        <div key={item.id} className={s.item}>
                            <ComServerInfoThreadHeader data={item}/>
                            <ul className={s.recipients}>
                                {item.servers.map(recipient => <ComServerRecipient key={recipient.recipientId} data={recipient}/>)}
                            </ul>
                        </div>
                    )
                }) : ''
            }
        </div>
    );
};

export default ComServerInfoThreads;