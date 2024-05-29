import React, {useEffect, useRef, useState} from 'react';
import s from './TableNodeType.module.scss';

const TableNodeTypeInput = ({data, columnIndex, rowIndex, disabled}) => {
    const spanRef = useRef();
    const [value, setValue] = useState('');
    const [width, setWidth] = useState(20);

    const onChange = async e => {
        await setValue(e.target.value);
        setWidth(spanRef.current.offsetWidth);
    }

    useEffect(() => setValue(data.watch(`${data.id}[${rowIndex}][${columnIndex}]`)), [data]);

    useEffect(() => setWidth(spanRef.current.offsetWidth), [value]);

    useEffect(() => {
        return () => {
            data.unregister(`${data.id}[${rowIndex}][${columnIndex}]`);
        };
    }, []);

    return (
        <>
            <span className={s.hideText} ref={spanRef}>{value}</span>
            <label className={s.label}>
                <input {...data.register(`${data.id}[${rowIndex}][${columnIndex}]`)} style={{width: `${width}px`}} type="text" onInput={onChange} disabled={disabled}/>
            </label>
        </>
    );
};

export default TableNodeTypeInput;