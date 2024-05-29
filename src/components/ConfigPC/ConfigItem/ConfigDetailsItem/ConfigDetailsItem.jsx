import React from 'react';
import s from './ConfigDetailsItem.module.scss';
import {getAccessoryHtmlData, getErrorMessage} from "../../../../utils/tools";
import {PMService} from "../../../../API/PMService";
import {useQueryClient} from "react-query";

const ConfigDetailsItem = ({data, setModalConfirm, setModalConfig}) => {
    const queryClient = useQueryClient();

    const onDel = () => setModalConfirm({
        isOpen: true,
        data: {
            title: `Удалить <b>${data.name}?</b>`,
            color: 'red',
            btnText: 'Да, удалить',
            iconType: 'server',
            onConfirm: (close) => PMService.accessory.delete(data.id, data.type).then(() => {
                queryClient.invalidateQueries('accessory');
                close([{status: true, message: `${data.name} успешно удален`}]);
            }).catch(e => close(getErrorMessage(e)))
        }
    });

    const onEdit = () => setModalConfig({isOpen: true, data, type: data.type});

    return (
        <div className={s.main}>
            <div className={s.content}>
                <div className={s.name}>
                    <p>{data.name}</p>
                </div>
                {getAccessoryHtmlData(data).map((item, i) => (
                    <div key={i} className={s.item}>
                        <p>{item.text}</p>
                        {item.postscript && <p className={s.min}>{item.postscript}</p>}
                    </div>
                ))}
            </div>
            <div className={s.buttons}>
                <a href={data.linkToSpecification} target='_blank' className={s.btn}>
                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.21803 13.0817C3.18519 12.7088 2.26895 11.9791 1.68589 10.9414C0.353185 8.57415 1.16947 5.49345 3.53502 4.0666L7.43317 1.71551C9.78206 0.288654 12.814 1.06692 14.1467 3.41799C15.4794 5.78527 14.6631 8.86601 12.2975 10.2929L11.7811 10.6496" stroke="#5BC2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.8294 4.87598C18.8622 5.2489 19.7785 5.97851 20.3615 7.01622C21.6942 9.3835 20.8779 12.4642 18.5124 13.8911L14.6142 16.2421C12.2653 17.669 9.23344 16.8907 7.90073 14.5397C6.56803 12.1724 7.38431 9.09169 9.74986 7.66483L10.2663 7.30812" stroke="#5BC2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
                <button className={s.btn} onClick={onEdit}>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5029 2.26373L2.03177 11.7332C1.6668 12.0981 1.32008 12.8097 1.24709 13.3206L0.73612 16.9333C0.553631 18.247 1.46607 19.1592 2.77998 18.9768L6.39322 18.4659C6.90419 18.3929 7.61594 18.0462 7.98092 17.6813L17.4521 8.21182C19.0762 6.58795 19.8609 4.6904 17.4521 2.28197C15.0432 -0.144707 13.1453 0.621615 11.5029 2.26373Z" fill="#8B98EE"/>
                        <path d="M9.83789 4.15918C10.6107 6.91659 12.7709 9.09441 15.5459 9.86719" stroke="white" strokeWidth="1.48435" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button className={s.btn} onClick={onDel}>
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.4374 5.09969C17.0287 4.95969 15.6199 4.85469 14.2024 4.77594V4.76719L14.0099 3.62969C13.8787 2.82469 13.6862 1.61719 11.6387 1.61719H9.34618C7.30743 1.61719 7.11492 2.77219 6.97492 3.62094L6.79118 4.74094C5.97743 4.79344 5.16368 4.84594 4.34993 4.92469L2.56493 5.09969C2.19743 5.13469 1.93493 5.45844 1.96993 5.81719C2.00493 6.17594 2.31993 6.43844 2.68743 6.40344L4.47243 6.22844C9.05743 5.77344 13.6774 5.94844 18.3149 6.41219C18.3412 6.41219 18.3587 6.41219 18.3849 6.41219C18.7174 6.41219 19.0062 6.15844 19.0412 5.81719C19.0674 5.45844 18.8049 5.13469 18.4374 5.09969Z" fill="#EB376D"/>
                        <path d="M16.8268 7.64594C16.6168 7.42719 16.328 7.30469 16.0305 7.30469H4.97051C4.67301 7.30469 4.37551 7.42719 4.17426 7.64594C3.97301 7.86469 3.85926 8.16219 3.87676 8.46844L4.41926 17.4459C4.51551 18.7759 4.63801 20.4384 7.69176 20.4384H13.3093C16.363 20.4384 16.4855 18.7847 16.5818 17.4459L17.1243 8.47719C17.1418 8.16219 17.028 7.86469 16.8268 7.64594ZM11.953 16.0547H9.03926C8.68051 16.0547 8.38301 15.7572 8.38301 15.3984C8.38301 15.0397 8.68051 14.7422 9.03926 14.7422H11.953C12.3118 14.7422 12.6093 15.0397 12.6093 15.3984C12.6093 15.7572 12.3118 16.0547 11.953 16.0547ZM12.688 12.5547H8.31301C7.95426 12.5547 7.65676 12.2572 7.65676 11.8984C7.65676 11.5397 7.95426 11.2422 8.31301 11.2422H12.688C13.0468 11.2422 13.3443 11.5397 13.3443 11.8984C13.3443 12.2572 13.0468 12.5547 12.688 12.5547Z" fill="#EB376D"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ConfigDetailsItem;