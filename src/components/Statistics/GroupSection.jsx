import React, {useEffect, useState} from 'react';
import {formatDate} from "./utils";
import locale from "antd/es/date-picker/locale/ru_RU";
import {DatePicker, Select} from "antd";
import SwitchUI from "../map/UI/SwitchUI";
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import dayjs from "dayjs";
import {Scrollbars} from "react-custom-scrollbars";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";
import GraphLabel from "./GraphLabel";
import ProjectStatsTabs from "./ProjectStatsTabs";

const GroupSection = ({regionList, selectedGroupStats, keywords, selectedRegionIndex, setSelectedRegionIndex, selectedGroup, setSelectedGroup, groups, back, dates, setDates, selectedDevice, setSelectedDevice }) => {
	const { RangePicker } = DatePicker;

	const [showDatePicker, setShowDatePicker] = useState(false)
	const [datePickerValue, setDatePickerValue] = useState([dayjs(dates[0]), dayjs(dates[dates.length - 1])])
	const [regionsForSelect, setRegionsForSelect] = useState(regionList.filter(el => el.device === selectedDevice).map(el => { return { value: el.index, label: el.areaName } }))
	const [groupList, setGroupList] = useState(groups.map(el => {return { value: el.id, label: el.name }}))
	const groupKeywords = keywords.filter(el => el.group_id === selectedGroup)
	const [kwSummary, setKwSummary] = useState([])
	const [kwAverage, setKwAverage] = useState([])
	const [integralDiagram, setIntegralDiagram] = useState([])
	const [integralMax, setIntegralMax] = useState([0, 0, 0])
	const [selectedGroupStatsByProject, setSelectedGroupStatsByProject] = useState([])
	const [kwSummaryValues, setKwSummaryValues] = useState([])

	useEffect(() => {
		console.log('selectedGroupStats')
		console.log(selectedGroupStats)
		if (selectedGroupStats.length) {
			let groupSummary = [],
				projectsStats = []
			selectedGroupStats[0].stats.forEach(el => projectsStats.push({ name: el.name, id: parseInt(el.id), stats: [] }))
			projectsStats = projectsStats.map((pr, prInd) => {
				let stats = []
				dates.forEach(dt => {
					let val = [0, 0, 0]
					selectedGroupStats.forEach(kw => {
						let pos = parseInt(kw.stats[prInd].kwStat[dt + ':' + pr.id + ':' + selectedRegionIndex]?.position)
						if (pos > 0) {
							if (pos < 4) {
								val[0]++
							} else {
								if (pos < 7) {
									val[1]++
								} else {
									if (pos < 11) {
										val[2]++
									}
								}
							}
						}
					})
					stats.push({ date: dt, val: val })
				})
				return {...pr, stats: stats}
			})
			console.log('projectsStats')
			console.log(projectsStats)
			setSelectedGroupStatsByProject(projectsStats)
			selectedGroupStats.forEach(selectedPhraseStats => {
				let summary = [],
					graph = [],
					graphCount = []
				dates.forEach((date, index) => {
					graph.push({ name: ('' + date).slice(8, 10) + '-' + ('' + date).slice(5, 7) })
					graphCount.push({ name: ('' + date).slice(8, 10) + '-' + ('' + date).slice(5, 7) })
					summary.push([0, 0, 0])
					selectedPhraseStats.stats.forEach((project, i) => {
						if (project.kwStat) {
							let pos = parseInt(project.kwStat[date + ':' + project.id + ':' + selectedRegionIndex]?.position)
							if (pos === 1 || pos === 2 || pos === 3) {
								summary[index][0] = summary[index][0] + 1
							} else if (pos === 4 || pos === 5 || pos === 6) {
								summary[index][1] = summary[index][1] + 1
							} else if (pos === 7 || pos === 8 || pos === 9 || pos === 10) {
								summary[index][2] = summary[index][2] + 1
							}
						}
					})
					graph[index].sum = summary[index][0]*100 + summary[index][1]*10 + summary[index][2]
					graphCount[index].count = summary[index][0] + summary[index][1] + summary[index][2]
				})
				groupSummary.push({ summary: summary, name: selectedPhraseStats.name, id: selectedPhraseStats.id })
			})
			console.log('kwSummary')
			console.log(groupSummary)
			let kwSumVal = []
			let averageSummary = []
			dates.forEach((dt, ind) => {
				let av = 0;
				groupSummary.forEach(kw => {
					av += kw.summary[ind][0]*100 + kw.summary[ind][1]*10 + kw.summary[ind][2]
				})
				averageSummary.push({ name: ('' + dt).slice(8, 10) + '-' + ('' + dt).slice(5, 7), value: (parseInt(av/groupSummary.length*10))/ 10 })
				kwSumVal.push(av)
			})
			setKwSummaryValues(kwSumVal)
			setKwSummary(groupSummary)
			let integral = [],
				maxVal = [0, 0, 0]
			dates.forEach((dt, ind) => {
				let tops = [0,0,0],
					topsArr = []
				groupSummary.forEach(kw => {
					tops[0] = tops[0] + parseInt(kw.summary[ind][0])
					tops[1] = tops[1] + parseInt(kw.summary[ind][1])
					tops[2] = tops[2] + parseInt(kw.summary[ind][2])
				})
				topsArr = tops.map(el => {
					let arr = []
					if (el > 0) {
						for (let i = 0; i < el; i++) {
							arr.push(1)
						}
					}
					return arr
				})
				if (topsArr[0].length >= maxVal[0]) {
					maxVal[0] = topsArr[0].length
					if (topsArr[1].length >= maxVal[1]) {
						maxVal[1] = topsArr[1].length
					}
					if (topsArr[2].length > maxVal[2]) {
						maxVal[2] = topsArr[2].length
					}
				}
				integral.push({ date: ('' + dt).slice(8, 10) + '-' + ('' + dt).slice(5, 7), value: topsArr})
			})
			setIntegralDiagram(integral)
			setIntegralMax(maxVal)
			setKwAverage(averageSummary)
		}
	},[selectedGroupStats])

	const renderPie = (val) => {
		let html = [[],[],[]],
			top3val = 0,
			top6val = 0,
			top10val = 0
		if (val > 99) {
			top3val = (val - val%100)/100
		}
		if (val > 9) {
			top6val = ((val - top3val*100) - val%10)/10
		}
		if (val > 0) {
			top10val = val - top3val*100 - top6val*10
		}
		if (top3val > 0) {
			for (let i = 0; i < top3val; i++) {
				html[2].push(i)
			}
		}
		if (top6val > 0) {
			for (let i = 0; i < top6val; i++) {
				html[1].push(i)
			}
		}
		if (top10val > 0) {
			for (let i = 0; i < top10val; i++) {
				html[0].push(i)
			}
		}
		return html;
	}

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
				<div className="statistics-projects__header-text static">Анализ по группе</div>
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
			</div>
			<div className="statistics-projects__content">
				<div className="statistics-projects__title">Все фразы из группы</div>
				{kwSummary.length > 0 &&
				<div className="group-phrases">
					<div className="group-phrases__list-kw">
						<div className="group-phrases__header first">
							<div className="group-phrases__cell">ФРАЗЫ</div>
						</div>
						<div className="group-phrases__list first">
							{groupKeywords.map(kw =>
								<div className="group-phrases__item" key={kw.id}>
									<div className="group-phrases__cell">{kw.name}</div>
								</div>
							)}
							<div className="group-phrases__item">
								<div className="group-phrases__cell">среднее</div>
							</div>
						</div>
					</div>
					<div className="group-phrases__list-data">
						<Scrollbars >
							<div className="group-phrases__list-data-wp">
								{dates.map((dt, ind) =>
									<div className="group-phrases__list-data-item" key={ind}>
										<div className="group-phrases__header">
											<div className="group-phrases__cell">{('' + dt).slice(8, 10) + '-' + ('' + dt).slice(5, 7)}</div>
										</div>
										<div className="group-phrases__list">
											{kwSummary.map(kw =>
												<div className="group-phrases__item" key={kw.id}>
													<div className="group-phrases__cell">{'' + kw.summary[ind][0] + kw.summary[ind][1] + kw.summary[ind][2]}</div>
												</div>
											)}
											<div className="group-phrases__item last">
												<div className="group-phrases__cell">{kwAverage[ind]?.value}</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</Scrollbars>
					</div>
				</div>
				}

				{kwAverage.length > 0 && <>
				<div className="statistics-projects__title bold">Среднее значение: график</div>
				<div className="phrase-placement__wrapper graph">
					<Scrollbars>
						<div className="projects-graphs">

							<LineChart width={35*dates.length + 100} height={200} data={kwAverage}
									   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis domain={[0, 400]} allowDataOverflow={true} padding={{ bottom: 10 }}/>
								<Line label={<GraphLabel />} type="monotone" dataKey='value' stroke="#8B98EE"/>
							</LineChart>
						</div>
					</Scrollbars>
				</div></>
				}
				{kwAverage.length > 0 && <>
					<div className="statistics-projects__title bold">Среднее значение: слоёные пироги</div>
					<div className="phrase-placement__wrapper graph2">
						<Scrollbars>
							<div className="pie-graph">
								{kwAverage.map((kw, ind) =>
									<div className="pie-graph__col" key={ind}>
										<div className="pie-graph__pie">
										{renderPie(Math.round(kw.value)).map((el, i) =>
											<div key={i}>
												{i === 0 ? el.map(el => <div className="pie-graph__top10" key={el}/>) :
													i === 1 ? el.map(el => <div className="pie-graph__top6" key={el}/>) :
														el.map(el => <div className="pie-graph__top3" key={el}/>)
												}
											</div>
										)}
										</div>
										<div className="pie-graph__val">{Math.round(kw.value)}</div>
										<div className="pie-graph__line"/>
										<div className="pie-graph__date">{kw.name}</div>
									</div>
								)}
							</div>
						</Scrollbars>
					</div></>
				}
				{integralDiagram.length > 0 && <>
					<div className="statistics-projects__title bold">Интегральная диаграмма</div>
					<div className="integral-graph-wrapper">
					<div className={kwSummary.length > 99 ? "integral-graph less2" : "integral-graph"}>
						<div className="pie-graph">
							{integralDiagram.map((item, ind) =>
								<div className="pie-graph__col" key={ind}>
									<div className="pie-graph__pie">
										{item.value[2].length > 0 && item.value[2].map((el, i) => <div className="pie-graph__top10" key={i}/>)}
										{item.value[1].length > 0 && item.value[1].map((el, i) => <div className="pie-graph__top6" key={i}/>)}
										{item.value[0].length > 0 && item.value[0].map((el, i) => <div className="pie-graph__top3" key={i}/>)}
									</div>
									<div className="pie-graph__val">{item.value[0].length + ' ' + item.value[1].length + ' ' +  item.value[2].length}</div>
									<div className="pie-graph__line"/>
									<div className="pie-graph__date">{item.date}</div>
								</div>
							)}
						</div>
					</div>
				</div></>}
				{selectedGroupStatsByProject.length > 0 && <>
					<div className="statistics-projects__title bold">Веса сайтов</div>
					{selectedGroupStatsByProject.map(pr =>
						<div className="groupStat-project" key={pr.id}>
							<div className="groupStat-project__title">{pr.name}</div>
							<ProjectStatsTabs project={pr} kwLength={selectedGroupStats.length} kwSummary={kwSummaryValues} key={pr.id}/>
						</div>
					)}
				</>}
				{kwSummaryValues.length > 0 && selectedGroupStats.length > 0 && <>
					<div className="statistics-projects__title bold">Общий вес сайтов</div>
					<div className="weight-graph__wrapper">
						<div className="weight-graph__title">Суммарный вес сайтов</div>
						<div className="weight-graph">
							<div className="weight-graph__values">
								<div className="weight-graph__values-max">{selectedGroupStats.length*334}</div>
								<div className="weight-graph__values-min">0</div>
							</div>
							<div className="phrase-placement__wrapper graph2">
								<Scrollbars>
									<div className="weight-graph__graph">
										{dates.map((dt, ind) =>
											<div className="weight-graph__col" key={ind}>
												<div className="weight-graph__cw">
													<div className="weight-graph__val">{kwSummaryValues[ind] }</div>
													<div className="weight-graph__cw-t"/>
													<div className="weight-graph__cw-v" style={{ height: kwSummaryValues[ind]/(selectedGroupStats.length*334)*6 + 'rem' }}/>
													<div className="weight-graph__cw-b"/>
												</div>
												<div className="weight-graph__date">{('' + dt).slice(8, 10) + '-' + ('' + dt).slice(5, 7)}</div>
											</div>
										)}
									</div>
								</Scrollbars>
							</div>
						</div>
					</div>
					<div className="weight-graph__wrapper">
						<div className="weight-graph__title">Относительный вес сайтов</div>
						<div className="weight-graph">
							<div className="weight-graph__values">
								<div className="weight-graph__values-max">100%</div>
								<div className="weight-graph__values-min">0</div>
							</div>
							<div className="phrase-placement__wrapper graph2">
								<Scrollbars>
									<div className="weight-graph__graph">
										{dates.map((dt, ind) =>
											<div className="weight-graph__col" key={ind}>
												<div className="weight-graph__cw">
													<div className="weight-graph__val">{ Math.trunc(kwSummaryValues[ind]/(selectedGroupStats.length*334)*100) }</div>
													<div className="weight-graph__cw-t pink"/>
													<div className="weight-graph__cw-v pink" style={{ height: kwSummaryValues[ind]/(selectedGroupStats.length*334)*6 + 'rem' }}/>
													<div className="weight-graph__cw-b pink"/>
												</div>
												<div className="weight-graph__date">{('' + dt).slice(8, 10) + '-' + ('' + dt).slice(5, 7)}</div>
											</div>
										)}
									</div>
								</Scrollbars>
							</div>
						</div>
					</div>
				</>}
			</div>
		</div>
	);
};

export default GroupSection;
