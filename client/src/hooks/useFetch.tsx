import React, { useEffect, useState } from "react";

function useFetch(url: string, options: any) {
	const [document, setDocument] = useState<any>([]);
	const [error, setError] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const abortController = new AbortController();
		const fetchData = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const res = await fetch(`http://localhost:5000${url}`, {
					method: options.method ? options.method : "GET",
					headers: {
						"Content-Type": "application/json",
					},
					body: options.body && JSON.stringify(options.body),
					signal: abortController.signal,
					mode: "cors",
					credentials: "omit",
				});
				const data = await res.json();
				setDocument(data);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();

		return () => abortController.abort();
	}, []);

	return { document, error, isLoading };
}

export default useFetch;
