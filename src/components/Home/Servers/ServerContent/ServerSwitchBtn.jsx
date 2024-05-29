import React, {useEffect, useState} from 'react';
import SwitchBtn from "../../../UI/StatusUI/SwitchBtn/SwitchBtn";
import {PMService} from "../../../../API/PMService";
import {useQueryClient} from "react-query";
import {getErrorMessage} from "../../../../utils/tools";

const ServerSwitchBtn = ({server, isDetailsOpen, setModalConfirm}) => {
    const queryClient = useQueryClient();
    const [isActiveSend, setIsActiveSend] = useState(server.isSentActive);

    useEffect(() => {
        if (server.isSentActive !== isActiveSend) setIsActiveSend(server.isSentActive);
    }, [server]);

    const switchBtnHandle = (e) => {
        e.stopPropagation();
        const textState = isActiveSend ? 'Выключить' : 'Включить';
        const successHandle = (close) => {
            queryClient.invalidateQueries([`threads${server.id}`]);
            setIsActiveSend(!isActiveSend);
            close([{
                status: true,
                message: `Отправка на сервере ${server.name} успешно ${isActiveSend ? 'выключена' : 'включена'}`
            }]);
        }
        if (server.modes?.length) setModalConfirm({
            isOpen: true,
            data: {
                title: `${textState} отправку <b>${server.name}?</b>`,
                color: isActiveSend ? 'red' : 'green',
                btnText: `Да, ${textState}`,
                iconType: 'server',
                onConfirm: (close) => {
                    if (server.isSentActive) {
                        PMService.settings.sendingStop(server.id).then(() => successHandle(close)).catch(e => close(getErrorMessage(e)));
                    } else {
                        PMService.settings.sendingStart(server.id).then(() => successHandle(close)).catch(e => close(getErrorMessage(e)));
                    }
                },
            }
        })
    }

    return (
        <div>
            <SwitchBtn
                active={server.modes?.length ? isActiveSend : undefined}
                isBgGray={isDetailsOpen}
                onClick={switchBtnHandle}
            />
        </div>
    );
};

export default ServerSwitchBtn;