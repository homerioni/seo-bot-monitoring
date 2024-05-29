import React, {useState} from 'react';
import s from './NetworksFilter.module.scss';

const NetworksFilter = ({activeTab, setActiveTab}) => {
    const [bgStyle, setBgStyle] = useState( {});
    const onClick = (val, e) => {
        setBgStyle({width: e.target.clientWidth + 'px', left: e.target.offsetLeft + 'px'});
        setActiveTab(val);
    };

    return (
        <div className={`${s.main} mobile`}>
            <div className={s.bg} style={{width: bgStyle.width, left: bgStyle.left}}/>
            <button type='button' className={`${s.btn} ${activeTab === 'ROUTER' ? s.active : ''}`} onClick={e => onClick('ROUTER', e)}>
                Роутеры
            </button>
            <button type='button' className={`${s.btn} ${activeTab === 'ROOT' ? s.active : ''}`} onClick={e => onClick('ROOT', e)}>
                Root-сервера
            </button>
        </div>
    );
};

export default NetworksFilter;