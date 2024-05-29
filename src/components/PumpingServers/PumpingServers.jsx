import React from 'react';
import s from './PumpingServers.module.scss';
import PumpingContentHeader from "./PumpingContentHeader/PumpingContentHeader";
import PumpingContentItem from "./PumpingContentItem/PumpingContentItem";
import PumpingContentTitle from "./PumpingContentTitle/PumpingContentTitle";
import PumpingLocationGroup from "./PumpingLocationGroup/PumpingLocationGroup";

const PumpingServers = () => {
    return (
        <>
            <PumpingContentHeader/>
            <div className={s.contentList}>
                <div className={s.contentBox}>
                    <PumpingContentTitle type={'location'} title={'Квартира П'} qty={'12'}/>
                    <PumpingLocationGroup qty={'3'} textList={['Стойка-1', 'Полка-1']}/>
                    <div className={s.content}>
                        <PumpingContentItem/>
                        <PumpingContentItem/>
                        <PumpingContentItem/>
                    </div>
                    <PumpingLocationGroup qty={'2'} textList={['Стойка-1', 'Полка-2']}/>
                    <div className={s.content}>
                        <PumpingContentItem/>
                        <PumpingContentItem/>
                    </div>
                </div>
                <div className={s.contentBox}>
                    <PumpingContentTitle type={'location'} title={'Комната'} qty={'30'}/>
                    <PumpingLocationGroup qty={'3'} textList={['Стойка-1', 'Полка-1']}/>
                    <div className={s.content}>
                        <PumpingContentItem/>
                        <PumpingContentItem/>
                        <PumpingContentItem/>
                        <PumpingContentItem/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PumpingServers;