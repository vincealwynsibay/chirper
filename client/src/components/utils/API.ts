const fetchData = async (path: string, options: any) => {
	const baseURL = `http://localhost:5000${path}`;

	const headers = new Headers({
		Authorization: options.token ? `Bearer ${options.token}` : "",
	});

	if (options.contentType) {
		headers.set("Content-Type", options.contentType);
	}

	const res = await fetch(baseURL, {
		method: options.method ? options.method : "GET",
		headers: headers,
		body: options.body,
		mode: "cors",
		credentials: "omit",
	});

	const data = await res.json();
	return data;
};

const API = { fetchData };
export default API;
