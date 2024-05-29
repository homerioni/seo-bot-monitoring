import React, {useRef} from 'react';
import s from './ModalProfSumTabs.module.scss';
import {useQuery} from "react-query";
import {PMService} from "../../../../../../../API/PMService";
import Loading from "../../../../../../UI/Loading/Loading";

const ModalProfSumTabs = ({setActiveTab, activeTab}) => {
    const tabs = useQuery('groupsTabs', () => PMService.groupTab.getAll(), {keepPreviousData: true});
    const mainRef = useRef(null);

    const scrollNext = () => {
        mainRef.current.scrollBy({left: mainRef.current.offsetWidth * 0.8, behavior: 'smooth'});
    };

    const btnClick = (id) => {
        if (activeTab === id) {
            setActiveTab(null);
        } else {
            setActiveTab(id)
        }
    };

    return (
        <div className={s.main}>
            <div className={s.content} ref={mainRef}>
                {tabs.isLoading && <Loading/>}
                {tabs.data?.result?.map(tab =>
                    <button key={tab.id}
                            className={`${s.item} ${activeTab === tab.id ? s.active : ''}`}
                            onClick={() => btnClick(tab.id)}
                            type='button'
                    >
                        {tab.name}
                    </button>
                )}
            </div>
            <button className={s.arrow} onClick={scrollNext}>
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2L8 8L2 14" stroke="#393B44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
};

export default ModalProfSumTabs;