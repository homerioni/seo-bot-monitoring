import React, {useMemo, useState} from 'react';
import AppiumProjects from "../components/AppiumProjects/AppiumProjects";
import AppiumProjectsHeader from "../components/AppiumProjects/AppiumProjectsHeader/AppiumProjectsHeader";
import ModalAppiumProjects from "../components/modals/ModalAppiumProjects/ModalAppiumProjects";
import {useQuery} from "react-query";
import {PMService} from "../API/PMService";

const AppiumProjectsPage = () => {
    const [searchData, setSearchData] = useState('');
    const [modalProjects, setModalProjects] = useState({isOpen: false});
    const appiumProjects = useQuery('appiumProjects', () => PMService.projectPromotion.getAll(), {keepPreviousData: true, refetchOnWindowFocus: false});
    const APData = useMemo(() => {
        return appiumProjects.data?.result.filter(data => data.name.includes(searchData) || data.domain.includes(searchData));
    }, [appiumProjects.data, searchData]);

    return (
        <>
            <div className='main-content-box'>
                <AppiumProjectsHeader searchData={searchData} setSearchData={setSearchData} setModalProjects={setModalProjects}/>
                <div className="main-content">
                    <AppiumProjects APData={APData} setModalProjects={setModalProjects}/>
                </div>
            </div>
            {modalProjects.isOpen && <ModalAppiumProjects setModalProjects={setModalProjects} data={modalProjects.data}/>}
        </>
    );
};

export default AppiumProjectsPage;