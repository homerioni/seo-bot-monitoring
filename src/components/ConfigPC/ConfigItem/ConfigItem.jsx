import React, {useState} from 'react';
import s from './ConfigItem.module.scss';
import ConfigItemHeader from "./ConfigItemHeader/ConfigItemHeader";
import ConfigDetailsItem from "./ConfigDetailsItem/ConfigDetailsItem";

const getRem = (qty) => {
    const rows = Math.ceil(qty / 2);
    return rows * 8.4 + (rows - 1) * 2 + 3 + 'rem';
}

const ConfigItem = ({title, icon, modalOpen, data, setModalConfirm, setModalConfig}) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [closing, setClosing] = useState(false);

    const onClick = () => {
        if (isDetailsOpen) {
            setClosing(true);
            const t = setTimeout(() => {
                setIsDetailsOpen(false);
                setClosing(false);
                clearTimeout(t);
            }, 300);
        } else {
            setIsDetailsOpen(true);
        }
    }

    return (
        <div className={s.main} onClick={onClick}>
            <ConfigItemHeader isDetailsOpen={isDetailsOpen} icon={icon} title={title} modalOpen={modalOpen} qty={data?.length}/>
            {isDetailsOpen &&
                <div className={`${s.content} ${closing ? s.closing : ''}`} style={{'--height': getRem(data?.length)}} onClick={e => e.stopPropagation()}>
                    {data?.map(item => <ConfigDetailsItem key={item.id} data={item} setModalConfirm={setModalConfirm} setModalConfig={setModalConfig}/>)}
                </div>}
        </div>
    );
};

export default ConfigItem;