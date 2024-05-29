import React from 'react';
import s from './PumpingStatus.module.scss';

const PumpingStatus = ({level}) => {
    return (
        <div className={`${s.main} ${s[level]}`}>
            <div className={s.points}>
                <i/><i/><i/>
            </div>
            <div className={`${s.wave} ${s[level]}`}>
                {level === 'low' &&
                    <>
                        <svg width="54" height="18" viewBox="0 0 54 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0C7 0 1.66667 4.33333 0 5.5V17.5H54V1C47 1 40.5099 8 31 8C21 8 18.7443 0 12 0Z" fill="#EEF0FCFF"/>
                        </svg>
                        <svg width="54" height="18" viewBox="0 0 54 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0C7 0 1.66667 4.33333 0 5.5V17.5H54V1C47 1 40.5099 8 31 8C21 8 18.7443 0 12 0Z" fill="#EEF0FCFF"/>
                        </svg>
                    </>}
                {level === 'medium' &&
                    <>
                        <svg width="64" height="29" viewBox="0 0 64 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 0.00390625C8 0.00067583 1.66667 5.83724 0 7.00391V29.0039H64V2.50391C57 2.50391 50.5099 10 41 10C31 10 26.4442 0.00812675 16 0.00390625Z" fill="#E7F8DBFF"/>
                        </svg>
                        <svg width="64" height="29" viewBox="0 0 64 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 0.00390625C8 0.00067583 1.66667 5.83724 0 7.00391V29.0039H64V2.50391C57 2.50391 50.5099 10 41 10C31 10 26.4442 0.00812675 16 0.00390625Z" fill="#E7F8DBFF"/>
                        </svg>
                    </>}
                {level === 'high' &&
                    <>
                        <svg width="86" height="40" viewBox="0 0 86 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M62.7568 0.00624693C75.9462 -0.259846 86 8.00531 86 8.00531L77.8649 40H3.48649L0 2.50623C8.13513 2.50623 23.2318 13.0017 34.2838 13.0017C45.9054 13.0017 49.5674 0.272338 62.7568 0.00624693Z" fill="#D5F0BEFF"/>
                        </svg>
                        <svg width="86" height="40" viewBox="0 0 86 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M62.7568 0.00624693C75.9462 -0.259846 86 8.00531 86 8.00531L77.8649 40H3.48649L0 2.50623C8.13513 2.50623 23.2318 13.0017 34.2838 13.0017C45.9054 13.0017 49.5674 0.272338 62.7568 0.00624693Z" fill="#D5F0BEFF"/>
                        </svg>
                    </>}
            </div>
        </div>
    );
};

export default PumpingStatus;