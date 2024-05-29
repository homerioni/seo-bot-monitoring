import React, {useState} from 'react';
import s from './ModalGroupTabs.module.scss';
import sModal from '../Modal.module.scss';
import TabsTitle from "./TabsTitle/TabsTitle";
import TabsAddBtn from "./TabsAddBtn/TabsAddBtn";
import TabsItem from "./TabsItem/TabsItem";
import Loading from "../../UI/Loading/Loading";
import Modal from "../Modal";

const ModalGroupTabs = ({groups, tabs, setModalConfirm, setModalGroupTab, setModalGroupTabs}) => {
    return (
        <Modal onClose={() => setModalGroupTabs(false)} containerClass={s.container}>
            <TabsTitle/>
            <div className={s.content}>
                <p className={s.contentTitle}>Вкладки</p>
                {tabs.isLoading ? <Loading/> : ''}
                {tabs.data?.result.length ?
                    tabs.data?.result.map(tab =>
                        <TabsItem key={tab.id}
                                  groups={groups}
                                  tabs={tabs}
                                  data={tab}
                                  setModalConfirm={setModalConfirm}
                                  setModalGroupTab={setModalGroupTab}/>)
                    : ''}
                <TabsAddBtn setModalGroupTab={setModalGroupTab}/>
            </div>
        </Modal>
    );
};

export default ModalGroupTabs;