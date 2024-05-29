import React from 'react';
import s from './Versions.module.scss';
import VersionItem from "./VersionItem/VersionItem";
import Loading from "../UI/Loading/Loading";

const Versions = ({servers, version, status}) => {
    return (
        <div className={s.main}>
            <p className={s.title}>Серверы и версии</p>
            <div className={s.list}>
                {servers.isLoading ? <Loading/> : ''}
                {servers.data?.result
                    .sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
                    .map(server => <VersionItem key={server.id} server={server} version={version.data} status={status}/>)}
            </div>
        </div>
    );
};

export default Versions;