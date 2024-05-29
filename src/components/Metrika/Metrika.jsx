import React from 'react';
import s from './Metrika.module.scss';
import MetrikaHeader from "./MetrikaHeader/MetrikaHeader";
import MetrikaAccount from "./MetrikaAccount/MetrikaAccount";

const Metrika = ({filteredMetrika, setModalConfirm, setModalMetrika}) => {
    return (
        <div className={s.main}>
            <MetrikaHeader/>
            <div className={s.content}>
                {filteredMetrika?.map(account =>
                    <MetrikaAccount key={account.id} account={account} setModalConfirm={setModalConfirm} setModalMetrika={setModalMetrika}/>)}
            </div>
        </div>
    );
};

export default Metrika;