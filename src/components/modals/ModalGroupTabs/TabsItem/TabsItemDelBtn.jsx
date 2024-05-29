import React from 'react';
import s from './TabsItem.module.scss';
import {PMService} from "../../../../API/PMService";
import {getErrorMessage} from "../../../../utils/tools";

const TabsItemDelBtn = ({data, setModalConfirm, queryClient}) => {
    const onDel = () => setModalConfirm({isOpen: true, data: {
            title: `Удалить вкладку <b>${data.name}?</b>`,
            color: 'red',
            btnText: 'Да, удалить',
            iconType: 'group',
            onConfirm: (close) => PMService.groupTab.delete(data.id).then(resp => {
                queryClient.invalidateQueries('groups');
                queryClient.invalidateQueries('groupsTabs');
                close([{status: true, message: `Вкладка ${data.name} успешно удаленна`}]);
            }).catch(e => close(getErrorMessage(e)))
        }});

    return (
        <button className={`${s.btn} ${s.delTab}`} onClick={onDel}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8013 3.9225C14.5938 3.8025 13.3863 3.7125 12.1713 3.645V3.6375L12.0063 2.6625C11.8938 1.9725 11.7288 0.9375 9.97378 0.9375H8.00878C6.26128 0.9375 6.09627 1.9275 5.97627 2.655L5.81878 3.615C5.12128 3.66 4.42378 3.705 3.72628 3.7725L2.19628 3.9225C1.88128 3.9525 1.65628 4.23 1.68628 4.5375C1.71628 4.845 1.98628 5.07 2.30128 5.04L3.83128 4.89C7.76128 4.5 11.7213 4.65 15.6963 5.0475C15.7188 5.0475 15.7338 5.0475 15.7563 5.0475C16.0413 5.0475 16.2888 4.83 16.3188 4.5375C16.3413 4.23 16.1163 3.9525 15.8013 3.9225Z" fill="#EB376D"></path>
                <path d="M14.4218 6.105C14.2418 5.9175 13.9943 5.8125 13.7393 5.8125H4.25932C4.00432 5.8125 3.74932 5.9175 3.57682 6.105C3.40432 6.2925 3.30682 6.5475 3.32182 6.81L3.78682 14.505C3.86932 15.645 3.97432 17.07 6.59182 17.07H11.4068C14.0243 17.07 14.1293 15.6525 14.2118 14.505L14.6768 6.8175C14.6918 6.5475 14.5943 6.2925 14.4218 6.105ZM10.2443 13.3125H7.74682C7.43932 13.3125 7.18432 13.0575 7.18432 12.75C7.18432 12.4425 7.43932 12.1875 7.74682 12.1875H10.2443C10.5518 12.1875 10.8068 12.4425 10.8068 12.75C10.8068 13.0575 10.5518 13.3125 10.2443 13.3125ZM10.8743 10.3125H7.12432C6.81682 10.3125 6.56182 10.0575 6.56182 9.75C6.56182 9.4425 6.81682 9.1875 7.12432 9.1875H10.8743C11.1818 9.1875 11.4368 9.4425 11.4368 9.75C11.4368 10.0575 11.1818 10.3125 10.8743 10.3125Z" fill="#EB376D"></path>
            </svg>
        </button>
    );
};

export default TabsItemDelBtn;