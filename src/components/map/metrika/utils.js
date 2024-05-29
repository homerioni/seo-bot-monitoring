
export const getColorByAttendance = (region, regions) => {
	let curRegion = regions.filter(el => el.dimensions[0].name === region.mName);
	let color = "#ffffff"
	if (curRegion.length) {
		let pos = curRegion[0].metrics[0]
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
	}
	return color;
}

export const getPosByAttendance = (region, regions) => {
	let curRegion = regions.filter(el => el.dimensions[0].name === region.mName);
	if (curRegion.length) {
		return Math.round(curRegion[0].metrics[0])
	}
	return '';
}
