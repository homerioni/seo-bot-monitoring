import React from 'react';
import s from "./ThreadFolder.module.scss";
import {PMService} from "../../../../../../../API/PMService";
import {getErrorMessage} from "../../../../../../../utils/tools";

const ThreadFolderDel = ({data, setModalConfirm, queryClient}) => {
    const delHandle = () => setModalConfirm({
        isOpen: true,
        data: {
            title: `Удалить копирование по настройке <b>${data.name}?</b>`,
            color: 'red',
            btnText: `Да, удалить`,
            iconType: 'server',
            onConfirm: (close) => {
                PMService.folderDistribution.delete(data.folderDistribution.folderDistributionId).then(() => {
                    queryClient.invalidateQueries([`threads${data.server.id}`]);
                    close([{status: true, message: `Копирование по настройке ${data.name} успешно удалено`}]);
                }).catch(e => close(getErrorMessage(e)));
            },
        }
    });

    return (
        <button type="button" className={s.delBtn} onClick={delHandle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#EB376D"/>
                <path d="M19.2317 8.14C18.9917 7.89 18.6617 7.75 18.3217 7.75H5.6817C5.3417 7.75 5.0017 7.89 4.7717 8.14C4.5417 8.39 4.4117 8.73 4.4317 9.08L5.0517 19.34C5.1617 20.86 5.3017 22.76 8.7917 22.76H15.2117C18.7017 22.76 18.8417 20.87 18.9517 19.34L19.5717 9.09C19.5917 8.73 19.4617 8.39 19.2317 8.14ZM13.6617 17.75H10.3317C9.9217 17.75 9.5817 17.41 9.5817 17C9.5817 16.59 9.9217 16.25 10.3317 16.25H13.6617C14.0717 16.25 14.4117 16.59 14.4117 17C14.4117 17.41 14.0717 17.75 13.6617 17.75ZM14.5017 13.75H9.5017C9.0917 13.75 8.7517 13.41 8.7517 13C8.7517 12.59 9.0917 12.25 9.5017 12.25H14.5017C14.9117 12.25 15.2517 12.59 15.2517 13C15.2517 13.41 14.9117 13.75 14.5017 13.75Z" fill="#EB376D"/>
            </svg>
        </button>
    );
};

export default ThreadFolderDel;