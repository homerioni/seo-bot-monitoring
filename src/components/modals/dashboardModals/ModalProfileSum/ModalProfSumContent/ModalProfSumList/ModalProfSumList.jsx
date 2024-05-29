import React, {useEffect, useMemo, useState} from 'react';
import s from './ModalProfSumList.module.scss';
import Loading from "../../../../../UI/Loading/Loading";
import ModalDashboardCheckbox from "../../../UI/ModalDashboardCheckbox/ModalDashboardCheckbox";
import ModalDashboardSearch from "../../../UI/ModalDashboardSearch/ModalDashboardSearch";
import ModalProfSumTabs from "./ModalProfSumTabs/ModalProfSumTabs";

const ModalProfSumList = ({groups, profSumGroups, setProfSumGroups}) => {
    const [searchData, setSearchData] = useState('');
    const [activeTab, setActiveTab] = useState(null);

    const filterGroupsData = useMemo(() => {
        return groups.data?.result?.filter(group => {
            const name = group.name.toLowerCase();
            const search = searchData.toLowerCase();
            const tabsFilter = () => {
                if (activeTab) return group.tabs?.find(tab => tab.id === activeTab);
                return true;
            }
            return name.includes(search) && tabsFilter();
        });
    }, [groups, searchData, activeTab]);

    const onChange = e => {
        if (e.target.checked) {
            setProfSumGroups(prev => [...prev, e.target.value]);
        } else {
            setProfSumGroups(prev => prev.filter(el => el !== e.target.value));
        }
    };

    useEffect(() => {
        localStorage.setItem('profSumGroups', profSumGroups)
    }, [profSumGroups]);

    return (
        <div className={s.main}>
            <ModalDashboardSearch value={searchData} setValue={setSearchData} placeholder={'Поиск по группам...'}/>
            <ModalProfSumTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className={s.listBox}>
                {groups.isLoading && <Loading/>}
                {filterGroupsData?.map(group => (
                    <label key={group.id} className={s.listItem}>
                        <ModalDashboardCheckbox value={group.id} onChange={onChange} defaultChecked={profSumGroups?.find(el => el == group.id)}/>
                        <div className={s.nameBox}>
                            <span>{group.name}</span>
                            <span className={s.gray}> / </span>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.4688 0.955778C-4.76837e-08 1.41156 0 2.14422 0 3.61111C0 5.078 -4.76837e-08 5.81067 0.4688 6.26644C0.9376 6.72222 1.6912 6.72222 3.2 6.72222H12.8C14.3088 6.72222 15.0624 6.72222 15.5312 6.26644C16 5.81067 16 5.078 16 3.61111C16 2.14422 16 1.41156 15.5312 0.955778C15.0624 0.5 14.3088 0.5 12.8 0.5H3.2C1.6912 0.5 0.9376 0.5 0.4688 0.955778ZM5.6 4.97222C5.44087 4.97222 5.28826 4.91076 5.17574 4.80137C5.06321 4.69197 5 4.5436 5 4.38889V2.83333C5 2.67862 5.06321 2.53025 5.17574 2.42085C5.28826 2.31146 5.44087 2.25 5.6 2.25C5.75913 2.25 5.91174 2.31146 6.02426 2.42085C6.13679 2.53025 6.2 2.67862 6.2 2.83333V4.38889C6.2 4.5436 6.13679 4.69197 6.02426 4.80137C5.91174 4.91076 5.75913 4.97222 5.6 4.97222ZM9.2 3.02778C9.04087 3.02778 8.88826 3.08924 8.77574 3.19863C8.66321 3.30803 8.6 3.4564 8.6 3.61111C8.6 3.76582 8.66321 3.91419 8.77574 4.02359C8.88826 4.13299 9.04087 4.19444 9.2 4.19444H12.8C12.9591 4.19444 13.1117 4.13299 13.2243 4.02359C13.3368 3.91419 13.4 3.76582 13.4 3.61111C13.4 3.4564 13.3368 3.30803 13.2243 3.19863C13.1117 3.08924 12.9591 3.02778 12.8 3.02778H9.2ZM3.2 4.97222C3.04087 4.97222 2.88826 4.91076 2.77574 4.80137C2.66321 4.69197 2.6 4.5436 2.6 4.38889V2.83333C2.6 2.67862 2.66321 2.53025 2.77574 2.42085C2.88826 2.31146 3.04087 2.25 3.2 2.25C3.35913 2.25 3.51174 2.31146 3.62426 2.42085C3.73679 2.53025 3.8 2.67862 3.8 2.83333V4.38889C3.8 4.5436 3.73679 4.69197 3.62426 4.80137C3.51174 4.91076 3.35913 4.97222 3.2 4.97222ZM0.4688 8.73356C-4.76837e-08 9.18933 0 9.922 0 11.3889C0 12.8558 -4.76837e-08 13.5884 0.4688 14.0442C0.9376 14.5 1.6912 14.5 3.2 14.5H12.8C14.3088 14.5 15.0624 14.5 15.5312 14.0442C16 13.5884 16 12.8558 16 11.3889C16 9.922 16 9.18933 15.5312 8.73356C15.0624 8.27778 14.3088 8.27778 12.8 8.27778H3.2C1.6912 8.27778 0.9376 8.27778 0.4688 8.73356ZM8.6 11.3889C8.6 11.2342 8.66321 11.0858 8.77574 10.9764C8.88826 10.867 9.04087 10.8056 9.2 10.8056H12.8C12.9591 10.8056 13.1117 10.867 13.2243 10.9764C13.3368 11.0858 13.4 11.2342 13.4 11.3889C13.4 11.5436 13.3368 11.692 13.2243 11.8014C13.1117 11.9108 12.9591 11.9722 12.8 11.9722H9.2C9.04087 11.9722 8.88826 11.9108 8.77574 11.8014C8.66321 11.692 8.6 11.5436 8.6 11.3889ZM2.6 12.1667C2.6 12.3214 2.66321 12.4698 2.77574 12.5791C2.88826 12.6885 3.04087 12.75 3.2 12.75C3.35913 12.75 3.51174 12.6885 3.62426 12.5791C3.73679 12.4698 3.8 12.3214 3.8 12.1667V10.6111C3.8 10.4564 3.73679 10.308 3.62426 10.1986C3.51174 10.0892 3.35913 10.0278 3.2 10.0278C3.04087 10.0278 2.88826 10.0892 2.77574 10.1986C2.66321 10.308 2.6 10.4564 2.6 10.6111V12.1667ZM5.6 12.75C5.44087 12.75 5.28826 12.6885 5.17574 12.5791C5.06321 12.4698 5 12.3214 5 12.1667V10.6111C5 10.4564 5.06321 10.308 5.17574 10.1986C5.28826 10.0892 5.44087 10.0278 5.6 10.0278C5.75913 10.0278 5.91174 10.0892 6.02426 10.1986C6.13679 10.308 6.2 10.4564 6.2 10.6111V12.1667C6.2 12.3214 6.13679 12.4698 6.02426 12.5791C5.91174 12.6885 5.75913 12.75 5.6 12.75Z" fill="#5BC2FF"/>
                            </svg>
                            <span> {group.servers?.length}</span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ModalProfSumList;