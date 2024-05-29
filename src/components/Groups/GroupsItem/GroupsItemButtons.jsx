import React from 'react';
import s from "./GroupsItem.module.scss";
import {PMService} from "../../../API/PMService";
import {useQueryClient} from "react-query";
import {getErrorMessage} from "../../../utils/tools";

const GroupsItemButtons = ({setModalGroup, setModalConfirm, data}) => {
    const queryClient = useQueryClient();

    const onEdit = () => setModalGroup({isOpen: true, data});

    const onDel = () => setModalConfirm({
        isOpen: true,
        data: {
            title: `Удалить группу <b>${data?.name}?</b>`,
            color: 'red',
            btnText: 'Да, удалить',
            iconType: 'group',
            onConfirm: (close) => {
                PMService.group.delete(data?.id).then(resp => {
                    queryClient.invalidateQueries('groups');
                    close([{status: true, message: `Группа ${data.name} успешно удалена`}]);
                }).catch(e => close(getErrorMessage(e)));
            }
        }
    });

    return (
        <div className={s.buttons}>
            <button type="button" className={s.btn} onClick={onEdit}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.27052 1.0305L0.888686 7.41122C0.642758 7.65711 0.409136 8.13659 0.35995 8.48082L0.0156523 10.9151C-0.107312 11.8003 0.507502 12.415 1.39284 12.292L3.82751 11.9478C4.17181 11.8986 4.6514 11.665 4.89732 11.4192L11.2792 5.03843C12.3735 3.94424 12.9023 2.66564 11.2792 1.0428C9.65604 -0.59234 8.3772 -0.0759795 7.27052 1.0305Z" fill="#8B98EE"/>
                    <path d="M6.15625 2.30768C6.67696 4.16567 8.13258 5.63312 10.0024 6.15383" stroke="#F3F4F8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button type="button" className={s.btn} onClick={onDel}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5078 3.35257C12.4757 3.25001 11.4437 3.17308 10.4052 3.11539V3.10898L10.2642 2.27565C10.1681 1.6859 10.027 0.801289 8.52703 0.801289H6.84754C5.35395 0.801289 5.21293 1.64744 5.11036 2.26924L4.97575 3.08975C4.3796 3.12821 3.78344 3.16667 3.18729 3.22437L1.8796 3.35257C1.61036 3.37821 1.41806 3.61539 1.4437 3.87821C1.46934 4.14103 1.70011 4.33334 1.96934 4.3077L3.27703 4.17949C6.63601 3.84616 10.0206 3.97437 13.4181 4.31411C13.4373 4.31411 13.4501 4.31411 13.4693 4.31411C13.7129 4.31411 13.9245 4.12821 13.9501 3.87821C13.9693 3.61539 13.777 3.37821 13.5078 3.35257Z" fill="#EB376D"/>
                    <path d="M12.3283 5.21796C12.1745 5.0577 11.9629 4.96796 11.745 4.96796H3.64242C3.42447 4.96796 3.20652 5.0577 3.05908 5.21796C2.91165 5.37821 2.82831 5.59616 2.84114 5.82052L3.23857 12.3974C3.30908 13.3718 3.39883 14.5898 5.63601 14.5898H9.75139C11.9886 14.5898 12.0783 13.3782 12.1488 12.3974L12.5463 5.82693C12.5591 5.59616 12.4758 5.37821 12.3283 5.21796ZM8.7578 11.3782H6.62319C6.36037 11.3782 6.14242 11.1603 6.14242 10.8974C6.14242 10.6346 6.36037 10.4167 6.62319 10.4167H8.7578C9.02062 10.4167 9.23857 10.6346 9.23857 10.8974C9.23857 11.1603 9.02062 11.3782 8.7578 11.3782ZM9.29626 8.81411H6.09114C5.82832 8.81411 5.61037 8.59616 5.61037 8.33334C5.61037 8.07052 5.82832 7.85257 6.09114 7.85257H9.29626C9.55908 7.85257 9.77703 8.07052 9.77703 8.33334C9.77703 8.59616 9.55908 8.81411 9.29626 8.81411Z" fill="#EB376D"/>
                </svg>
            </button>
        </div>
    );
};

export default GroupsItemButtons;