import React, {useContext, useState} from 'react';
import s from './ModalCaptchaForm.module.scss';
import {useForm} from "react-hook-form";
import InputText from "../../../UI/Form/InputText/InputText";
import ButtonsForm from "../../../UI/Buttons/ButtonsForm/ButtonsForm";
import SwitchRadioButtons from "../../../UI/Form/SwitchRadioButtons/SwitchRadioButtons";
import {PMService} from "../../../../API/PMService";
import {AlertContext} from "../../../../App";
import {useQueryClient} from "react-query";
import {defaultCatch, getFullIp} from "../../../../utils/tools";

const ourIcon = (<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="23" height="23" rx="11.5" fill="#8B98EE"/><path d="M17 10.3028C17 9.68518 16.6975 9.11362 16.1842 8.77253L12.5175 6.31113C11.9033 5.89629 11.0967 5.89629 10.4825 6.31113L6.81583 8.77253C6.31167 9.11362 6 9.68518 6 10.3028V15.5391C6 15.7972 6.20167 16 6.45833 16H16.5417C16.7983 16 17 15.7972 17 15.5391V10.3028ZM11.5 13.6953C10.62 13.6953 9.89583 12.967 9.89583 12.082C9.89583 11.1971 10.62 10.4688 11.5 10.4688C12.38 10.4688 13.1042 11.1971 13.1042 12.082C13.1042 12.967 12.38 13.6953 11.5 13.6953Z" fill="white"/>
</svg>);
const rentIcon = (<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="23" height="23" rx="11.5" fill="#FE85D5"/><path d="M8.77891 17.0687C8.76016 17.0687 8.73516 17.0812 8.71641 17.0812C7.50391 16.4812 6.51641 15.4874 5.91016 14.2749C5.91016 14.2562 5.92266 14.2312 5.92266 14.2124C6.68516 14.4374 7.47266 14.6062 8.25391 14.7374C8.39141 15.5249 8.55391 16.3062 8.77891 17.0687Z" fill="white"/><path d="M17.0859 14.2812C16.4672 15.5249 15.4359 16.5312 14.1797 17.1374C14.4172 16.3437 14.6172 15.5437 14.7484 14.7374C15.5359 14.6062 16.3109 14.4374 17.0734 14.2124C17.0672 14.2374 17.0859 14.2624 17.0859 14.2812Z" fill="white"/><path d="M17.1359 8.81904C16.3484 8.58154 15.5547 8.38779 14.7484 8.25029C14.6172 7.44404 14.4234 6.64404 14.1797 5.86279C15.4734 6.48154 16.5172 7.52529 17.1359 8.81904Z" fill="white"/><path d="M8.78203 5.93086C8.55703 6.69336 8.39453 7.46836 8.26328 8.25586C7.45703 8.38086 6.65703 8.58086 5.86328 8.81836C6.46953 7.56211 7.47578 6.53086 8.71953 5.91211C8.73828 5.91211 8.76328 5.93086 8.78203 5.93086Z" fill="white"/><path d="M13.6828 8.11826C12.2328 7.95576 10.7703 7.95576 9.32031 8.11826C9.47656 7.26201 9.67656 6.40576 9.95781 5.58076C9.97031 5.53076 9.96406 5.49326 9.97031 5.44326C10.4641 5.32451 10.9703 5.24951 11.5016 5.24951C12.0266 5.24951 12.5391 5.32451 13.0266 5.44326C13.0328 5.49326 13.0328 5.53076 13.0453 5.58076C13.3266 6.41201 13.5266 7.26201 13.6828 8.11826Z" fill="white"/><path d="M8.11875 13.6823C7.25625 13.5261 6.40625 13.3261 5.58125 13.0448C5.53125 13.0323 5.49375 13.0386 5.44375 13.0323C5.325 12.5386 5.25 12.0323 5.25 11.5011C5.25 10.9761 5.325 10.4636 5.44375 9.97607C5.49375 9.96982 5.53125 9.96982 5.58125 9.95732C6.4125 9.68232 7.25625 9.47607 8.11875 9.31982C7.9625 10.7698 7.9625 12.2323 8.11875 13.6823Z" fill="white"/><path d="M17.7496 11.5011C17.7496 12.0323 17.6746 12.5386 17.5559 13.0323C17.5059 13.0386 17.4684 13.0323 17.4184 13.0448C16.5871 13.3198 15.7371 13.5261 14.8809 13.6823C15.0434 12.2323 15.0434 10.7698 14.8809 9.31982C15.7371 9.47607 16.5934 9.67607 17.4184 9.95732C17.4684 9.96982 17.5059 9.97607 17.5559 9.97607C17.6746 10.4698 17.7496 10.9761 17.7496 11.5011Z" fill="white"/><path d="M13.6828 14.8813C13.5266 15.7438 13.3266 16.5938 13.0453 17.4188C13.0328 17.4688 13.0328 17.5063 13.0266 17.5563C12.5391 17.6751 12.0266 17.7501 11.5016 17.7501C10.9703 17.7501 10.4641 17.6751 9.97031 17.5563C9.96406 17.5063 9.97031 17.4688 9.95781 17.4188C9.68281 16.5876 9.47656 15.7438 9.32031 14.8813C10.0453 14.9626 10.7703 15.0188 11.5016 15.0188C12.2328 15.0188 12.9641 14.9626 13.6828 14.8813Z" fill="white"/><path d="M13.8521 13.8516C12.2889 14.0488 10.7111 14.0488 9.14792 13.8516C8.95069 12.2884 8.95069 10.7106 9.14792 9.14743C10.7111 8.95021 12.2889 8.95021 13.8521 9.14743C14.0493 10.7106 14.0493 12.2884 13.8521 13.8516Z" fill="white"/>
</svg>);

