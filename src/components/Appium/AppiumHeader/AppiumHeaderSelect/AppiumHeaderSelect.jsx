import React, {useRef} from 'react';
import s from './AppiumHeaderSelect.module.scss';
import {appiumSelectIcons} from "../../AppiumTools";
import {useToggleDropDownList} from "../../../../hooks/useToggleDropDownList";

const AppiumHeaderSelect = ({serviceActive, setServiceActive}) => {
    const mainRef = useRef();
    const [isOpen, setIsOpen, isClosing] = useToggleDropDownList(mainRef, 240);

    return (
        <div className={s.main} ref={mainRef}>
            <div className={s.selectBox} onClick={() => setIsOpen(true)}>
                <div className={s.selectIconBox}>
                    <div className={s.selectIcon} style={{backgroundColor: appiumSelectIcons[serviceActive].color}}>
                        {appiumSelectIcons[serviceActive].icon}
                    </div>
                    <p className={s.name}>{appiumSelectIcons[serviceActive].text}</p>
                </div>
                <div className={`${s.arrow} ${isOpen && !isClosing ? s.active : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 12L10 6L4 12" stroke="#1E1E22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            {isOpen &&
                <div className={`${s.list} ${isClosing ? s.closing : ''}`}>
                    <div className={s.listItem} onClick={() => {setServiceActive('yandex'); setIsOpen(false);}}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.25359 12.7831C7.5703 13.3233 6.70693 13.6458 5.76823 13.6458C3.55334 13.6458 1.75781 11.8503 1.75781 9.63542C1.75781 7.42052 3.55334 5.625 5.76823 5.625C7.98312 5.625 9.77865 7.42052 9.77865 9.63542C9.77865 10.5738 9.45636 11.4369 8.91643 12.1201L10.5275 13.7312C10.7106 13.9142 10.7106 14.211 10.5275 14.3941C10.3444 14.5771 10.0476 14.5771 9.86459 14.3941L8.25359 12.7831ZM2.69531 9.63542C2.69531 7.93829 4.0711 6.5625 5.76823 6.5625C7.46535 6.5625 8.84115 7.93829 8.84115 9.63542C8.84115 10.464 8.51317 11.2161 7.97995 11.7688C7.9657 11.78 7.95196 11.7922 7.93881 11.8054C7.92563 11.8186 7.91339 11.8323 7.90211 11.8466C7.34937 12.3801 6.59713 12.7083 5.76823 12.7083C4.0711 12.7083 2.69531 11.3325 2.69531 9.63542Z" fill="#E54129" stroke="#E54129" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.8668 14.5695H17.2808V11.4235H15.9678L13.9268 14.5695H12.1328L14.4598 11.0985C13.9745 10.8558 13.5845 10.5178 13.2898 10.0845C13.0038 9.65115 12.8608 9.14848 12.8608 8.57648C12.8608 7.66648 13.1728 6.91681 13.7968 6.32748C14.4208 5.72948 15.3568 5.43048 16.6048 5.43048C16.6221 5.43048 17.0035 5.43915 17.7488 5.45648C18.1301 5.46515 18.5028 5.46948 18.8668 5.46948V14.5695ZM15.8248 9.92848H17.2808V6.96448C16.8388 6.93848 16.5051 6.92548 16.2798 6.92548C15.7598 6.92548 15.3395 7.06848 15.0188 7.35448C14.7068 7.64048 14.5508 8.01315 14.5508 8.47248C14.5508 8.85381 14.6678 9.17448 14.9018 9.43448C15.1445 9.68581 15.4521 9.85048 15.8248 9.92848Z" fill="#E54129"/>
                        </svg>
                        <p className={s.name}>{appiumSelectIcons.yandex.text}</p>
                    </div>
                    <div className={s.listItem} onClick={() => {setServiceActive('google'); setIsOpen(false);}}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.54558 12.7831C6.86229 13.3233 5.99892 13.6458 5.06022 13.6458C2.84533 13.6458 1.0498 11.8503 1.0498 9.63542C1.0498 7.42052 2.84533 5.625 5.06022 5.625C7.27511 5.625 9.07064 7.42052 9.07064 9.63542C9.07064 10.5738 8.74835 11.4369 8.20842 12.1201L9.81949 13.7312C10.0026 13.9142 10.0026 14.211 9.81949 14.3941C9.63644 14.5771 9.33964 14.5771 9.15658 14.3941L7.54558 12.7831ZM1.9873 9.63542C1.9873 7.93829 3.3631 6.5625 5.06022 6.5625C6.75735 6.5625 8.13314 7.93829 8.13314 9.63542C8.13314 10.464 7.80516 11.2161 7.27194 11.7688C7.25769 11.78 7.24395 11.7922 7.2308 11.8054C7.21762 11.8186 7.20539 11.8323 7.1941 11.8466C6.64137 12.3801 5.88912 12.7083 5.06022 12.7083C3.3631 12.7083 1.9873 11.3325 1.9873 9.63542Z" fill="#4285F4" stroke="#4285F4" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.0808 11.144H15.8838V9.64901H19.5758V13.419C19.1858 13.809 18.6658 14.121 18.0158 14.355C17.3658 14.5803 16.7505 14.693 16.1698 14.693C14.6965 14.693 13.5351 14.2683 12.6858 13.419C11.8451 12.5783 11.4248 11.4387 11.4248 10C11.4248 8.66534 11.8408 7.55167 12.6728 6.65901C13.5048 5.75767 14.6011 5.30701 15.9618 5.30701C17.1231 5.30701 18.0981 5.61467 18.8868 6.23001L18.2108 7.50401C17.9855 7.28734 17.6865 7.11834 17.3138 6.99701C16.9411 6.86701 16.5555 6.80201 16.1568 6.80201C15.2468 6.80201 14.5145 7.08801 13.9598 7.66001C13.3965 8.22334 13.1148 9.00334 13.1148 10C13.1148 10.962 13.3965 11.7377 13.9598 12.327C14.5145 12.9077 15.2598 13.198 16.1958 13.198C16.5251 13.198 16.8805 13.1373 17.2618 13.016C17.6431 12.886 17.9161 12.7387 18.0808 12.574V11.144Z" fill="#4285F4"/>
                        </svg>
                        <p className={s.name}>{appiumSelectIcons.google.text}</p>
                    </div>
                    <div className={s.listItem} onClick={() => {setServiceActive('yaService'); setIsOpen(false);}}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.58879 14.5H7.00279V11.354H5.68979L3.64879 14.5H1.85479L4.18179 11.029C3.69646 10.7863 3.30646 10.4483 3.01179 10.015C2.72579 9.58167 2.58279 9.079 2.58279 8.507C2.58279 7.597 2.89479 6.84733 3.51879 6.258C4.14279 5.66 5.07879 5.361 6.32679 5.361C6.34412 5.361 6.72546 5.36967 7.47079 5.387C7.85212 5.39567 8.22479 5.4 8.58879 5.4V14.5ZM5.54679 9.859H7.00279V6.895C6.56079 6.869 6.22712 6.856 6.00179 6.856C5.48179 6.856 5.06146 6.999 4.74079 7.285C4.42879 7.571 4.27279 7.94367 4.27279 8.403C4.27279 8.78433 4.38979 9.105 4.62379 9.365C4.86646 9.61633 5.17412 9.781 5.54679 9.859ZM17.4267 12.42L18.0377 13.616C17.7517 13.9193 17.34 14.1663 16.8027 14.357C16.274 14.5477 15.715 14.643 15.1257 14.643C13.739 14.643 12.608 14.214 11.7327 13.356C10.866 12.498 10.4327 11.3627 10.4327 9.95C10.4327 8.598 10.8443 7.47567 11.6677 6.583C12.4823 5.699 13.622 5.257 15.0867 5.257C16.248 5.257 17.171 5.56467 17.8557 6.18L17.1407 7.363C16.5253 6.95567 15.8407 6.752 15.0867 6.752C14.22 6.752 13.5093 7.04233 12.9547 7.623C12.4 8.20367 12.1227 8.97933 12.1227 9.95C12.1227 10.9033 12.413 11.6747 12.9937 12.264C13.583 12.8533 14.3413 13.148 15.2687 13.148C16.066 13.148 16.7853 12.9053 17.4267 12.42Z" fill="#FE6E1E"/>
                        </svg>
                        <p className={s.name}>{appiumSelectIcons.yaService.text}</p>
                    </div>
                    <div className={s.listItem} onClick={() => {setServiceActive('direct'); setIsOpen(false);}}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5657 10.5657C17.8781 10.2533 17.8781 9.74673 17.5657 9.43431L12.4745 4.34315C12.1621 4.03073 11.6556 4.03073 11.3431 4.34315C11.0307 4.65557 11.0307 5.1621 11.3431 5.47452L15.8686 10L11.3431 14.5255C11.0307 14.8379 11.0307 15.3444 11.3431 15.6569C11.6556 15.9693 12.1621 15.9693 12.4745 15.6569L17.5657 10.5657ZM3 9.2C2.55817 9.2 2.2 9.55817 2.2 10C2.2 10.4418 2.55817 10.8 3 10.8V9.2ZM17 9.2L3 9.2V10.8L17 10.8V9.2Z" fill="#5BC2FF"/>
                        </svg>
                        <p className={s.name}>{appiumSelectIcons.direct.text}</p>
                    </div>
                    <div className={s.listItem} onClick={() => {setServiceActive('yaTarget'); setIsOpen(false);}}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.13281 9.98476L4.67125 13L10.1328 7" stroke="#87D549" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.8668 14.5695H17.2808V11.4235H15.9678L13.9268 14.5695H12.1328L14.4598 11.0985C13.9745 10.8558 13.5845 10.5178 13.2898 10.0845C13.0038 9.65115 12.8608 9.14848 12.8608 8.57648C12.8608 7.66648 13.1728 6.91681 13.7968 6.32748C14.4208 5.72948 15.3568 5.43048 16.6048 5.43048C16.6221 5.43048 17.0035 5.43915 17.7488 5.45648C18.1301 5.46515 18.5028 5.46948 18.8668 5.46948V14.5695ZM15.8248 9.92848H17.2808V6.96448C16.8388 6.93848 16.5051 6.92548 16.2798 6.92548C15.7598 6.92548 15.3395 7.06848 15.0188 7.35448C14.7068 7.64048 14.5508 8.01315 14.5508 8.47248C14.5508 8.85381 14.6678 9.17448 14.9018 9.43448C15.1445 9.68581 15.4521 9.85048 15.8248 9.92848Z" fill="#E54129"/>
                        </svg>
                        <p className={s.name}>{appiumSelectIcons.yaTarget.text}</p>
                    </div>
                    <div className={s.listItem} onClick={() => {setServiceActive('goTarget'); setIsOpen(false);}}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.4248 9.98476L3.96325 13L9.4248 7" stroke="#87D549" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.0808 11.144H15.8838V9.64901H19.5758V13.419C19.1858 13.809 18.6658 14.121 18.0158 14.355C17.3658 14.5803 16.7505 14.693 16.1698 14.693C14.6965 14.693 13.5351 14.2683 12.6858 13.419C11.8451 12.5783 11.4248 11.4387 11.4248 10C11.4248 8.66534 11.8408 7.55167 12.6728 6.65901C13.5048 5.75767 14.6011 5.30701 15.9618 5.30701C17.1231 5.30701 18.0981 5.61467 18.8868 6.23001L18.2108 7.50401C17.9855 7.28734 17.6865 7.11834 17.3138 6.99701C16.9411 6.86701 16.5555 6.80201 16.1568 6.80201C15.2468 6.80201 14.5145 7.08801 13.9598 7.66001C13.3965 8.22334 13.1148 9.00334 13.1148 10C13.1148 10.962 13.3965 11.7377 13.9598 12.327C14.5145 12.9077 15.2598 13.198 16.1958 13.198C16.5251 13.198 16.8805 13.1373 17.2618 13.016C17.6431 12.886 17.9161 12.7387 18.0808 12.574V11.144Z" fill="#4285F4"/>
                        </svg>
                        <p className={s.name}>{appiumSelectIcons.goTarget.text}</p>
                    </div>
                    <div className={s.listItem} onClick={() => {setServiceActive('sum'); setIsOpen(false);}}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.05811 6.00294L6.02263 6.03818C5.97611 5.99134 5.95 5.92801 5.95 5.86199V5.2C5.95 5.06193 6.06193 4.95 6.2 4.95H13.8C13.9381 4.95 14.05 5.06193 14.05 5.2V6.07778C14.05 6.21585 13.9381 6.32778 13.8 6.32778H8.9202C8.78775 6.32778 8.7203 6.48689 8.8124 6.58208L11.9491 9.82398C12.0439 9.92199 12.0427 10.0779 11.9464 10.1744L8.71056 13.4163C8.6162 13.5108 8.68316 13.6722 8.81673 13.6722H13.8C13.9381 13.6722 14.05 13.7842 14.05 13.9222V14.8C14.05 14.9381 13.9381 15.05 13.8 15.05H6.2C6.06193 15.05 5.95 14.9381 5.95 14.8V14.149C5.95 14.0831 5.97602 14.0198 6.02239 13.973M6.05811 6.00294L6.02239 13.973M6.05811 6.00294L6.02263 6.03818L9.85318 9.89448C9.91123 9.95292 9.9113 10.0472 9.85333 10.1058L6.02239 13.973M6.05811 6.00294L6.02239 13.973" fill="#8B98EE" stroke="#8B98EE" strokeWidth="0.1"/>
                        </svg>
                        <p className={s.name}>{appiumSelectIcons.sum.text}</p>
                    </div>
                </div>}
        </div>
    );
};

export default AppiumHeaderSelect;