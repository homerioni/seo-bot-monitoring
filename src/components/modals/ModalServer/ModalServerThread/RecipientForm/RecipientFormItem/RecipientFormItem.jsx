import React, {useContext, useState} from 'react';
import s from './RecipientFormItem.module.scss';
import RecipientSelectServer from "./RecipientSelectServer/RecipientSelectServer";
import RecipientFormPath from "./RecipientFormPath/RecipientFormPath";
import RecipientButtons from "./RecipientButtons/RecipientButtons";
import {useForm} from "react-hook-form";
import {defaultCatch, recipientForm} from "../../../../../../utils/tools";
import {PMService} from "../../../../../../API/PMService";
import {useQueryClient} from "react-query";
import {AlertContext} from "../../../../../../App";

const RecipientFormItem = ({index, data, thread, recipients, setRecipients}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {isValid, isDirty}, watch} = useForm({
        mode: 'onChange',
        defaultValues: recipientForm(data),
    });

    const onSubmit = (reqData) => {
        setIsLoading(true);
        if (data?.recipientId) {
            PMService.settings.recipient.change(thread.id, data.recipientId, reqData).then(resp => {
                setIsLoading(false);
                const result = {...resp.result[0], recipientId: resp.result[0].recipientServerId, id: resp.result[0].serverId};
                queryClient.invalidateQueries(`threads${thread.server.id}`);
                setRecipients(prev => prev.map((item, i) => i === index ? result : item));
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            PMService.settings.recipient.create(thread.id, reqData).then(resp => {
                setIsLoading(false);
                const result = {...resp.result[0], recipientId: resp.result[0].recipientServerId, id: resp.result[0].serverId};
                queryClient.invalidateQueries(`threads${thread.server.id}`);
                setRecipients(prev => prev.map((item, i) => i === index ? result : item));
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    return (
        <form className={s.main} onSubmit={handleSubmit(onSubmit)}>
            <p className={s.number}>{index + 1}</p>
            <RecipientSelectServer register={register} watch={watch} recipients={recipients}/>
            <div className={s.flex75}>
                <div className={s.labelBox}>
                    <RecipientFormPath register={register}/>
                    <RecipientButtons isValid={isValid}
                                      isDirty={isDirty}
                                      data={data}
                                      threadId={thread.id}
                                      setRecipients={setRecipients}
                                      index={index}
                                      isLoading={isLoading}
                    />
                </div>
            </div>
        </form>
    );
};

export default RecipientFormItem;