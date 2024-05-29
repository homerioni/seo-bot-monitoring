import React from 'react';
import s from './ServerListBtns.module.scss';
import DotBtnList from "../../../../UI/DotBtnList/DotBtnList";
import {useQueryClient} from "react-query";
import {PMService} from "../../../../../API/PMService";
import {getErrorMessage} from "../../../../../utils/tools";

const ServerListBtns = ({isDetailsOpen, setIsUpper, server, setModalConfirm, setModalServer}) => {
    const queryClient = useQueryClient();

    const onEdit = () => {
        setModalServer({isOpen: true, data: server});
    }

    const onDel = () => setModalConfirm({
        isOpen: true,
        data: {
            title: `Удалить сервер <b>${server.name}?</b>`,
            color: 'red',
            btnText: `Да, удалить`,
            iconType: 'server',
            onConfirm: (close) => {
                PMService.server.delete(server.id).then(() => {
                    queryClient.setQueryData('servers', (servers) => {
                        return {...servers, result: servers.result.filter(item => item.id !== server.id)};
                    });
                    queryClient.invalidateQueries([`servers`]);
                    close([{status: true, message: `Сервер ${server.name} успешно удален`}]);
                }).catch(e => close(getErrorMessage(e)));
            },
        }
    });

    const onTurn = () => {
        const textState = server.isAlive ? 'Выключить' : 'Включить';
        const turnHandle = (close) => {
            queryClient.invalidateQueries([`servers`]);
            close([{status: true, message: `Сервер ${server.name} успешно ${server.isAlive ? 'выключен' : 'включен'}`}]);
        }
        setModalConfirm({
            isOpen: true,
            data: {
                title: `${textState} сервер <b>${server.name}?</b>`,
                color: server.isAlive ? 'red' : 'green',
                btnText: `Да, ${textState}`,
                iconType: 'server',
                onConfirm: (close) => {
                    if (server.isAlive) {
                        PMService.server.off(server.id).then(() => turnHandle(close)).catch(e => close(getErrorMessage(e)));
                    } else {
                        PMService.server.on(server.id).then(() => turnHandle(close)).catch(e => close(getErrorMessage(e)));
                    }
                },
            }
        })
    }

    const onReset = () => setModalConfirm({
        isOpen: true,
        data: {
            title: `Перезапустить сервер <b>${server.name}?</b>`,
            color: 'green',
            btnText: `Да, перезапустить`,
            iconType: 'server',
            onConfirm: (close) => {
                PMService.server.reboot(server.id).then(() => {
                    queryClient.invalidateQueries([`servers`]);
                    close([{status: true, message: `Сервер ${server.name} успешно начал перезагрузку`}]);
                }).catch(e => close(getErrorMessage(e)));
            },
        }
    });

    return (
        <DotBtnList onEdit={onEdit}
                    onDel={onDel}
                    onTurn={onTurn}
                    onReset={onReset}
                    onSocket={() => {}}
                    handleToggle={state => setIsUpper(state)}
                    className={isDetailsOpen ? s.gray : null}/>
    );
};

export default ServerListBtns;