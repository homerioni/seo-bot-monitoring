import React from 'react';
import s from './ConfigDiagramItem.module.scss';

const ConfigDiagramItem = ({data, qty, maxValue, color}) => {
    const percent = Math.round(qty / maxValue * 100);

    return (
        <div className={s.main} style={{'--color': color}}>
            <div className={s.titleBox}>
                <div className={s.color}/>
                {data.qtyCpu > 1 ? <div className={s.ramQty}><i>x</i>{data.qtyCpu}</div> : ''}
                <div className={s.title}>{data.cpuName} {data.valueRam}Gb</div>
            </div>
            <div className={s.price}>{data.price.toLocaleString()} руб.</div>
            <div className={s.serversQtyBox}>
                <div className={s.serversQty}>
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.3516 0.325556C-3.57628e-08 0.651111 0 1.17444 0 2.22222C0 3.27 -3.57628e-08 3.79333 0.3516 4.11889C0.7032 4.44444 1.2684 4.44444 2.4 4.44444H9.6C10.7316 4.44444 11.2968 4.44444 11.6484 4.11889C12 3.79333 12 3.27 12 2.22222C12 1.17444 12 0.651111 11.6484 0.325556C11.2968 -3.31137e-08 10.7316 0 9.6 0H2.4C1.2684 0 0.7032 -3.31137e-08 0.3516 0.325556ZM4.2 3.19444C4.08065 3.19444 3.96619 3.15055 3.8818 3.07241C3.79741 2.99427 3.75 2.88828 3.75 2.77778V1.66667C3.75 1.55616 3.79741 1.45018 3.8818 1.37204C3.96619 1.2939 4.08065 1.25 4.2 1.25C4.31935 1.25 4.43381 1.2939 4.5182 1.37204C4.60259 1.45018 4.65 1.55616 4.65 1.66667V2.77778C4.65 2.88828 4.60259 2.99427 4.5182 3.07241C4.43381 3.15055 4.31935 3.19444 4.2 3.19444ZM6.9 1.80556C6.78065 1.80556 6.66619 1.84945 6.5818 1.92759C6.49741 2.00573 6.45 2.11172 6.45 2.22222C6.45 2.33273 6.49741 2.43871 6.5818 2.51685C6.66619 2.59499 6.78065 2.63889 6.9 2.63889H9.6C9.71935 2.63889 9.83381 2.59499 9.9182 2.51685C10.0026 2.43871 10.05 2.33273 10.05 2.22222C10.05 2.11172 10.0026 2.00573 9.9182 1.92759C9.83381 1.84945 9.71935 1.80556 9.6 1.80556H6.9ZM2.4 3.19444C2.28065 3.19444 2.16619 3.15055 2.0818 3.07241C1.99741 2.99427 1.95 2.88828 1.95 2.77778V1.66667C1.95 1.55616 1.99741 1.45018 2.0818 1.37204C2.16619 1.2939 2.28065 1.25 2.4 1.25C2.51935 1.25 2.63381 1.2939 2.7182 1.37204C2.80259 1.45018 2.85 1.55616 2.85 1.66667V2.77778C2.85 2.88828 2.80259 2.99427 2.7182 3.07241C2.63381 3.15055 2.51935 3.19444 2.4 3.19444ZM0.3516 5.88111C-3.57628e-08 6.20667 0 6.73 0 7.77778C0 8.82556 -3.57628e-08 9.34889 0.3516 9.67444C0.7032 10 1.2684 10 2.4 10H9.6C10.7316 10 11.2968 10 11.6484 9.67444C12 9.34889 12 8.82556 12 7.77778C12 6.73 12 6.20667 11.6484 5.88111C11.2968 5.55556 10.7316 5.55556 9.6 5.55556H2.4C1.2684 5.55556 0.7032 5.55556 0.3516 5.88111ZM6.45 7.77778C6.45 7.66727 6.49741 7.56129 6.5818 7.48315C6.66619 7.40501 6.78065 7.36111 6.9 7.36111H9.6C9.71935 7.36111 9.83381 7.40501 9.9182 7.48315C10.0026 7.56129 10.05 7.66727 10.05 7.77778C10.05 7.88829 10.0026 7.99427 9.9182 8.07241C9.83381 8.15055 9.71935 8.19444 9.6 8.19444H6.9C6.78065 8.19444 6.66619 8.15055 6.5818 8.07241C6.49741 7.99427 6.45 7.88829 6.45 7.77778ZM1.95 8.33333C1.95 8.44384 1.99741 8.54982 2.0818 8.62796C2.16619 8.7061 2.28065 8.75 2.4 8.75C2.51935 8.75 2.63381 8.7061 2.7182 8.62796C2.80259 8.54982 2.85 8.44384 2.85 8.33333V7.22222C2.85 7.11172 2.80259 7.00573 2.7182 6.9276C2.63381 6.84945 2.51935 6.80556 2.4 6.80556C2.28065 6.80556 2.16619 6.84945 2.0818 6.9276C1.99741 7.00573 1.95 7.11172 1.95 7.22222V8.33333ZM4.2 8.75C4.08065 8.75 3.96619 8.7061 3.8818 8.62796C3.79741 8.54982 3.75 8.44384 3.75 8.33333V7.22222C3.75 7.11172 3.79741 7.00573 3.8818 6.9276C3.96619 6.84945 4.08065 6.80556 4.2 6.80556C4.31935 6.80556 4.43381 6.84945 4.5182 6.9276C4.60259 7.00573 4.65 7.11172 4.65 7.22222V8.33333C4.65 8.44384 4.60259 8.54982 4.5182 8.62796C4.43381 8.7061 4.31935 8.75 4.2 8.75Z" fill="#A1B1C5"/>
                    </svg>
                    <span>{qty}</span>
                </div>
                <span>/</span>
                <div className={s.percentServers}>{percent}%</div>
                {/*<div className={s.infoBox}>*/}
                {/*    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                {/*        <rect width="18" height="18" rx="9" fill="#EEEFF5"/>*/}
                {/*        <path d="M10.3328 7.71652L8.13436 7.96899L8.05564 8.30328L8.48764 8.37629C8.76989 8.43787 8.82557 8.53112 8.76413 8.78887L8.05564 11.8397C7.86939 12.6288 8.15644 13 8.83133 13C9.35454 13 9.96223 12.7783 10.2378 12.4739L10.3222 12.108C10.1302 12.2628 9.84991 12.3244 9.66367 12.3244C9.39966 12.3244 9.30366 12.1546 9.37182 11.8555L10.3328 7.71652ZM10.4 5.8797C10.4 6.11301 10.2989 6.33677 10.1188 6.50174C9.93878 6.66672 9.69459 6.7594 9.43998 6.7594C9.18537 6.7594 8.94118 6.66672 8.76115 6.50174C8.58111 6.33677 8.47996 6.11301 8.47996 5.8797C8.47996 5.64639 8.58111 5.42263 8.76115 5.25766C8.94118 5.09268 9.18537 5 9.43998 5C9.69459 5 9.93878 5.09268 10.1188 5.25766C10.2989 5.42263 10.4 5.64639 10.4 5.8797Z" fill="#8998AB"/>*/}
                {/*    </svg>*/}
                {/*</div>*/}
            </div>
            <div className={s.percentStat}>
                <span style={{width: `${percent + 3}%`}}/>
            </div>
        </div>
    );
};

export default ConfigDiagramItem;