import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {routeNames} from "../../router/routeNames";
import s from './Menu.module.scss';
import svgIcons from "./svgIcons";

const Menu = ({logout}) => {
    const [service, setService] = useState('servers'); // servers or mobile

    const serviceSwitch = () => {
        setService(service === 'servers' ? 'mobile' : 'servers');
    };

    return (
        <section className={s.main}>
            <div>
                <button onClick={serviceSwitch}>
                    {service === 'servers' &&
                        <div className={s.serviceBtn}>
                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.06987 0.4559C0.601074 0.911678 0.601074 1.64434 0.601074 3.11123C0.601074 4.57812 0.601074 5.31079 1.06987 5.76657C1.53867 6.22234 2.29227 6.22234 3.80107 6.22234H13.4011C14.9099 6.22234 15.6635 6.22234 16.1323 5.76657C16.6011 5.31079 16.6011 4.57812 16.6011 3.11123C16.6011 1.64434 16.6011 0.911678 16.1323 0.4559C15.6635 0.000122024 14.9099 0.00012207 13.4011 0.00012207H3.80107C2.29227 0.00012207 1.53867 0.000122024 1.06987 0.4559ZM6.20107 4.47234C6.04194 4.47234 5.88933 4.41089 5.77681 4.30149C5.66429 4.19209 5.60107 4.04372 5.60107 3.88901V2.33346C5.60107 2.17875 5.66429 2.03037 5.77681 1.92098C5.88933 1.81158 6.04194 1.75012 6.20107 1.75012C6.3602 1.75012 6.51282 1.81158 6.62534 1.92098C6.73786 2.03037 6.80107 2.17875 6.80107 2.33346V3.88901C6.80107 4.04372 6.73786 4.19209 6.62534 4.30149C6.51282 4.41089 6.3602 4.47234 6.20107 4.47234ZM9.80107 2.5279C9.64194 2.5279 9.48933 2.58936 9.37681 2.69875C9.26429 2.80815 9.20107 2.95652 9.20107 3.11123C9.20107 3.26594 9.26429 3.41432 9.37681 3.52371C9.48933 3.63311 9.64194 3.69457 9.80107 3.69457H13.4011C13.5602 3.69457 13.7128 3.63311 13.8253 3.52371C13.9379 3.41432 14.0011 3.26594 14.0011 3.11123C14.0011 2.95652 13.9379 2.80815 13.8253 2.69875C13.7128 2.58936 13.5602 2.5279 13.4011 2.5279H9.80107ZM3.80107 4.47234C3.64194 4.47234 3.48933 4.41089 3.37681 4.30149C3.26429 4.19209 3.20107 4.04372 3.20107 3.88901V2.33346C3.20107 2.17875 3.26429 2.03037 3.37681 1.92098C3.48933 1.81158 3.64194 1.75012 3.80107 1.75012C3.9602 1.75012 4.11282 1.81158 4.22534 1.92098C4.33786 2.03037 4.40107 2.17875 4.40107 2.33346V3.88901C4.40107 4.04372 4.33786 4.19209 4.22534 4.30149C4.11282 4.41089 3.9602 4.47234 3.80107 4.47234ZM1.06987 8.23368C0.601074 8.68946 0.601074 9.42212 0.601074 10.889C0.601074 12.3559 0.601074 13.0886 1.06987 13.5443C1.53867 14.0001 2.29227 14.0001 3.80107 14.0001H13.4011C14.9099 14.0001 15.6635 14.0001 16.1323 13.5443C16.6011 13.0886 16.6011 12.3559 16.6011 10.889C16.6011 9.42212 16.6011 8.68946 16.1323 8.23368C15.6635 7.7779 14.9099 7.7779 13.4011 7.7779H3.80107C2.29227 7.7779 1.53867 7.7779 1.06987 8.23368ZM9.20107 10.889C9.20107 10.7343 9.26429 10.5859 9.37681 10.4765C9.48933 10.3671 9.64194 10.3057 9.80107 10.3057H13.4011C13.5602 10.3057 13.7128 10.3671 13.8253 10.4765C13.9379 10.5859 14.0011 10.7343 14.0011 10.889C14.0011 11.0437 13.9379 11.1921 13.8253 11.3015C13.7128 11.4109 13.5602 11.4723 13.4011 11.4723H9.80107C9.64194 11.4723 9.48933 11.4109 9.37681 11.3015C9.26429 11.1921 9.20107 11.0437 9.20107 10.889ZM3.20107 11.6668C3.20107 11.8215 3.26429 11.9699 3.37681 12.0793C3.48933 12.1887 3.64194 12.2501 3.80107 12.2501C3.9602 12.2501 4.11282 12.1887 4.22534 12.0793C4.33786 11.9699 4.40107 11.8215 4.40107 11.6668V10.1112C4.40107 9.95652 4.33786 9.80815 4.22534 9.69875C4.11282 9.58936 3.9602 9.5279 3.80107 9.5279C3.64194 9.5279 3.48933 9.58936 3.37681 9.69875C3.26429 9.80815 3.20107 9.95652 3.20107 10.1112V11.6668ZM6.20107 12.2501C6.04194 12.2501 5.88933 12.1887 5.77681 12.0793C5.66429 11.9699 5.60107 11.8215 5.60107 11.6668V10.1112C5.60107 9.95652 5.66429 9.80815 5.77681 9.69875C5.88933 9.58936 6.04194 9.5279 6.20107 9.5279C6.3602 9.5279 6.51282 9.58936 6.62534 9.69875C6.73786 9.80815 6.80107 9.95652 6.80107 10.1112V11.6668C6.80107 11.8215 6.73786 11.9699 6.62534 12.0793C6.51282 12.1887 6.3602 12.2501 6.20107 12.2501Z" fill="#5BC2FF"/>
                            </svg>
                        </div>}
                    {service === 'mobile' &&
                        <div className={s.serviceBtn}>
                            <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.09822 11.6001C6.09822 11.3595 5.98953 11.1654 5.79223 10.9822C5.60909 10.812 5.34905 10.7291 5.09912 10.7251C4.7119 10.7189 4.54404 10.8026 4.3501 10.9822C4.15246 11.1651 4.04411 11.3595 4.04411 11.6001C4.04411 11.8407 4.15246 12.1776 4.3501 12.3606C4.54404 12.5401 4.68964 12.6176 5.09912 12.6176C5.49249 12.6176 5.60909 12.5307 5.79223 12.3606C5.98953 12.1773 6.09822 11.8407 6.09822 11.6001ZM8.3501 8.50012V2.00012C8.3501 1.90533 8.30886 1.8233 8.2264 1.75403C8.14393 1.68476 8.04628 1.65012 7.93343 1.65012H2.18245C2.06961 1.65012 1.97195 1.68476 1.88949 1.75403C1.80702 1.8233 1.76579 1.90533 1.76579 2.00012L1.76579 8.50012C1.76579 8.59491 1.80702 8.67694 1.88949 8.74622C1.97195 8.81549 2.06961 8.85012 2.18245 8.85012H7.93343C8.04628 8.85012 8.14393 8.81549 8.2264 8.74622C8.30886 8.67694 8.3501 8.59491 8.3501 8.50012ZM10.0991 1.40012V12.6001C10.0991 12.9793 9.93419 13.3074 9.60433 13.5845C9.27447 13.8616 8.88384 14.0001 8.43245 14.0001H1.76579C1.3144 14.0001 0.923774 13.8616 0.593913 13.5845C0.264052 13.3074 0.0991211 12.9793 0.0991211 12.6001V1.40012C0.0991211 1.02096 0.264052 0.69283 0.593913 0.415747C0.923774 0.138664 1.3144 0.00012207 1.76579 0.00012207H8.43245C8.88384 0.00012207 9.27447 0.138664 9.60433 0.415747C9.93419 0.69283 10.0991 1.02096 10.0991 1.40012Z" fill="#87D549"/>
                            </svg>
                        </div>}
                </button>
            </div>
            {service === 'servers' &&
                <div>
                    <NavLink to={routeNames.main} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                        {svgIcons.main}
                    </NavLink>
                    <NavLink to={routeNames.captcha} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                        {svgIcons.captcha}
                    </NavLink>
                    <NavLink to={routeNames.groups} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                        {svgIcons.groups}
                    </NavLink>
                    <NavLink to={routeNames.locations} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                        {svgIcons.locations}
                    </NavLink>
                    <NavLink to={routeNames.projects} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                        {svgIcons.projects}
                    </NavLink>
                    <NavLink to={routeNames.settings} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                        {svgIcons.settings}
                    </NavLink>
                    <NavLink to={routeNames.versions} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                        {svgIcons.versions}
                    </NavLink>
                    <NavLink to={routeNames.profileStatistic} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                        {svgIcons.profileStatistic}
                    </NavLink>
                    <NavLink to={routeNames.configPC} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                        {svgIcons.configPC}
                    </NavLink>
                    <NavLink to={routeNames.networks} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                        {svgIcons.networks}
                    </NavLink>
                    <NavLink to={routeNames.dashboard} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                        {svgIcons.dashboard}
                    </NavLink>
                    <NavLink to={routeNames.niches} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                        {svgIcons.niches}
                    </NavLink>
                    {/*<NavLink to={routeNames.pumping} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>*/}
                    {/*</NavLink>*/}
                </div>}
            {service === 'mobile' &&
                <div>
                    <NavLink to={routeNames.management} className={({isActive}) => isActive ? `${s.serviceBtn} ${s.active}` : s.serviceBtn}>
                        <img style={{width: '2.8rem', height: '2.8rem'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADTUlEQVR4nO2dvWsUQRiHH0FQsTFWEqOVImJtI1prrrex0CQ2glgq0Yil/4OtlR/RpLAQW0FQo5aJCH7kIoKI5oxaiLqyMMVxentzuzN372Z+D7xwHJOdvXl2Z+fefW8DQgghhF22A1PAPLAEfHORv54DJoGRYe9kCmwBZoAWkPWIVeCi+xsRgVHgiYeIzngB7JaRsOwEmiVkZC6abhsiAPmUs1BBRuYiP7s2y0h1LgeQkbmYlpDqq6nVgEK+aPVVjdMBZWQuJnSWlGc+gpC7ElKeVxGELElIedYiCFmTEFtCWhJSnpcRhCxKSHnmIgi5IyHlmYwg5KSElGckwhfDbRJSjUsBhZyXjOrkCcGnAWQ8VnLRTvp92d1PEQEZdUd5vzKe6wZV3Olr2l2cfS7gF4BNEfdHtK2+JlyicNF9o19zr/P3Tmk1JYQQQtirSMxqFF9dQnQfCVUk1iE+A7uoKWPAMwODmAWOW9RUxoqBwcsiRKuO09R6PDMyF/ltg240gDcB+si3MR5KyIyBQcsixs2Czx5yVsiTrkFWU+vlAp79Jz656bgbTWtCpgwMWhYhWu7MKJKBm2ZeB+gv38YxqxWJ/cQ9/TwhfnlPPzEW4qhaT8QogOsnRAfDlJHJxr9ISM2EHAaO6AwZHL5TiqasASEhxpAQY0iIMawKaQTKwg4qgmV7rQpZNjDI/UaeOZYQhi8iCSHjgbKwg4pg2V6rQpJFQowhIcaQEGNIiDEkxBgSYgwJMYaEGENCjGFVSCPVbO+fwEJ+uqgqZMXAIA+llPSdZ9W4707tBw4EENJMVci1gg5ulxBStn0nyWZ7R7scjXnV+J4hCkma/AH5193v8fJpahbY29FGQowhIcaQEGNIiDEkxBgSYgwJMYaEGENCEhfSSDXba1XIsoFBHkopqS8SQtpCxlPN9loVInogIcaQEGNIiDEkxBgSYgwJMYaEGENCjCEhNRTyu0L7TpTt7YHP/zD80Nb+vUf7jwX9JVvb68v9Ph9YfMOj/YOC/pKt7fXlaI+d+QUcbGt/xuMDnCjoT9leD64WXAvOdrTdCrwtkDELbCh3bIh2jgOPgB+uIDt/EPOhLkO0A7gCPHRtvwMLwDlgo4ZVCCGEwJu/wFHUye12z2UAAAAASUVORK5CYII=" alt=''/>
                    </NavLink>
                    <NavLink to={routeNames.projectsMob} className={({isActive}) => isActive ? `${s.serviceBtn} ${s.active}` : s.serviceBtn}>
                        {svgIcons.projectsMob}
                    </NavLink>
                    {/*<NavLink to={routeNames.appium} className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>*/}
                    {/*</NavLink>*/}
                </div>}
            <div>
                <NavLink to={routeNames.profile}
                         className={({isActive}) => isActive ? `${s.item} ${s.active}` : s.item}>
                    {svgIcons.user}
                </NavLink>
                <button type={'button'} className={`${s.item} ${s.gray}`} onClick={logout}>{svgIcons.logout}</button>
            </div>
        </section>
    );
};

export default Menu;