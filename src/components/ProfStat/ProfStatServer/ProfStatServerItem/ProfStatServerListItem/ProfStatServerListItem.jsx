import React from 'react';
import s from './ProfStatServerListItem.module.scss';

const itemLines = Array.from({length: 5}, () => null).map((e, i) => <div key={i} className={s.line}/>)

const ProfStatServerListItem = ({data, color, maxValue, openModalHandle, reqData}) => {
    const itemHeight = () => 6.3 * (data?.numberOfProfiles ? data.numberOfProfiles / maxValue : 0);

    const onClick = () => {
        openModalHandle([{
            ...reqData,
            fullRange: data.rangeEnd,
            startRange: data.rangeStart,
            step: 1,
        }], data);
    }

    return (
        <div className={s.main} style={{'--color': color}} onClick={onClick}>
            <span className={s.value}>{data.rangeEnd}</span>
            {itemLines}
            <div className={s.content}>
                <div className={s.icons}>
                    <p>
                        <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.84509 0C2.41369 0 1.25 1.16369 1.25 2.59509C1.25 3.99916 2.34813 5.13554 3.77953 5.18471C3.82323 5.17925 3.86694 5.17925 3.89972 5.18471C3.91065 5.18471 3.91611 5.18471 3.92704 5.18471C3.9325 5.18471 3.9325 5.18471 3.93796 5.18471C5.33658 5.13554 6.43471 3.99916 6.44017 2.59509C6.44017 1.16369 5.27648 0 3.84509 0Z" fill={color}/>
                            <path d="M6.62157 6.63512C5.0973 5.61894 2.61148 5.61894 1.07628 6.63512C0.382434 7.09951 0 7.72779 0 8.39978C0 9.07177 0.382434 9.69459 1.07081 10.1535C1.83568 10.6671 2.84094 10.9238 3.84619 10.9238C4.85145 10.9238 5.8567 10.6671 6.62157 10.1535C7.30995 9.68913 7.69238 9.06631 7.69238 8.38885C7.68692 7.71686 7.30995 7.09404 6.62157 6.63512Z" fill={color}/>
                        </svg>
                        <span>{Math.floor(data?.numberOfProfiles ?? 0)}</span>
                    </p>
                    <p>
                        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.09158 5.79631C8.41199 5.9813 8.41199 6.44377 8.09158 6.62876L1.60329 10.3748C1.28288 10.5598 0.882371 10.3285 0.882372 9.95855L0.882372 2.46652C0.882372 2.09654 1.28288 1.86531 1.60329 2.0503L8.09158 5.79631Z" stroke={color} strokeWidth="1.40001"/>
                            <mask id="mask0_4357_87703" maskUnits="userSpaceOnUse" x="0" y="1" width="9" height="10">
                                <path d="M8.0315 5.90037C8.27181 6.03911 8.27181 6.38596 8.0315 6.5247L1.54322 10.2707C1.30291 10.4095 1.00252 10.236 1.00252 9.95855L1.00253 2.46652C1.00253 2.18904 1.30291 2.01561 1.54322 2.15435L8.0315 5.90037Z" fill="#D9D9D9" stroke="#A1B1C5" strokeWidth="0.240307"/>
                            </mask>
                            <g mask="url(#mask0_4357_87703)">
                                <rect x="0.12113" y="6.33304" width="8.57095" height="4.16532" fill={color} stroke={color} strokeWidth="0.240307"/>
                            </g>
                        </svg>
                        <span>{Math.floor(data?.avgOfVisitedSites)}</span>
                    </p>
                    <p>
                        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5.11007" cy="5.5588" r="4.07247" stroke="#FE6E1E" strokeWidth="1.0625"/>
                            <path d="M7.33753 7.8721C8.59065 6.74418 8.42257 4.87308 8.06493 4.24008C8.01587 4.15325 7.90276 4.14912 7.82838 4.21557L3.43373 8.14209C3.35363 8.21366 3.35234 8.33647 3.44637 8.38838C4.11307 8.75646 6.09365 8.99171 7.33753 7.8721Z" fill="#FE6E1E"/>
                            <path d="M0.972168 9.19995L9.18262 1.81055" stroke="#FE6E1E" strokeWidth="1.0625" strokeLinecap="round"/>
                        </svg>
                        <span>{Math.floor(data?.sumOfSkips)}</span>
                    </p>
                </div>
                <div className={s.item} style={{height: `${itemHeight()}rem`}}></div>
            </div>
        </div>
    );
};

export default ProfStatServerListItem;