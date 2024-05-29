import React, {useContext} from 'react';
import CaptchaContentHeader from "./CaptchaContentHeader/CaptchaContentHeader";
import CaptchaServer from "./CaptchaServer/CaptchaServer";
import {PMService} from "../../API/PMService";
import {AlertContext} from "../../App";
import {useQueryClient} from "react-query";
import {defaultCatch} from "../../utils/tools";

const Captcha = ({filteredServers, setModalConfirm, setModalCaptcha}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();

    const handleDel = (id, name) => setModalConfirm({
        isOpen: true,
        data: {
            title: `Удалить сервер <b>${name}?</b>`,
            color: 'red',
            btnText: 'Да, удалить',
            iconType: 'server',
            onConfirm: (close) => {
                PMService.antiCaptcha.delete(id).then(() => {
                    addAlert([{status: true, message: `Сервер ${name} успешно удален`}]);
                    queryClient.invalidateQueries('captcha');
                    close();
                }).catch(e => defaultCatch(e, addAlert, () => close()));
            }
        },
    });

    const handleEdit = data => setModalCaptcha({isOpen: true, data});

    return (
        <div>
            <CaptchaContentHeader/>
            {filteredServers?.map(server =>
                <CaptchaServer key={server.id} server={server} handleDel={handleDel} handleEdit={handleEdit}/>)}
        </div>
    );
};

export default Captcha;