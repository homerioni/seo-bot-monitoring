import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Menu from "./components/Menu/Menu";
import {useQueryClient} from "react-query";
import {PMService, updateTokenPM} from "./API/PMService";
import React, {createContext, useEffect, useState} from "react";
import AlertBox from "./components/UI/AlertBox/AlertBox";
import ModalAuth from "./components/modals/ModalAuth/ModalAuth";
import {updateTokenUsers, UsersAPI} from "./API/UsersAPI";
import ModalConfirm from "./components/modals/ModalConfirm/ModalConfirm";
import {updateTokenProjects} from "./API/ProjectsAPI";

export const AlertContext = createContext('without provider');

function App({alertCallback}) {
    const [alertMessages, setAlertMessages] = useState([]);
    const [isAuth, setIsAuth] = useState(localStorage.getItem('jwtToken'));
    const [modalConfirm, setModalConfirm] = useState({
        isOpen: false,
        data: {title: '', color: 'green', btnText: 'Да', iconType: 'server', onConfirm: () => {}}
    });
    const queryClient = useQueryClient();

    const addAlert = items => setAlertMessages(prev => [...prev, ...items]);
    alertCallback(addAlert);

    const logout = () => {
        setModalConfirm({
            isOpen: true,
            data: {
                title: 'Выйти из вашего аккаунта?',
                color: 'green',
                btnText: 'Да, выйти',
                iconType: 'server',
                onConfirm: () => {
                    UsersAPI.auth.logout().then(() => {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('refreshToken');
                        window.location.reload();
                    });
                }
            }
        })
    };

    useEffect(() => {
        const timer = setInterval(() => {
            PMService.folderDistribution.whoIsActive.forEach(item => {
                PMService.folderDistribution.request(item.id).then(resp => {
                    resp.result.forEach(result => {
                        if (result.status === 'ERROR' || result.status === 'SUCCESS') {
                            const isSuccess = result.status === 'SUCCESS';
                            addAlert([{status: isSuccess, message: `${item.serverName} (${item.threadName}):<br/> ${result.message}`}]);
                            PMService.folderDistribution.whoIsActive = PMService.folderDistribution.whoIsActive.filter(el => el.id !== item.id);
                            queryClient.setQueryData(`threads${item.serverId}`, (data) => {
                                const thisThreadData = data.result.find(el => el.id === item.threadId);
                                thisThreadData.folderDistribution.request = result;
                                return {
                                    ...data,
                                    result: [...data.result.filter(el => el.id !== item.threadId), ...thisThreadData]
                                };
                            });
                        }
                    });
                }).catch(() => {});
            });
        }, 5000);

        const jwtToken = localStorage.getItem('jwtToken');
        let jwtTimer;
        if (jwtToken) {
            try {
                const jwtParseDateEnd = JSON.parse(atob(jwtToken.split('.')[1])).exp;
                const timeLeft = jwtParseDateEnd * 1000 - Date.now();
                const refresh = () => {
                    UsersAPI.auth.refresh().then(resp => {
                        localStorage.setItem('jwtToken', resp.result.jwtToken);
                        localStorage.setItem('refreshToken', resp.result.refreshToken);
                        updateTokenUsers(resp.result.jwtToken);
                        updateTokenPM(resp.result.jwtToken);
                        updateTokenProjects(resp.result.jwtToken);
                        queryClient.invalidateQueries();
                        UsersAPI.auth.profile();
                    });
                };

                if (timeLeft <= 0) {
                    refresh();
                } else {
                    jwtTimer = setTimeout(refresh, timeLeft);
                    UsersAPI.auth.profile();
                }
            } catch (e) {
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('refreshToken');
                window.location.reload();
            }
        }

        return () => {
            clearInterval(timer);
            clearTimeout(jwtTimer);
        };
    }, []);

    return (
        <BrowserRouter>
            <AlertContext.Provider value={addAlert}>
                {isAuth ?
                    <div className="main-wrap">
                        <Menu logout={logout}/>
                        <AppRouter/>
                    </div>
                : <ModalAuth queryClient={queryClient} setIsAuth={setIsAuth}/>}
                <AlertBox messages={alertMessages} setMessages={setAlertMessages}/>
                {modalConfirm.isOpen ? <ModalConfirm data={modalConfirm.data} setModalConfirm={setModalConfirm}/> : ''}
            </AlertContext.Provider>
        </BrowserRouter>
    );
}

export default App;