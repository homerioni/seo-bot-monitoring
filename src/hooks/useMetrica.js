import {useState} from 'react';

export const useMetrica = (settings) => {
	const [isLoading, setIsLoading] = useState(false);
	const hostName = settings.getPhrases ?
		"https://api-metrika.yandex.net/stat/v1/data?lang=ru&dimensions=ym:s:SearchPhrase&id=56989741&metrics=ym:s:users&sort=-ym:s:users&filters=ym:s:isRobot=='No'&limit=1000" + (settings.metricaPeriod.init ? '&date1=' + settings.metricaPeriod.dates[0] + '&date2=' + settings.metricaPeriod.dates[1] : '')
		: settings.map > 0 ?
			"https://api-metrika.yandex.net/stat/v1/data?lang=ru&id=56989741&metrics=ym:s:users&sort=ym:s:users&dimensions=ym:s:regionCity&filters=ym:s:SearchPhrase=='" + settings.phrase + "' AND ym:s:isRobot=='No' AND ym:s:regionCountryName=='Россия' AND ym:s:regionAreaName=='Москва и Московская область'" + (settings.metricaPeriod.init ? '&date1=' + settings.metricaPeriod.dates[0] + '&date2=' + settings.metricaPeriod.dates[1] : '')
			:
		"https://api-metrika.yandex.net/stat/v1/data?lang=ru&id=56989741&metrics=ym:s:users&sort=ym:s:users&dimensions=ym:s:regionArea,ym:s:regionCountryName&filters=ym:s:SearchPhrase=='" + settings.phrase + "' AND ym:s:isRobot=='No' AND ym:s:regionCountryName=='Россия'" + (settings.metricaPeriod.init ? '&date1=' + settings.metricaPeriod.dates[0] + '&date2=' + settings.metricaPeriod.dates[1] : '');
	//"https://api-metrika.yandex.net/stat/v1/data?lang=ru&id=56989741&metrics=ym:s:users&sort=ym:s:users&dimensions=ym:s:regionCityName&filters=ym:s:SearchPhrase=='" + settings.phrase + "' AND ym:s:isRobot=='No' AND ym:s:regionCountryName=='Россия'";
	//const hostName = 'https://api-metrika.yandex.net/stat/v1/data?dimensions=ym:s:regionAreaName&metrics=ym:s:visits&id=56989741';
	//"https://api-metrika.yandex.net/stat/v1/data?lang=ru&preset=sources_search_phrases&id=56989741&date1=today&date2=today"
	//&dimensions=ym:s:regionArea

	const fetching = async (dt, url) => {
		let resp = '';
		let headers = {
			"Authorization": "OAuth y0_AgAEA7qhgTB8AAraAgAAAADyixMEq6_wb2ERSRKgZ5xrfKHuAv7y_ZM"
		}
		if (url) settings.url = url;
		if (!isLoading) setIsLoading(true);
		if (dt) {
			Object.assign(settings.data, dt)
		}
		try {
			const response = await fetch(hostName + settings.url, {
				crossDomain: true,
				method: settings.method || 'GET',
				body: settings.data && JSON.stringify(settings.data),
				headers: settings.headers ? Object.assign(headers, settings.headers) : headers
			});
			resp = await response.json();
			if (!response.ok) {
				setIsLoading(false);
				if (resp.error.description) {
					throw new Error(resp.error.description);
				} else {
					throw new Error(resp.error.message);
				}
			}
		} catch (e) {
			setIsLoading(false);
			if (e.message === 'Failed to fetch') {
				throw new Error('Нет соединения с сервером')
			} else {
				throw new Error(e.message)
			}
		}
		setIsLoading(false);
		return resp;
	}

	return [fetching, isLoading];
}
