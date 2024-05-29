import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Input, Select, Space} from "antd";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import {Scrollbars} from "react-custom-scrollbars";
import PhrasePlacementRow from "./PhresePlacementRow";
import SwitchUI from "../map/UI/SwitchUI";
import GraphLabel from "./GraphLabel";
import PageIsLoading from "../map/PageIsLoading";
import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";
import {formatDate} from "./utils";

const PhraseSections = ({
							additionalProjects,
							setAdditionalProjects,
							graphData,
							selectedPhraseStats,
							selectedPhrase,
							summaryPositions,
							dates,
							setSelectedPhrase,
							keywordsForSelect,
							back,
							groups,
							graphCountData,
							selectedRegionIndex,
							regionList,
							setSelectedRegionIndex,
							statsIsLoading,
							selectedDevice,
							setSelectedDevice,
							setDates
}) => {

	const colorsArr = [
		'#6be025',
		'#2554e0',
		'#e03b25',
		'#601aa5',
		'#25e0d0',
		'#e0c125',
		'#1c1065',
	]

	const topPlacement = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	const [groupList, setGroupList] = useState([{ value: -1, label: 'Все' }, ...groups.map(el => {return { value: el.id, label: el.name }})])
	const [selectedGroup, setSelectedGroup] = useState(-1)

	const [colorsOnDots, setColorsOnDots] = useState(false)
	const [filteredKeywords, setFilteredKeywords] = useState([])

	const [regionsForSelect, setRegionsForSelect] = useState(regionList.filter(el => el.device === selectedDevice).map(el => { return { value: el.index, label: el.areaName } }))

	useEffect(() => {
		if (selectedGroup > 0) {
			setFilteredKeywords(keywordsForSelect.filter(el => el.group_id === selectedGroup).map(el => { return { label: el.name, value: el.id } }))
		} else {
			setFilteredKeywords(keywordsForSelect.map(el => { return { label: el.name, value: el.id } }))
		}
		console.log('selectedPhraseStats')
		console.log(selectedPhraseStats)
	},[selectedGroup])

	const [selectedProject, setSelectedProject] = useState(-1)
	const [showDomains, setShowDomains] = useState(false)
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [datePickerValue, setDatePickerValue] = useState([dayjs(dates[0]), dayjs(dates[dates.length - 1])])

	const { RangePicker } = DatePicker;

	return (
		<div onClick={() => {
			setSelectedProject(-1)
		}}>
			<div className="statistics-projects__header">
				<div className="main__btn main__btn--min" onClick={back}>
					<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M19 9C19.5523 9 20 8.55228 20 8C20 7.44772 19.5523 7 19 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM19 7L1 7V9L19 9V7Z"
							fill="#92A1B2"/>
					</svg>
				</div>
				<div className="statistics-projects__header-text static">Анализ по фразе</div>
				<div className="statistics-projects__date-picker">
					<div className="statistics-projects__date-picker-icon" onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						setShowDatePicker(st => !st)
					}}>
						<CalendarOutlined />
					</div>
					<div className={showDatePicker ? "statistics-projects__date-picker-form show" : "statistics-projects__date-picker-form"}>
						<RangePicker
							value={datePickerValue}
							onChange={(date, dateString) => {
								let startDate = dateString[0],
									endDate = dateString[1],
									i = 0,
									tmpDate = formatDate(i, endDate),
									newDatesArr = [endDate]
								setDatePickerValue(date)
								while (i < 1000 && tmpDate !== startDate) {
									i++
									tmpDate = formatDate(i, endDate)
									newDatesArr.push(tmpDate)
								}
								setDates(newDatesArr)
							}}
							locale={locale}
						/>
					</div>
				</div>
				<div className="map-filter-select-bg">
					<div className="hm-top-pos-wrapper">
						<div className="hm-top-pos__label">Группа</div>
						<Select
							className="custom sm"
							size="large"
							placeholder="Выберите группу"
							value={selectedGroup}
							options={groupList}
							loading={false}
							onChange={(val) => {
								setSelectedGroup(val)
							}}
						/>
					</div>
				</div>
				<div className="map-filter-select-bg">
					<div className="hm-top-pos-wrapper">
						<div className="hm-top-pos__label">Фраза</div>
						<Select
							className="custom"
							size="large"
							placeholder="Выберите фразу"
							value={selectedPhrase}
							options={filteredKeywords}
							loading={false}
							onChange={(val) => {
								setSelectedPhrase(val)
							}}
						/>
					</div>
				</div>
				<div className="map-filter-select-bg">
					<div className="hm-top-pos-wrapper">
						<div className="hm-top-pos__label">Регион</div>
						<Select
							className="custom sm"
							size="large"
							placeholder="Выберите регион"
							defaultValue={{ value: 1, label: 'Москва и Московская область' }}
							options={regionsForSelect}
							loading={false}
							onChange={(val) => {
								setSelectedRegionIndex(val)
							}}
						/>
					</div>
				</div>
				<SwitchUI className="purple revers" onChange={(val) => {
					let selectedRegionKey = regionList.filter(el => el.index === selectedRegionIndex)[0].key,
						selectedRegionWithNewDevice = regionList.filter(el => el.key === selectedRegionKey && el.device === val)[0]
					setRegionsForSelect(regionList.filter(el => el.device === val).map(el => { return { value: el.index, label: el.areaName } }))
					setSelectedDevice(val)
					if (selectedRegionWithNewDevice?.index) {
						setSelectedRegionIndex(selectedRegionWithNewDevice.index)
					} else {
						setSelectedRegionIndex(val ? 33 : 1)
					}
				}} options={[{title: "desk", value: 0}, { title: "mob", value: 2}]}/>
				<SwitchUI className="purple revers" onChange={(val) => setColorsOnDots(val)} options={[{title: "Цвета топа", value: false}, { title: "Цвета сайта", value: true}]}/>
				<SwitchUI className="purple revers" onChange={(val) => setShowDomains(val)} options={[{title: "Точки", value: false}, { title: "Домены", value: true}]}/>
			</div>
			{/*<div className="main-project__input">
				<Space.Compact
					style={{
						width: '100%',
					}}
				>
					<Input
						placeholder="ID проекта"
						value={additionalProjectForm.id}
						onChange={e => setAdditionalProjectForm(st => { return {...st, id: e.target.value } })}
						status={additionalProjectForm.error ? "error" : ""}
						prefix={
							projectsAdditionalDataIsLoading ? <LoadingOutlined /> : additionalProjectForm.error ? <WarningOutlined /> : additionalProjectForm.ready ? <CheckOutlined /> : false
						}
					/>
					<Button
						onClick={tryGetAdditionalProject}
						type="primary"
					>{projectsAdditionalDataIsLoading ? <LoadingOutlined /> : 'ok'}</Button>
				</Space.Compact>
			</div>*/}
			{additionalProjects.length > 0 &&
			<div className="additional-projects">
				{additionalProjects.map(project =>
					<div className="additional-projects__item" key={project.id}>
						{project.name}
						<DeleteOutlined onClick={() => setAdditionalProjects(st => { return st.filter(el => el.id !== project.id) })}/>
					</div>
				)}
			</div>
			}
			<div className="phrase-statistics">
				{statsIsLoading ? <PageIsLoading/> : selectedPhrase && <>
							<div className="phrase-placement">
								<div className={showDomains ? "phrase-placement__col domains first" : "phrase-placement__col first"}>
									<div className="phrase-placement__cell first">&nbsp;</div>
									<div className="phrase-placement__row">
										{topPlacement.filter(el => el < 4).map(place =>
											<div className="phrase-placement__cell" key={place}>{place}</div>
										)}
									</div>
									<div className="phrase-placement__row">
										{topPlacement.filter(el => el > 3 && el < 7).map(place =>
											<div className="phrase-placement__cell" key={place}>{place}</div>
										)}
									</div>
									<div className="phrase-placement__row">
										{topPlacement.filter(el => el > 6).map(place =>
											<div className="phrase-placement__cell" key={place}>{place}</div>
										)}
									</div>

									{summaryPositions.length > 0 &&
									<div className="phrase-placement__row summary">
										<div className="phrase-placement__cell">∑</div>
									</div>
									}
								</div>
								<div className={showDomains ? "phrase-placement__wrapper domains" : "phrase-placement__wrapper"}>
									<Scrollbars >
										<div className="phrase-placement">
										{dates.map((dt, index) =>
											<div className={showDomains ? "phrase-placement__col domains" : "phrase-placement__col"} key={index}>
												<div className="phrase-placement__cell first" key={356}>{('' + dt).slice(8, 10) + '-' + ('' + dt).slice(5, 7)}</div>
												<PhrasePlacementRow
													placement={[1,2,3]}
													selectedPhraseStats={selectedPhraseStats}
													colorsArr={colorsArr}
													dt={dt}
													selectedRegionIndex={selectedRegionIndex}
													defaultColor="#5BC2FF"
													colored={colorsOnDots}
													selectedProject={selectedProject}
													setSelectedProject={setSelectedProject}
													showDomains={showDomains}
												/>
												<PhrasePlacementRow
													placement={[4,5,6]}
													selectedPhraseStats={selectedPhraseStats}
													colorsArr={colorsArr}
													dt={dt}
													selectedRegionIndex={selectedRegionIndex}
													defaultColor="#87D449"
													colored={colorsOnDots}
													selectedProject={selectedProject}
													setSelectedProject={setSelectedProject}
													showDomains={showDomains}
												/>
												<PhrasePlacementRow
													placement={[7,8,9,10]}
													selectedPhraseStats={selectedPhraseStats}
													colorsArr={colorsArr}
													dt={dt}
													selectedRegionIndex={selectedRegionIndex}
													defaultColor="#c99fe8"
													colored={colorsOnDots}
													selectedProject={selectedProject}
													setSelectedProject={setSelectedProject}
													showDomains={showDomains}
												/>
												{summaryPositions.length > 0 && dates.length === summaryPositions.length &&
													<div className="phrase-placement__row summary">
														<div className="phrase-placement__cell">
															<div className="summary">
																<div className="summary-num">{summaryPositions[index][0]}{summaryPositions[index][1]}{summaryPositions[index][2]}</div>
																<div className="summary-count">{summaryPositions[index][0] + summaryPositions[index][1] + summaryPositions[index][2]}</div>
															</div>
														</div>
													</div>
												}
											</div>
										)}
											<div className={showDomains ? "phrase-placement__col domains last" : "phrase-placement__col last"}>
												<div className="phrase-placement__cell first">&nbsp;</div>
												<div className="phrase-placement__row">
													<div className="phrase-placement__cell">&nbsp;</div>
													<div className="phrase-placement__cell">&nbsp;</div>
													<div className="phrase-placement__cell">&nbsp;</div>
												</div>
												<div className="phrase-placement__row">
													<div className="phrase-placement__cell">&nbsp;</div>
													<div className="phrase-placement__cell">&nbsp;</div>
													<div className="phrase-placement__cell">&nbsp;</div>
												</div>
												<div className="phrase-placement__row">
													<div className="phrase-placement__cell">&nbsp;</div>
													<div className="phrase-placement__cell">&nbsp;</div>
													<div className="phrase-placement__cell">&nbsp;</div>
													<div className="phrase-placement__cell">&nbsp;</div>
												</div>
												{summaryPositions.length > 0 &&
												<div className="phrase-placement__row summary">
													<div className="phrase-placement__cell">&nbsp;</div>
												</div>
												}
											</div>
										</div>
									</Scrollbars>
								</div>
							</div>
					<div className="projects-colors">
						{selectedPhraseStats.map((el, i) =>
							<div className="projects-colors__item" key={i}>
								<div className="project-dot" style={{ backgroundColor: colorsArr[i] }}/>
								<div>{el.name}</div>
							</div>
						)}
					</div>
					{graphData.length > 0 &&
					<div className="phrase-placement__wrapper graph">
						<Scrollbars>
							<div className="projects-graphs">

								<LineChart width={35*dates.length + 100} height={200} data={graphData}
										   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis domain={[0, 400]} allowDataOverflow={true} padding={{ bottom: 10 }}/>
									<Line label={<GraphLabel />} type="monotone" dataKey='sum' stroke="#8B98EE"/>
								</LineChart>
							</div>
						</Scrollbars>
					</div>
					}
					{graphCountData.length > 0 &&
					<div className="phrase-placement__wrapper graph">
						<Scrollbars>
						<div className="projects-graphs">
							<LineChart width={35*dates.length + 100} height={200} data={graphCountData}
									   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis domain={[0, 10]} allowDataOverflow={true} padding={{ top: 10, bottom: 10 }}/>
								<Line label={<GraphLabel />} type="monotone" dataKey='count' stroke="#8B98EE"/>
							</LineChart>
						</div>
						</Scrollbars>
					</div>
					}
				</>}
			</div>
		</div>
	);
};

export default PhraseSections;
