import React, {useState} from 'react';
import s from './ProfStatServer.module.scss';
import ProfStatServerHeader from "./ProfStatServerHeader/ProfStatServerHeader";
import ProfStatServerItem from "./ProfStatServerItem/ProfStatServerItem";

const testData = Array.from({length: 20}, (e, i) => {
    return {
        numberOfProfiles: 3000 * (Math.random()).toFixed(1),
        rangeEnd: i * 50,
        sumOfSkips: 20 * (Math.random()).toFixed(1),
        sumOfVisitedSites: 40 * (Math.random()).toFixed(1),
    }
});

const ProfStatServer = ({index, data}) => {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <div className={s.main}>
            <p style={{fontSize: '2rem'}}>Демонстрационный блок. Не кликается, просто для виду с рандомизированными значениями.</p>
            <ProfStatServerHeader activeTab={activeTab} setActiveTab={setActiveTab} index={index} data={data} updateDate={Date.now()}/>
            <div className={s.content}>
                {activeTab === 1 || activeTab === 2 ? <ProfStatServerItem stat={testData} color={'#8B98EE'}/> : ''}
                {activeTab === 1 || activeTab === 3 ? <ProfStatServerItem stat={testData} color={'#87D449'}/> : ''}
                {activeTab === 4 ? <ProfStatServerItem stat={testData} color={'#5BC2FF'}/> : ''}
            </div>
        </div>
    );
};

export default ProfStatServer;