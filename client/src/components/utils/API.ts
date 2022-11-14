const fetchData = async (path: string, options: any) => {
	const baseURL = `http://localhost:5000${path}`;

	const res = await fetch(baseURL, {
		method: options.method ? options.method : "GET",
		headers: new Headers({
			Authorization: options.token ? `Bearer ${options.token}` : "",
			"Content-Type": "application/json",
		}),
		body: options.body && JSON.stringify(options.body),
		mode: "cors",
		credentials: "omit",
	});

	const data = await res.json();
	return data;
};

const API = { fetchData };
export default API;
