import React from 'react';
import s from "./ProfileSumItemHeader.module.scss";

const ProfileSumItemHeader = ({average, name}) => {
    return (
        <div className={s.header}>
            <p className={s.title}>{name}</p>
            {average || average === 0 ?
                <div className={s.average}>
                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.09158 4.87248C8.41199 5.05747 8.41199 5.51994 8.09158 5.70493L1.60329 9.45094C1.28288 9.63593 0.882371 9.4047 0.882372 9.03472L0.882372 1.54269C0.882372 1.17272 1.28288 0.941479 1.60329 1.12647L8.09158 4.87248Z" stroke="#A1B1C5" strokeWidth="1.40001"/>
                        <mask id="mask0_5085_181159" maskUnits="userSpaceOnUse" x="0" y="1" width="9" height="9">
                            <path d="M8.0315 4.97654C8.27181 5.11528 8.27181 5.46213 8.0315 5.60087L1.54322 9.34689C1.30291 9.48563 1.00252 9.3122 1.00252 9.03472L1.00253 1.54269C1.00253 1.26521 1.30291 1.09178 1.54322 1.23052L8.0315 4.97654Z" fill="#D9D9D9" stroke="#A1B1C5" strokeWidth="0.240307"/>
                        </mask>
                        <g mask="url(#mask0_5085_181159)">
                            <rect x="0.120153" y="5.40922" width="8.57095" height="4.16532" fill="#A1B1C5" stroke="#A1B1C5" strokeWidth="0.240307"/>
                        </g>
                    </svg>
                    <span>{average.toLocaleString()}</span>
                </div> : ''}
        </div>
    );
};

export default ProfileSumItemHeader;