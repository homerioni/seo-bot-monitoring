import React, {useEffect, useRef} from 'react';
import s from './DashLocationsListItem.module.scss';

const DashLocationsListItem = ({server, index}) => {
    const errorRef = useRef(null);
    const statusClassName = server.status === 'ACTIVE' ? s.green : server.status === 'NON_ACTIVE' ? s.red : s.purple;

    useEffect(() => {
        if (window.innerWidth > 768) {
            const element = errorRef?.current;

            const addClass = e => {
                element.classList.add(s.active);
                element.style.left = e.clientX + 'px';
                element.style.top = e.clientY + 'px';
            }

            const removeClass = () => element.classList.remove(s.active);

            if (element) {
                element.addEventListener('mousemove', addClass);
                element.addEventListener('mouseout', removeClass);
            }

            return () => {
                if (element) {
                    element.removeEventListener('mousemove', addClass);
                    element.removeEventListener('mouseout', removeClass);
                }
            }
        } else {}
    }, []);

    return (
        <div className={s.itemBox}>
            <p className={s.number}>{index + 1}</p>
            <div className={s.item}>
                <div className={`${s.icon} ${statusClassName}`}/>
                <p className={s.text}>{server.name}</p>
                {!!server.error ?
                    <div className={s.error} ref={errorRef}>
                        <p>{server.error}</p>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.61758 3.04701C6.03229 3.04701 5.793 2.60829 6.08403 2.07016C6.25218 1.75826 6.15193 1.36066 5.85767 1.18243L5.29824 0.843105C5.04279 0.682011 4.71295 0.777982 4.56097 1.04876L4.5254 1.11388C4.23437 1.652 3.75579 1.652 3.46152 1.11388L3.42595 1.04876C3.28044 0.777982 2.95061 0.682011 2.69515 0.843105L2.13572 1.18243C1.84146 1.36066 1.74121 1.76168 1.90937 2.07359C2.20363 2.60829 1.96434 3.04701 1.37904 3.04701C1.04274 3.04701 0.764648 3.33835 0.764648 3.69824V4.30149C0.764648 4.65795 1.03951 4.95272 1.37904 4.95272C1.96434 4.95272 2.20363 5.39144 1.90937 5.92956C1.74121 6.24147 1.84146 6.63906 2.13572 6.8173L2.69515 7.15662C2.95061 7.31772 3.28044 7.22175 3.43242 6.95097L3.46799 6.88585C3.75902 6.34772 4.2376 6.34772 4.53187 6.88585L4.56744 6.95097C4.71942 7.22175 5.04925 7.31772 5.30471 7.15662L5.86414 6.8173C6.1584 6.63906 6.25864 6.23804 6.09049 5.92956C5.79623 5.39144 6.03552 4.95272 6.62081 4.95272C6.95711 4.95272 7.23521 4.66138 7.23521 4.30149V3.69824C7.23198 3.34178 6.95711 3.04701 6.61758 3.04701ZM3.99831 5.11381C3.41949 5.11381 2.94737 4.61339 2.94737 3.99986C2.94737 3.38634 3.41949 2.88592 3.99831 2.88592C4.57714 2.88592 5.04925 3.38634 5.04925 3.99986C5.04925 4.61339 4.57714 5.11381 3.99831 5.11381Z" fill="white"/>
                        </svg>
                    </div> : ''}
            </div>
        </div>
    );
};

export default DashLocationsListItem;