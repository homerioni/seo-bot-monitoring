import React from 'react';
import {Route, Routes} from "react-router";
import {routeNames} from "./routeNames";
import MainPage from "../pages/MainPage";
import GroupsPage from "../pages/GroupsPage";
import GroupPage from "../pages/GroupPage";
import ProjectsPage from "../pages/ProjectsPage";
import SettingsPage from "../pages/SettingsPage";
import VersionsPage from "../pages/VersionsPage";
import MonitoringPage from "../pages/MonitoringPage";
import ProfStatPage from "../pages/ProfStatPage";
import ProjectPage from "../pages/ProjectPage";
import XmlPage from "../pages/XmlPage";
import NetworksPage from "../pages/NetworksPage";
import CaptchaPage from "../pages/CaptchaPage";
import Map from "../pages/Map";
import ConfigPCPage from "../pages/ConfigPCPage";
import MetrikaPage from "../pages/MetricaPage";
import Statistics from "../pages/Statistics";
import Niches from "../pages/Niches";
import {ReactFlowProvider} from "reactflow";
import DashboardPage from "../pages/DashboardPage";
import CommunicationPage from "../pages/CommunicationPage";
import LocationsPage from "../pages/LocationsPage";
import LocationPage from "../pages/LocationPage";
import PumpingServersPage from "../pages/PumpingServersPage";
import ProfilePage from "../pages/ProfilePage";
import {useQuery} from "react-query";
import {PMService} from "../API/PMService";
import {ProjectsAPI} from "../API/ProjectsAPI";
import ManagementPage from "../pages/ManagementPage";
import AppiumProjectsPage from "../pages/AppiumProjectsPage";
import AppiumPage from "../pages/AppiumPage";

const AppRouter = () => {
    const servers = useQuery('servers', () => PMService.server.getAll(), {keepPreviousData: true, refetchOnWindowFocus: false, refetchInterval: 300000});
    const projects = useQuery('projects', () => ProjectsAPI.project.getAll(), {keepPreviousData: true, refetchOnWindowFocus: false, refetchInterval: 240000});
    const locations = useQuery('locations', () => PMService.location.getAll(), {keepPreviousData: true, refetchOnWindowFocus: false, refetchInterval: 600000});
    const accessory = useQuery('accessory', () => PMService.accessory.getAll(), {keepPreviousData: true, refetchOnWindowFocus: false, refetchInterval: 600000});

	return (
		<Routes>
            <Route path={routeNames.main} element={<MainPage servers={servers} projects={projects} accessory={accessory} locations={locations}/>}/>
            <Route path={routeNames.captcha} element={<CaptchaPage/>}/>
            <Route path={routeNames.groups} element={<GroupsPage servers={servers}/>}/>
            <Route path={routeNames.groups + '/:id'} element={<GroupPage servers={servers} projects={projects} accessory={accessory} locations={locations}/>}/>
            <Route path={routeNames.monitoring + '/:id'} element={<MonitoringPage/>}/>
            <Route path={routeNames.yandexAccounts} element={<XmlPage/>}/>
            <Route path={routeNames.yandexMetrika} element={<MetrikaPage/>}/>
            <Route path={routeNames.settings} element={<SettingsPage/>}/>
            <Route path={routeNames.versions} element={<VersionsPage servers={servers}/>}/>
            <Route path={routeNames.profileStatistic} element={<ProfStatPage servers={servers}/>}/>
            <Route path={routeNames.configPC} element={<ConfigPCPage/>}/>
            <Route path={routeNames.projects} element={<ProjectsPage servers={servers} projects={projects}/>}/>
            <Route path={routeNames.projects + '/:id'} element={<ProjectPage servers={servers} projects={projects} accessory={accessory} locations={locations}/>}/>
            <Route path={routeNames.networks} element={<NetworksPage servers={servers}/>}/>
            <Route path={routeNames.map} element={<Map/>}/>
            <Route path={routeNames.dashboard} element={
                <ReactFlowProvider>
                    <DashboardPage servers={servers} projects={projects} locations={locations}/>
                </ReactFlowProvider>
            }/>
            <Route path={routeNames.communication + '/:id'} element={
                <ReactFlowProvider>
                    <CommunicationPage servers={servers} projects={projects} locations={locations}/>
                </ReactFlowProvider>
            }/>
            <Route path={routeNames.locations} element={<LocationsPage locations={locations} servers={servers}/>}/>
            <Route path={routeNames.locations + '/:id'} element={<LocationPage servers={servers} locations={locations} accessory={accessory} projects={projects}/>}/>
			<Route path={routeNames.niches} element={<Niches/>}/>
			<Route path={routeNames.niche + '/:id'} element={<Statistics/>}/>
			<Route path={routeNames.pumping} element={<PumpingServersPage/>}/>
			<Route path={routeNames.profile} element={<ProfilePage/>}/>
			<Route path={routeNames.management} element={<ManagementPage/>}/>
			<Route path={routeNames.projectsMob} element={<AppiumProjectsPage/>}/>
			<Route path={routeNames.appium} element={<AppiumPage/>}/>
		</Routes>
	);
};

export default AppRouter;