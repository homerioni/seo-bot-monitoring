import React from 'react';
import s from './PumpingLocation.module.scss';

const PumpingLocation = () => {
    return (
        <div className={s.main}>
            <div className={s.icon}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8592 3.92195C10.2676 1.21756 7.99719 0 6.00282 0C6.00282 0 6.00282 0 5.99718 0C4.00845 0 1.73238 1.21171 1.14083 3.9161C0.481677 6.93658 2.26196 9.49463 3.87323 11.1044C4.47042 11.7015 5.23662 12 6.00282 12C6.76902 12 7.53522 11.7015 8.12677 11.1044C9.73804 9.49463 11.5183 6.94244 10.8592 3.92195ZM6 6.54546C5.07953 6.54546 4.33333 5.81283 4.33333 4.90909C4.33333 4.00535 5.07953 3.27273 6 3.27273C6.92047 3.27273 7.66667 4.00535 7.66667 4.90909C7.66667 5.81283 6.92047 6.54546 6 6.54546Z" fill="#5BC2FF"/>
                </svg>
            </div>
            <p>Квартира П / 1-1</p>
        </div>
    );
};

export default PumpingLocation;