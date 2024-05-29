
export const formatDate = (num, startDate) => {
	let dt
	if (startDate) {
		dt = new Date(new Date(startDate).getTime() - 1000*60*60*24*num);
	} else {
		dt = new Date(new Date().getTime() - 1000*60*60*24*num);
	}
	let req = dt.getFullYear() + '-' +
		(dt.getMonth() < 9 ? (dt.getMonth() + 1).toString().padStart(2, '0') : dt.getMonth() + 1) + '-' +
		(dt.getDate() < 10 ? dt.getDate().toString().padStart(2, '0') : dt.getDate())
	return req;
}

export const generateColor = () => {
	 return '#' + Math.random().toString(16).substr(-6);
};
