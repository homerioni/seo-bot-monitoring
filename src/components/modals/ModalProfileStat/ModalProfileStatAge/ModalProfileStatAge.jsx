import React from 'react';
import s from './ModalProfileStatAge.module.scss';
import Header from "./Header/Header";

const ModalProfileStatAge = ({ages}) => {
    const maxValue = ages?.data ? Math.max(...ages.data.map(el => el.numberOfProfiles ?? 0)) : 0;

    const items = ages?.data?.map((item, i) => {
        const height = item.numberOfProfiles / maxValue * 20;

        return (
            <div key={i} className={s.item}>
                <div className={s.values}>
                    <p>{item.numberOfProfiles}</p>
                </div>
                <div className={s.lineValue} style={{height: `${height}rem`}}/>
                <p className={s.index}>{item.age}</p>
            </div>
        );
    })
    return (
        <div className={s.main}>
            <Header average={ages?.average.toFixed(1)}/>
            <div className={s.content}>
                {items}
            </div>
        </div>
    );
};

export default ModalProfileStatAge;