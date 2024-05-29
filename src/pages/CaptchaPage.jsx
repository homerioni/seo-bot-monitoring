import React, {useMemo, useState} from 'react';
import ModalConfirm from "../components/modals/ModalConfirm/ModalConfirm";
import CaptchaHeader from "../components/headers/CaptchaHeader";
import {useQuery} from "react-query";
import {PMService} from "../API/PMService";
import Loading from "../components/UI/Loading/Loading";
import Captcha from "../components/Catpcha/Captcha";
import ModalCaptcha from "../components/modals/ModalCaptcha/ModalCaptcha";

const CaptchaPage = () => {
    const [searchData, setSearchData] = useState('');
    const [modalCaptcha, setModalCaptcha] = useState({isOpen: false, data: null});
    const captchaServers = useQuery('captcha', () => PMService.antiCaptcha.getAll());
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });
    const filteredServers = useMemo(() => {
        return captchaServers.data?.result.filter(item => item.name.includes(searchData) || item.ip.includes(searchData));
    }, [captchaServers, searchData]);

    return (
        <>
            <div className='main-content-box'>
                <CaptchaHeader searchData={searchData} setSearchData={setSearchData} captchaServers={captchaServers} setModalCaptcha={setModalCaptcha}/>
                <div className="main-content">
                    {captchaServers.isLoading && <Loading/>}
                    <Captcha filteredServers={filteredServers} setModalConfirm={setModalConfirm} setModalCaptcha={setModalCaptcha}/>
                </div>
            </div>
            {modalCaptcha.isOpen && <ModalCaptcha setModalCaptcha={setModalCaptcha} data={modalCaptcha.data}/>}
            {modalConfirm.isOpen && <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/>}
        </>
    );
};

export default CaptchaPage;