import React from 'react';
import s from './Header.module.scss';
import VersionFile from "./VersionFile/VersionFile";
import UpdateBtn from "./UpdateBtn/UpdateBtn";
import Loading from "../UI/Loading/Loading";
import {PMService} from "../../API/PMService";
import {ending, getErrorMessage} from "../../utils/tools";
import {useQueryClient} from "react-query";

const VersionsHeader = ({version, setIsOpenModalVersion, setModalConfirm, setStatus, setIsOpenModalUpdate}) => {
    const queryClient = useQueryClient();

    const updateAll = () => setModalConfirm({
        isOpen: true,
        data: {
            title: 'Обновить все сервера?',
            color: 'green',
            btnText: 'Да, обновить',
            iconType: 'server',
            onConfirm: (close) => {
                setStatus({wait: true});
                PMService.server.update(version.data?.id).then(resp => {
                    queryClient.invalidateQueries('servers');
                    const alertMessages = [];
                    if (resp.successCount)
                        alertMessages.push({status: true, message: `Успешно обновлено: ${resp.successCount} сервер${ending(resp.successCount)}`})
                    if (resp.failCount)
                        alertMessages.push({status: false, message: `Ошибок: ${resp.failCount} сервер${ending(resp.failCount)}`})
                    close(alertMessages);

                    const status = {wait: false, servers: {}};
                    resp.servers.map(item => status.servers[item.serverId] = item.status);
                    setStatus(status);
                }).catch(e => {
                    close(getErrorMessage(e));
                    setStatus({});
                });
                close();
            }
        }
    });

    return (
        <div className={s.main}>
            <div>
                <svg className={s.icon} xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57" fill="none">
                    <rect width="57" height="57" rx="28.5" fill="#87D549"/>
                    <path d="M25.457 27.5763L28.8467 30.9659L32.2363 27.5763" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28.8428 17.4074V30.8733" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M39.5895 28.2383C39.5895 34.0907 35.6173 38.8309 28.9969 38.8309C22.3765 38.8309 18.4043 34.0907 18.4043 28.2383" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className={s.title}>
                    <span>Управление версиями софта в сети</span>
                </p>
            </div>
            <div>
                {version.isLoading ? <Loading/> : ''}
                <VersionFile version={version.data} onClick={() => setIsOpenModalVersion(true)}/>
                <UpdateBtn text={'обновить на всех'} color={'green'} onClick={updateAll}/>
                <UpdateBtn text={'обновить выборочно'} color={'purple'} onClick={() => setIsOpenModalUpdate(true)}/>
            </div>
        </div>
    );
};

export default VersionsHeader;