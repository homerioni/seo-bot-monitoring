import React from 'react';
import s from './ModalProfileStatViewed.module.scss';
import Header from "./Header/Header";

const ModalProfileStatViewed = ({statistic, rangeData}) => {
    const maxValue = statistic ? Math.max(...statistic.map(el => el.numberOfProfiles ?? 0)) : 0;

    const items = statistic?.map((item, i) => {
        const itemHeight = 20 * (item?.numberOfProfiles ? item.numberOfProfiles / maxValue : 0);

        return (
            <div key={item.rangeStart} className={s.item}>
                <div className={s.values}>
                    <p>{item.numberOfProfiles}</p>
                    <p>{item.sumOfSkips}</p>
                </div>
                <div className={s.lineValue} style={{height: `${itemHeight}rem`}}/>
                <p className={s.index}>{rangeData.rangeStart + i}</p>
            </div>
        );
    });

    return (
        <div className={s.main}>
            <Header rangeData={rangeData}/>
            <div className={s.content}>
                {items}
            </div>
        </div>
    );
};

export default ModalProfileStatViewed;