import React, {useState} from 'react';
import AppiumHeader from "../components/Appium/AppiumHeader/AppiumHeader";
import Appium from "../components/Appium/Appium";

const AppiumPage = () => {
    const [serviceActive, setServiceActive] = useState('yandex');

    return (
        <div className='main-content-box full'>
            <AppiumHeader serviceActive={serviceActive} setServiceActive={setServiceActive}/>
            <div className='main-content'>
                <Appium globalServiceActive={serviceActive}/>
            </div>
        </div>
    );
};

export default AppiumPage;