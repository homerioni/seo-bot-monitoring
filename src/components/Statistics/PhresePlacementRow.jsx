import React from 'react';
import {Tooltip} from "antd";

const PhrasePlacementRow = ({placement, selectedPhraseStats, showDomains, colorsArr, dt, selectedRegionIndex, defaultColor, colored, selectedProject, setSelectedProject }) => {
	return (
		<div className="phrase-placement__row">
			{placement.map(place =>
				<div className="phrase-placement__cell" key={place}>
					{showDomains ?
						<div className="project-domain holder" style={{ backgroundColor: '#EEEFF5' }}/>
					:
						<div className="project-dot holder" style={{ backgroundColor: '#EEEFF5' }}/>
					}
					{selectedPhraseStats.map((project, i) =>
						project.kwStat.positionsData && parseInt(project.kwStat.positionsData[dt + ':' + project.id + ':' + selectedRegionIndex]?.position) === place && (showDomains ?
							<div className="project-domain clickable" key={i}
								 style={{ backgroundColor: selectedProject > 0 ?
										 selectedProject === project.id ? colorsArr[i] : '#A1B1C5'
										 : colored ? colorsArr[i] : defaultColor }}
								 onClick={e => {
									 e.preventDefault()
									 e.stopPropagation()
									 setSelectedProject(project.id)
								 }}
							>{project.url}</div>
						:
						<Tooltip placement="bottom" title={project.name} key={i}>
							<div className="project-dot clickable"
								 style={{ backgroundColor: selectedProject > 0 ?
										 selectedProject === project.id ? colorsArr[i] : '#A1B1C5'
										 : colored ? colorsArr[i] : defaultColor }}
								 onClick={e => {
								 	 e.preventDefault()
									 e.stopPropagation()
									 setSelectedProject(project.id)
								 }}
							/>
						</Tooltip>)
					)}
				</div>
			)}
		</div>
	);
};

export default PhrasePlacementRow;