const ModalCaptchaForm = ({data, setModalCaptcha}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {isValid}} = useForm({
        mode: "onChange",
        defaultValues: data
    });

    const onSubmit = reqData => {
        setIsLoading(true);
        reqData.ip = getFullIp(reqData.ip);
        if (data) {
            PMService.antiCaptcha.change(data.id, reqData).then(resp => {
                setIsLoading(false);
                addAlert([{status: true, message: `Изменения для сервера анти-каптчи ${reqData.name} успешно сохранены`}]);
                queryClient.invalidateQueries('captcha');
                setModalCaptcha({isOpen: true, data: resp.result[0]});
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        } else {
            PMService.antiCaptcha.create(reqData).then(resp => {
                setIsLoading(false);
                addAlert([{status: true, message: `Сервер анти-каптчи ${reqData.name} успешно создан`}]);
                queryClient.invalidateQueries('captcha');
                setModalCaptcha({isOpen: true, data: resp.result[0]});
            }).catch(e => defaultCatch(e, addAlert, setIsLoading));
        }
    };

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.title}>Информация</div>
            <InputText register={{...register('name')}} title='Название' tooltip='Наименование сервера.' className={s.flex33}/>
            <InputText register={{...register('ip')}} title='IP-адрес' tooltip='IP адрес сервера, указывается в формате 255.255.255.255 или c добавление порта 255.255.255.255:8080.' className={s.flex33}/>
            <InputText register={{...register('apiKey')}} title='api-ключ' tooltip='Api-ключ для доступа к серверу.' className={s.flex33}/>
            <InputText register={{...register('serverPaymentDate')}} title='дата оплаты сервера' placeholder='гггг-мм-дд' className={s.flex33}/>
            <InputText register={{...register('softPaymentDate')}} title='дата оплаты софта' placeholder='гггг-мм-дд' className={s.flex33}/>
            <SwitchRadioButtons register={{...register('affiliation')}}
                                title='ПРИНАДЛЕЖНОСТЬ'
                                tooltip='Можно указать кому принадлежит сервер, наш собственный или арендованный.'
                                className={s.flex33}
                                items={[
                                    {val: 'OUR', name: 'Наш', icon: ourIcon},
                                    {val: 'RENT', name: 'Аренда', icon: rentIcon}
                                ]}/>
            <ButtonsForm isValid={isValid} isLoading={isLoading}/>
        </form>
    );
};

export default ModalCaptchaForm;