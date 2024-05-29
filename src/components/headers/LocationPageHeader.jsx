import React, {useContext} from 'react';
import s from './Header.module.scss';
import locationIcon from '../../assets/img/locationIcon.svg';
import BackLink from "./BackLink/BackLink";
import EditBtn from "./EditBtn/EditBtn";
import DelBtn from "./DelBtn/DelBtn";
import LocationInfo from "./LocationInfo/LocationInfo";
import {getErrorMessage} from "../../utils/tools";
import {AlertContext} from "../../App";
import {useQueryClient} from "react-query";
import {useNavigate} from "react-router";
import {PMService} from "../../API/PMService";

const LocationPageHeader = ({data, setModalConfirm, setModalLocation, qtyServers}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const onEdit = () => setModalLocation({isOpen: true, data});

    const onDel = () => setModalConfirm({
        isOpen: true,
        data: {
            title: `Удалить локацию <b>${data?.name}?</b>`,
            color: 'red',
            btnText: 'Да, удалить',
            iconType: 'server',
            onConfirm: (close) => {
                PMService.location.delete(data.id).then(() => {
                    queryClient.invalidateQueries('locations');
                    queryClient.invalidateQueries('servers');
                    addAlert([{status: true, message: `Локация ${data.name} успешно удалена`}]);
                    navigate('/locations');
                }).catch(e => close(getErrorMessage(e)));
            }
        }
    });

    return (
        <div className={s.main}>
            <div>
                <BackLink src={'/locations'}/>
                <div className={`${s.title} ${s.flex}`}>
                    <div className={s.icon}>
                        <img src={locationIcon} alt=""/>
                    </div>
                    <span>{data?.name}</span>
                </div>
            </div>
            <div>
                <LocationInfo qtyServers={qtyServers} data={data}/>
                <EditBtn onClick={onEdit}/>
                <DelBtn onClick={onDel}/>
            </div>
        </div>
    );
};

export default LocationPageHeader;