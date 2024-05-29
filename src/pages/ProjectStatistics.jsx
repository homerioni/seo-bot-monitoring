import React, {useEffect, useState} from 'react';
import {useProjectsApi} from "../hooks/useProjectsApi";
import {message, Select} from "antd";
import {useTopVisor} from "../hooks/useTopVisor";

const ProjectStatistics = ({back}) => {
	const [projectsListForSelect, setProjectListForSelect] = useState([])
	const [projectsList, setProjectsList] = useState([])
	const [selectedProject, setSelectedProject] = useState(null)
	const [selectedProjectData, setSelectedProjectData] = useState(null)

	const [getProjectsList, projectsListIsLoading] = useProjectsApi({
		url: '/project/findAllProjects',
		data: {
			"count": 100,
			"numberPage": 0
		}
	})

	const [getProjectData, projectDataIsLoading] = useProjectsApi({
		url: '/statistic-click?projectId=' + selectedProject + '&startAt=2023-12-12T08:39:51&endAt=2024-01-12T08:39:51',
		method: 'GET'
	})

	useEffect(() => {
		getProjectsList().then(resp => {
			console.log('projectsList')
			console.log(resp.result)
			setProjectsList(resp.result)
			setProjectListForSelect(resp.result.map(pr => { return { value: pr.id, label: pr.name } }))
		}).catch(err => message.error(err.message))
	},[])

	useEffect(() => {
		if (selectedProject) {
			console.log('selectedProjectData')
			console.log(projectsList.filter(el => el.id === selectedProject)[0])
			setSelectedProjectData(projectsList.filter(el => el.id === selectedProject)[0])
			getProjectData().then(resp => {
				console.log("clicks statistics")
				console.log(resp.result)
			}).catch(err => message.error(err.message))
		}
	},[selectedProject, projectsList])

	useEffect(() => {
		if (selectedProjectData) {
			/*getProjectTVData().then(resp => {
				console.log('top visor data')
				console.log(resp.result)
				if (resp.result.length === 0) {
					message.error("Проекта topVisor с таким id не существует")
				}
			}).catch(err => message.error(err.message))*/
		}
	},[selectedProjectData])

	const [getProjectTVData, projectTVDataIsLoading] = useTopVisor({
		url: '/get/projects_2/projects',
		data: {
			fields: ["name", "positions_time", 'status_positions', 'url'],
			show_searchers_and_regions: 1,
			id: selectedProjectData?.settingResponse?.topVisorId,
			status_positions: 1,
			include_positions_summary_params: ['status_positions', 'positions_time'],
		}
	})

	return (
		<div>
			<div className="statistics-projects__header">
				<div className="main__btn main__btn--min" onClick={back}>
					<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M19 9C19.5523 9 20 8.55228 20 8C20 7.44772 19.5523 7 19 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM19 7L1 7V9L19 9V7Z"
							fill="#92A1B2"/>
					</svg>
				</div>
				<div className="statistics-projects__header-text static">Анализ факторов влияния на позиции</div>
			</div>
			<div className="statistics-projects__content">
				<Select
					style={{
						width: '30rem',
					}}
					options={projectsListForSelect}
					loading={projectsListIsLoading}
					placeholder="Выберите проект"
					value={selectedProject}
					onChange={val => setSelectedProject(val)}
				/>
			</div>
		</div>
	);
};

export default ProjectStatistics;
