
export const getColor = (regionIndex, regionsSummaryFiltered, requestsPart, requestsPartTop) => {
	let color = "top0",
		region = regionsSummaryFiltered.filter(el => el.index === regionIndex)[0],
		dc = region?.dynamics?.all,
		tops;
	if (dc) {
		if (region) {
			tops = region.tops[1]
			if (requestsPartTop === 3) {
				if (dc*requestsPart/100 <= tops["1_3"]) {
					color = "top3";
				}
			}
			if (requestsPartTop === 10) {
				if (dc*requestsPart/100 <= tops["1_10"]) {
					color = "top10";
				}
			}
			if (requestsPartTop === 30) {
				if (dc*requestsPart/100 <= tops["1_10"] + tops["11_30"]) {
					color = "top30";
				}
			}
			if (requestsPartTop === 50) {
				if (dc*requestsPart/100 <= tops["1_10"] + tops["11_30"] + tops["31_50"]) {
					color = "top50";
				}
			}
		}
	}

	return color;
}

export const getColorByPos = (pos) => {
	let color = "#ffffff"
	if (pos) {
		if (pos < 4) {
			color = "#CEEDFF"
		} else {
			if (pos < 11) {
				color = "#DDF0CE"
			} else {
				if (pos < 31) {
					color = "#FFE2D2"
				} else {
					if (pos < 51) {
						color = "#FFE2D2"
					} else {
						color = "#ffc3c3"
					}
				}
			}
		}
	}
	return color;
}

export const getColorByTop = (regionIndex, regionsSummaryFiltered, mainTopFilter) => {
	let region = regionsSummaryFiltered.filter(el => el.index === regionIndex)[0],
		color = '#ffffff'
	if (region) {
		if (mainTopFilter === 3) {
			if (region.tops[1]['1_3'] > 0) {
				color = '#CEEDFF'
			}
		}
		if (mainTopFilter === 10) {
			if (region.tops[1]['1_10'] > 0) {
				color = '#DDF0CE'
			}
		}
		if (mainTopFilter === 30) {
			if (region.tops[1]['1_10'] + region.tops[1]['11_30'] > 0) {
				color = '#FFE2D2'
			}
		}
		if (mainTopFilter === 50) {
			if (region.tops[1]['1_10'] + region.tops[1]['11_30'] + region.tops[1]['31_50'] > 0) {
				color = '#FFE2D2'
			}
		}
	}
	return color;
}

export const getCountByTop = (regionIndex, regionsSummaryFiltered, mainTopFilter) => {
	let region = regionsSummaryFiltered.filter(el => el.index === regionIndex)[0],
		count = 0
	if (region) {
		if (mainTopFilter === 3) {
			if (region.tops[1]['1_3'] > 0) {
				count = region.tops[1]['1_3']
			}
		}
		if (mainTopFilter === 10) {
			if (region.tops[1]['1_10'] > 0) {
				count = region.tops[1]['1_10']
			}
		}
		if (mainTopFilter === 30) {
			if (region.tops[1]['1_10'] + region.tops[1]['11_30'] > 0) {
				count = region.tops[1]['1_10'] + region.tops[1]['11_30']
			}
		}
		if (mainTopFilter === 50) {
			if (region.tops[1]['1_10'] + region.tops[1]['11_30'] + region.tops[1]['31_50'] > 0) {
				count = region.tops[1]['1_10'] + region.tops[1]['11_30'] + region.tops[1]['31_50']
			}
		}
	}
	return count ? count : '';
}

export const renderRegionsByKeyword = (curKeyword, regionsSummaryFiltered, keywordsStat, projectId) => {
	if (curKeyword.positionsData) {
		let pos = curKeyword.positionsData;
		let resp = []
		regionsSummaryFiltered.forEach(region => {
			if (keywordsStat.existsDates.length > 0) {
				if (keywordsStat.existsDates.length === 1) {
					if (pos[keywordsStat.existsDates[0] + ':' + projectId + ':' + region.index]) {
						resp.push({ ...region, pos: pos[keywordsStat.existsDates[0] + ':' + projectId + ':' + region.index].position })
					}
				} else {
					if (pos[keywordsStat.existsDates[keywordsStat.existsDates.length - 1] + ':' + projectId + ':' + region.index]) {
						if (pos[keywordsStat.existsDates[keywordsStat.existsDates.length - 2] + ':' + projectId + ':' + region.index]) {
							resp.push({ ...region,
								pos: parseInt(pos[keywordsStat.existsDates[keywordsStat.existsDates.length - 1] + ':' + projectId + ':' + region.index].position),
								prePos: parseInt(pos[keywordsStat.existsDates[keywordsStat.existsDates.length - 2] + ':' + projectId + ':' + region.index].position)
							})
						} else {
							resp.push({ ...region, pos: pos[keywordsStat.existsDates[keywordsStat.existsDates.length - 1] + ':' + projectId + ':' + region.index].position })
						}
					}
				}
			}

		})
		return resp;
	}
}

export const renderRegionsByTop = (regionsSummaryFiltered, mainTopFilter) => {
	let arr = []
	regionsSummaryFiltered.forEach(el => {
		if (mainTopFilter === 3) {
			if (el.tops[1]['1_3'] > 0) {
				arr.push({...el, count: el.tops[1]['1_3'] })
			}
		}
		if (mainTopFilter === 10) {
			if (el.tops[1]['1_10'] > 0) {
				arr.push({...el, count: el.tops[1]['1_10'] })
			}
		}
		if (mainTopFilter === 30) {
			if (el.tops[1]['1_10'] + el.tops[1]['11_30'] > 0) {
				arr.push({...el, count: el.tops[1]['1_10'] + el.tops[1]['11_30'] })
			}
		}
		if (mainTopFilter === 50) {
			if (el.tops[1]['1_10'] + el.tops[1]['11_30'] + el.tops[1]['31_50'] > 0) {
				arr.push({...el, count: el.tops[1]['1_10'] + el.tops[1]['11_30'] + el.tops[1]['31_50'] })
			}
		}
	})
	return arr;
}

export const getColorByVisibility = (vis, groupIsLoading) => {
	if (groupIsLoading) {
		return '#FFFFFF'
	} else {
		if (vis >= 90) {
			return '#CEEDFF'
		} else if (vis >= 70) {
			return '#DDF0CE'
		} else if (vis >= 40) {
			return '#FAF1C2'
		} else if (vis === 0) {
			return '#FFFFFF'
		} else {
			return '#FFE2D2'
		}
	}
}
