import React from 'react';
import s from "./ProfStatServerItem.module.scss";
import ProfStatServerListItem from "./ProfStatServerListItem/ProfStatServerListItem";
import {convertToThousands} from "../../../../utils/tools";

const ProfStatServerItem = ({stat, color, openModalHandle, reqData}) => {
    const maxNum = stat ? Math.max(...stat.map(el => el.numberOfProfiles ?? 0)) : 0;
    let values = [Math.ceil(maxNum * 1.67), Math.ceil(maxNum), Math.ceil(maxNum / 3)];

    const items = stat?.map((item, i) =>
        <ProfStatServerListItem key={i} data={item} color={color} maxValue={values[1]} openModalHandle={openModalHandle} reqData={reqData}/>)

    return (
        <div className={s.main}>
            <div className={s.values}>
                <span>{convertToThousands(values[0])}</span>
                <span>{convertToThousands(values[1])}</span>
                <span>{convertToThousands(values[2])}</span>
            </div>
            <img className={s.icon} alt=""/>
            <div className={s.scrollBox}>
                <div className={s.contentBox}>
                    <div className={s.content}>
                        {items}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfStatServerItem;