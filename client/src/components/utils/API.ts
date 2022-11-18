const fetchData = async (path: string, options: any) => {
	const baseURL = `http://localhost:5000${path}`;

	const token = localStorage.getItem("token");
	console.log(`Bearer ${token}`);

	const headers = new Headers({
		Authorization: token ? `Bearer ${token}` : "",
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
