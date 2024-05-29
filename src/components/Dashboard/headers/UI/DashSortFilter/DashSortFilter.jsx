import React from 'react';
import s from './DashSortFilter.module.scss';

const DashSortFilter = ({name, setValue}) => {
    const onChange = e => setValue(e.target.value);

    return (
        <div className={s.main}>
            <p className={s.title}>Сортировка:</p>
            <div className={s.buttons}>
                <label className={`${s.btn}`}>
                    <input type="radio" name={name} value={'AVERAGE'} onChange={onChange} defaultChecked={true}/>
                    <span>По </span>
                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path style={{stroke: 'var(--color)'}} d="M8.09255 4.87248C8.41296 5.05747 8.41296 5.51994 8.09256 5.70493L1.60427 9.45094C1.28386 9.63593 0.883348 9.4047 0.883348 9.03472L0.883348 1.54269C0.883348 1.17272 1.28386 0.941479 1.60427 1.12647L8.09255 4.87248Z" stroke="#393B44" strokeWidth="1.40001"/>
                        <mask id="mask0_4970_134893" maskUnits="userSpaceOnUse" x="0" y="1" width="9" height="9">
                            <path d="M8.03248 4.97654C8.27279 5.11528 8.27279 5.46213 8.03248 5.60087L1.54419 9.34689C1.30389 9.48563 1.0035 9.3122 1.0035 9.03472L1.0035 1.54269C1.0035 1.26521 1.30389 1.09178 1.54419 1.23052L8.03248 4.97654Z" fill="#D9D9D9" stroke="#A1B1C5" strokeWidth="0.240307"/>
                        </mask>
                        <g mask="url(#mask0_4970_134893)">
                            <rect style={{stroke: 'var(--color)', fill: 'var(--color)'}} x="0.122107" y="5.40922" width="8.57095" height="4.16532" fill="#393B44" stroke="#393B44" strokeWidth="0.240307"/>
                        </g>
                    </svg>
                    {/*<span>за 10 дн</span>*/}
                </label>
                <label className={`${s.btn}`}>
                    <input type="radio" name={name} value={'MIN'} onChange={onChange}/>
                    <span>По min</span>
                </label>
                <label className={`${s.btn}`}>
                    <input type="radio" name={name} value={'MAX'} onChange={onChange}/>
                    <span>По max</span>
                </label>
            </div>
        </div>
    );
};

export default DashSortFilter;