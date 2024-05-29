import React from 'react';
import s from '../GroupStat.module.scss';

const GroupStatListItem = ({data, days}) => {
    return (
        <div>
            <div className={s.listItem}>
                <img src={data.settingsTypeIconLink} alt=""/>
                <div>
                    <p>{data.numberOfSuccess}</p>
                    {days !== 1 ? <p>μ{data.averageNumberOfSuccess}</p> : ''}
                </div>
            </div>
            <div className={s.listItem}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 13.7501C10.9518 13.7501 13.75 10.9519 13.75 7.50012C13.75 4.04834 10.9518 1.25012 7.5 1.25012C4.04822 1.25012 1.25 4.04834 1.25 7.50012C1.25 10.9519 4.04822 13.7501 7.5 13.7501Z" stroke="#EB376D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.375 5.62512L5.625 9.37512" stroke="#EB376D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.625 5.62512L9.375 9.37512" stroke="#EB376D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                    <p>{data.numberOfFail}</p>
                    {days !== 1 ? <p>μ{data.averageNumberOfFail}</p> : ''}
                </div>
            </div>
        </div>
    );
};

export default GroupStatListItem;