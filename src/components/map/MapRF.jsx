import React from 'react';
import {getColorByAttendance, getPosByAttendance} from "./metrika/utils";
import {getColor, getColorByPos, getColorByTop, getColorByVisibility, getCountByTop} from "./colors";

const MapRf = ({regions, filter}) => {
	return (
		<svg width="1685" height="844" viewBox="0 0 1685 844" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_3562_82971)">
				{regions.map((region, index) =>
					<path data={region.key} className='add' d={region.coords}
						  onMouseMove={(e) => {
							  e.preventDefault()
							  e.stopPropagation()
							  if (region.isSelected) {
								  setMarkCoords({ x: e.pageX - 30, y: e.pageY + 20, name: region.name, visibility: true, areaName: region.areaName })
							  } else {
								  setMarkCoords({...markCoords, visibility: false })
							  }
						  }}
						  onClick={() => {
							  if (region.isSelected) {
								  setSelectedRegion({ key: region.key, index: region.index })
							  }
						  }}
						  fill={region.isActive || region.key === selectedRegion.key ? "#5BC2FF" : selectedFilter === 4 ? getColorByAttendance(region, metricaPhrase) : region.isSelected ? (
							  selectedFilter === 2 ?  (
								  {
									  top0: "#ffffff",
									  top3: "#CEEDFF",
									  top10: "#DDF0CE",
									  top30: "#FFE2D2",
									  top50: "#FFE2D2",
								  }[getColor(region.index, regionsSummaryFiltered, requestsPart, requestsPartTop)]
							  ) : selectedFilter === 0 ? (
								  keywordFilter && curKeyword &&
								  getColorByPos(curKeyword.positionsData[lastUpdate + ":" + projectId + ":" + region.index]?.position)
							  ) : selectedFilter === 1 ? (
								  getColorByTop(region.index, regionsSummaryFiltered, mainTopFilter)
							  ) : selectedFilter === 3 ? (
								  getColorByVisibility(groupsFilter < 0 ? Math.round(regionsSummaryFiltered.filter(r => r.index === region.index)[0]?.visibilities[1]) || 0 :
									  !groupsForDl['g' + groupsFilter + searchSystem] ?
										  groupsForDl['g' + groupsFilter + searchSystem + 'data']['r' + region.index] >= 0 ?
											  Math.round(groupsForDl['g' + groupsFilter + searchSystem + 'data']['r' + region.index]) : ''
										  : '', groupIsLoading)
							  ) : "#EEEFF5"
						  ) : "#EEEFF5" }
						  fillOpacity="1"
						  stroke="#8B98EE"
						  strokeWidth="0.324109"
						  key={index}
					/>
				)}
			</g>
			{selectedFilter === 2 && <>
				<circle cx="567.5" cy="225.5" r="3.5" fill="#8B98EE"/>
				{regions.map((region, index) => region.x && (region.isSelected ?
						{
							top0: <circle className="add" cx={region.x} cy={region.y} r="3.5" fill="#8B98EE" key={index}
										  onMouseMove={(e) => {
											  e.preventDefault()
											  e.stopPropagation()
											  if (region.isSelected) {
												  setMarkCoords({ x: e.pageX - 30, y: e.pageY + 20, name: region.name, visibility: true, areaName: region.areaName })
											  } else {
												  setMarkCoords({...markCoords, visibility: false })
											  }
										  }}
										  onClick={() => {
											  if (region.isSelected) {
												  setSelectedRegion({ key: region.key, index: region.index })
											  }
										  }}
							/>,
							top3: <g key={index}
									 onMouseMove={(e) => {
										 e.preventDefault()
										 e.stopPropagation()
										 if (region.isSelected) {
											 setMarkCoords({ x: e.pageX - 30, y: e.pageY + 20, name: region.name, visibility: true, areaName: region.areaName })
										 } else {
											 setMarkCoords({...markCoords, visibility: false })
										 }
									 }}
									 onClick={() => {
										 if (region.isSelected) {
											 setSelectedRegion({ key: region.key, index: region.index })
										 }
									 }}
							>
								<circle cx={region.x} cy={region.y} r="7.5" fill={region.isActive || region.key === selectedRegion.key ? "white" : "#5BC2FF"}/>
								<circle cx={region.x} cy={region.y} r="3.5" fill={region.isActive || region.key === selectedRegion.key ? "white" : "#5BC2FF"} stroke={region.isActive || region.key === selectedRegion.key ? "#5BC2FF" : "white"} strokeWidth="1.4"/>
							</g>,
							top10: <g key={index}
									  onMouseMove={(e) => {
										  e.preventDefault()
										  e.stopPropagation()
										  if (region.isSelected) {
											  setMarkCoords({ x: e.pageX - 30, y: e.pageY + 20, name: region.name, visibility: true, areaName: region.areaName })
										  } else {
											  setMarkCoords({...markCoords, visibility: false })
										  }
									  }}
									  onClick={() => {
										  if (region.isSelected) {
											  setSelectedRegion({ key: region.key, index: region.index })
										  }
									  }}
							>
								<circle cx={region.x} cy={region.y} r="7.5" fill={region.isActive || region.key === selectedRegion.key ? "white" : "#5BC2FF"}/>
								<circle cx={region.x} cy={region.y} r="3.5" fill={region.isActive || region.key === selectedRegion.key ? "white" : "#5BC2FF"} stroke={region.isActive || region.key === selectedRegion.key ? "#5BC2FF" : "white"} strokeWidth="1.4"/>
							</g>,
							top30: <g key={index}
									  onMouseMove={(e) => {
										  e.preventDefault()
										  e.stopPropagation()
										  if (region.isSelected) {
											  setMarkCoords({ x: e.pageX - 30, y: e.pageY + 20, name: region.name, visibility: true, areaName: region.areaName })
										  } else {
											  setMarkCoords({...markCoords, visibility: false })
										  }
									  }}
									  onClick={() => {
										  if (region.isSelected) {
											  setSelectedRegion({ key: region.key, index: region.index })
										  }
									  }}
							>
								<circle cx={region.x} cy={region.y} r="7.5" fill={region.isActive || region.key === selectedRegion.key ? "white" : "#5BC2FF"}/>
								<circle cx={region.x} cy={region.y} r="3.5" fill={region.isActive || region.key === selectedRegion.key ? "white" : "#5BC2FF"} stroke={region.isActive || region.key === selectedRegion.key ? "#5BC2FF" : "white"} strokeWidth="1.4"/>
							</g>,
							top50: <g key={index}
									  onMouseMove={(e) => {
										  e.preventDefault()
										  e.stopPropagation()
										  if (region.isSelected) {
											  setMarkCoords({ x: e.pageX - 30, y: e.pageY + 20, name: region.name, visibility: true, areaName: region.areaName })
										  } else {
											  setMarkCoords({...markCoords, visibility: false })
										  }
									  }}
									  onClick={() => {
										  if (region.isSelected) {
											  setSelectedRegion({ key: region.key, index: region.index })
										  }
									  }}
							>
								<circle cx={region.x} cy={region.y} r="7.5" fill={region.isActive || region.key === selectedRegion.key ? "white" : "#5BC2FF"}/>
								<circle cx={region.x} cy={region.y} r="3.5" fill={region.isActive || region.key === selectedRegion.key ? "white" : "#5BC2FF"} stroke={region.isActive || region.key === selectedRegion.key ? "#5BC2FF" : "white"} strokeWidth="1.4"/>
							</g>,
						}[getColor(region.index, regionsSummaryFiltered, requestsPart, requestsPartTop)]
						:
						<circle className="add" cx={region.x} cy={region.y} r="3.5" fill="#8B98EE" key={index}/>

				))}
			</>}
			{selectedFilter === 0 && keywordFilter && curKeyword && regions.map((el, index) =>
				<text className="region-text" x={el.x ? el.x - 3 : 0 } y={el.y ? el.y + 15 : 0} key={index}
					  onMouseMove={(e) => {
						  e.preventDefault()
						  e.stopPropagation()
						  if (el.isSelected) {
							  setMarkCoords({ x: e.pageX - 30, y: e.pageY + 20, name: el.name, visibility: true, areaName: el.areaName })
						  } else {
							  setMarkCoords({...markCoords, visibility: false })
						  }
					  }}
					  onClick={() => {
						  if (el.isSelected) {
							  setSelectedRegion({ key: el.key, index: el.index })
						  }
					  }}>
					{curKeyword.positionsData[lastUpdate + ":" + projectId + ":" + el.index]?.position}
				</text>
			)}
			{selectedFilter === 3 && regions.map((el, index) => el.isSelected &&
				<text className="region-text" x={el.x ? el.x - 8 : 0 } y={el.y ? el.y + 15 : 0} key={index}
					  onMouseMove={(e) => {
						  e.preventDefault()
						  e.stopPropagation()
						  if (el.isSelected) {
							  setMarkCoords({ x: e.pageX - 30, y: e.pageY + 20, name: el.name, visibility: true, areaName: el.areaName })
						  } else {
							  setMarkCoords({...markCoords, visibility: false })
						  }
					  }}
					  onClick={() => {
						  if (el.isSelected) {
							  setSelectedRegion({ key: el.key, index: el.index })
						  }
					  }}>
					{groupsFilter < 0 ? Math.round(regionsSummaryFiltered.filter(r => r.index === el.index)[0]?.visibilities[1]) || '' :
						!groupsForDl['g' + groupsFilter + searchSystem] ?
							Math.round(groupsForDl['g' + groupsFilter + searchSystem + 'data']['r' + el.index]) > 0 ?
								Math.round(groupsForDl['g' + groupsFilter + searchSystem + 'data']['r' + el.index]) : ''
							: ''
					}
				</text>
			)}
			{selectedFilter === 4 && regions.map((el, index) =>
				<text className="region-text" x={el.x ? el.x - 8 : 0 } y={el.y ? el.y + 15 : 0} key={index}
					  onMouseMove={(e) => {
						  e.preventDefault()
						  e.stopPropagation()
						  if (el.isSelected) {
							  setMarkCoords({ x: e.pageX - 30, y: e.pageY + 20, name: el.name, visibility: true, areaName: el.areaName })
						  } else {
							  setMarkCoords({...markCoords, visibility: false })
						  }
					  }}
					  onClick={() => {
						  if (el.isSelected) {
							  setSelectedRegion({ key: el.key, index: el.index })
						  }
					  }}>
					{getPosByAttendance(el, metricaPhrase)}
				</text>
			)}
			{selectedFilter === 1 && regions.map((el, index) =>
				<text className="region-text" x={el.x ? el.x - 3 : 0 } y={el.y ? el.y + 15 : 0} key={index}
					  onMouseMove={(e) => {
						  e.preventDefault()
						  e.stopPropagation()
						  if (el.isSelected) {
							  setMarkCoords({ x: e.pageX - 30, y: e.pageY + 20, name: el.name, visibility: true, areaName: el.areaName })
						  } else {
							  setMarkCoords({...markCoords, visibility: false })
						  }
					  }}
					  onClick={() => {
						  if (el.isSelected) {
							  setSelectedRegion({ key: el.key, index: el.index })
						  }
					  }}>
					{getCountByTop(el.index, regionsSummaryFiltered, mainTopFilter)}
				</text>
			)}
			<defs>
				<clipPath id="clip0_3562_82971">
					<rect width="1684.89" height="843.242" fill="white" transform="translate(0.112305)"/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default MapRf;
