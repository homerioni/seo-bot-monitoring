import React from 'react';
import s from './ServerConfigItem.module.scss';
import {getAccessoryHtmlData, getOrderAccessory, getTitleAccessory} from "../../../../../../utils/tools";

const ServerConfigItem = ({data}) => {
    let title = getTitleAccessory(data);

    return (
        <div className={s.main} style={{order: getOrderAccessory(data?.type)}}>
            <p className={s.title}>{title}</p>
            <p className={s.name}>
                {data?.name}
                {getAccessoryHtmlData(data).map((item, i) =>
                    <React.Fragment key={i}><i> | </i>{item.text}&nbsp;{item.postscript}</React.Fragment>)}
                {data.qty && <><i> | </i> <b>x{data.qty}</b></>}
            </p>
            <a href={data?.linkToSpecification} target='_blank' type="button" className={s.btn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                    <path d="M4.21803 13.0817C3.18519 12.7088 2.26895 11.9791 1.68589 10.9414C0.353185 8.57415 1.16947 5.49345 3.53502 4.0666L7.43317 1.71551C9.78206 0.288654 12.814 1.06692 14.1467 3.41799C15.4794 5.78527 14.6631 8.86601 12.2975 10.2929L11.7811 10.6496" stroke="#5BC2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.8294 4.8761C18.8622 5.24903 19.7785 5.97863 20.3615 7.01634C21.6942 9.38363 20.8779 12.4644 18.5124 13.8912L14.6142 16.2423C12.2653 17.6691 9.23344 16.8909 7.90073 14.5398C6.56803 12.1725 7.38431 9.09181 9.74986 7.66495L10.2663 7.30824" stroke="#5BC2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </a>
        </div>
    );
};

export default ServerConfigItem;