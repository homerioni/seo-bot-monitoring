import React, {useState} from 'react';
import s from './Groups.module.scss';
import GroupsTabs from "./Tabs/GroupsTabs";
import Loading from "../UI/Loading/Loading";
import GroupsContent from "./GroupsContent";

const Groups = ({tabs, groups, setModalGroup, setModalConfirm}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [noTab, setNoTab] = useState(false);

    return (
        <>
            <GroupsTabs tabs={tabs} noTab={noTab} activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className={s.content}>
                {groups.isLoading ? <Loading/> : ''}
                <GroupsContent groups={groups.data?.result}
                               tabs={tabs.data?.result}
                               setModalGroup={setModalGroup}
                               setModalConfirm={setModalConfirm}
                               activeTab={activeTab}
                               setNoTab={setNoTab}
                               noTab={noTab}/>
            </div>
        </>
    );
};

export default Groups;