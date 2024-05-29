import React from 'react';
import s from './PumpingTooltipBox.module.scss'

const PumpingTooltipBox = ({items}) => {
    return (
        <div className={s.list}>
            {items.map(item => <>
                <p className={s.itemName}>{item.name}:</p>
                <p className={s.itemText}>{item.value}</p>
            </>)}
        </div>
    );
};

export default PumpingTooltipBox;