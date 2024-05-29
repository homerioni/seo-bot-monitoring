import React, {useState} from 'react';
import s from './ModalManageList.module.scss';
import ModalManageListItem from "./ModalManageListItem/ModalManageListItem";
import TextAddBtn from "../../../../UI/Buttons/TextAddBtn/TextAddBtn";

const ModalManageList = ({register, control, watch, setValue, data}) => {
    const [listQty, setListQty] = useState(data?.steps?.length ?? 1);

    const onDel = (index) => {
        setValue('text', watch('text').filter((e, i) => i !== index));
        setListQty(listQty - 1);
    };

    const onSort = (index, changeNum) => {
        const prevEl = watch(`text[${index + changeNum}]`);
        const newEl = watch(`text[${index}]`);
        setValue('text', watch('text').map((item, i) => {
            if (i === index) return prevEl;
            if (i === index + changeNum) return newEl;
            return item;
        }));
    };

    return (
        <div className={s.main}>
            {Array.from({length: listQty}, (e, i) =>
                <ModalManageListItem key={i} index={i} register={register} control={control} onDel={onDel} onSort={onSort}/>
            )}
            <TextAddBtn onClick={() => setListQty(listQty + 1)}/>
        </div>
    );
};

export default ModalManageList;
