import React, {useEffect, useState} from 'react';
import s from "../NodeType.module.scss";
import TableNodeTypeInput from "./TableNodeTypeInput";

const TableNodeType = ({data}) => {
    const [qtyColumns, setQtyColumns] = useState(data.watch(`${data.id}[0]`)?.length || 2);
    const [qtyRow, setQtyRow] = useState(data.watch(data.id)?.length || 4);

    useEffect(() => {
        if (data.watch) {
            setQtyColumns(data.watch(`${data.id}[0]`)?.length);
            setQtyRow(data.watch(data.id)?.length);
        }
    }, [data]);

    const delRow = () => {
        if (qtyRow > 1) {
            data.setValue(data.id, data.watch(data.id).slice(0, -1));
            setQtyRow(qtyRow - 1);
        }
    };

    const delColumn = () => {
        if (qtyColumns > 1) {
            const newTableData = data.watch(data.id).map(el => el.slice(0, -1));
            data.setValue(data.id, newTableData);
            setQtyColumns(qtyColumns - 1);
        }
    };

    return (
        <>
            <div className={s.table}>
                <table>
                    <tbody>
                    {Array.from({length: qtyRow}, (e, rowI) => {
                        return (
                            <tr key={rowI}>
                                {Array.from({length: qtyColumns}, (e, columnI) => {
                                    return (
                                        <td key={columnI}>
                                            <TableNodeTypeInput data={data} rowIndex={rowI} columnIndex={columnI} disabled={data?.disabled}/>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <div className={`${s.btnRow} ${s.add}`}><button type='button' onClick={() => setQtyRow(qtyRow + 1)}/></div>
                <div className={`${s.btnColumn} ${s.add}`}><button type='button' onClick={() => setQtyColumns(qtyColumns + 1)}/></div>
                <div className={`${s.btnRow} ${s.del}`}><button type='button' onClick={delRow}/></div>
                <div className={`${s.btnColumn} ${s.del}`}><button type='button' onClick={delColumn}/></div>
            </div>
        </>
    );
};

export default TableNodeType;