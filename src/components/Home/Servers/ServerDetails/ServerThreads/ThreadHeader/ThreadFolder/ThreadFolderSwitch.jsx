import React from 'react';
import {PMService} from "../../../../../../../API/PMService";
import SwitchBtn from "../../../../../../UI/StatusUI/SwitchBtn/SwitchBtn";
import {getErrorMessage} from "../../../../../../../utils/tools";

const ThreadFolderSwitch = ({data, setModalConfirm, queryClient}) => {
    const isActive = data.folderDistribution?.isActive;

    const switchBtnHandle = () => {
        const textState = isActive ? 'Выключить' : 'Включить';
        setModalConfirm({
            isOpen: true,
            data: {
                title: `${textState} копирование по настройке <b>${data.name}?</b>`,
                color: isActive ? 'red' : 'green',
                btnText: `Да, ${textState}`,
                iconType: 'server',
                onConfirm: (close) => {
                    PMService.folderDistribution.change(data.folderDistribution.folderDistributionId, {
                        ...data.folderDistribution,
                        isActive: !isActive
                    }).then(() => {
                        queryClient.invalidateQueries([`threads${data.server.id}`]);
                        close([{
                            status: true,
                            message: `Копирование по настройке ${data.name} успешно ${isActive ? 'выключено' : 'включено'}`
                        }]);
                    }).catch(e => close(getErrorMessage(e)));
                },
            }
        })
    }

    return <SwitchBtn active={isActive} onClick={switchBtnHandle}/>;
};

export default ThreadFolderSwitch;