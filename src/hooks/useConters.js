import {useState} from 'react';

export const useCounters = (settings) => {
	const [isLoading, setIsLoading] = useState(false);
	const hostName = 'https://api-metrika.yandex.net/management/v1/counters';

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
