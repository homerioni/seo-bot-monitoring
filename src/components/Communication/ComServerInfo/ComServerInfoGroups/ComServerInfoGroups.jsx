import React from 'react';
import s from './ComServerInfoGroups.module.scss';

const ComServerInfoGroups = ({selectedServer}) => {
    return (
        <div className={s.main}>
            {selectedServer.groups.length ?
                selectedServer.groups.map(item => {
                    return (
                        <div key={item.id} className={s.item}>
                            <svg width="34" height="6" xmlns="http://www.w3.org/2000/svg" fill="none">
                                <path strokeWidth="0" stroke="null" id="svg_1" fillOpacity="0.3" fill="#88D0FA" d="m0,10.82973c0,-3.866 3.13401,-7 7,-7l10.907,0c1.0486,0 2.0838,0.23558 3.0291,0.68934l9.6278,4.62132c0.9453,0.45376 1.9805,0.68934 3.0291,0.68934l109.407,0c3.866,0 7,3.13401 7,6.99996l0,28c0,3.866 -3.134,7 -7,7l-136,0c-3.86599,0 -7,-3.134 -7,-7l0,-33.99996z"/>
                            </svg>
                            <span>{item.name}</span>
                        </div>
                    )
                }) : ''}
        </div>
    );
};

export default ComServerInfoGroups;