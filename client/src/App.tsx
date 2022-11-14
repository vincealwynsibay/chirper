import React, { useEffect } from "react";
import Main from "./components/layout/Main";
import Sidebar from "./components/layout/Sidebar";
import NavigationBar from "./components/layout/NavigationBar";
import { ThemeProvider } from "styled-components";
import useFetch from "./hooks/useFetch";
import { useAuthContext } from "./hooks/useAuthContext";

interface Props {}

function App() {
	// const { document, isLoading } = useFetch("http://localhost:5000/ping", {});
	const { isAuthReady } = useAuthContext();
	const theme = {
		primaryColor: "",
		secondaryColor: "",
		accentColor: "",
		black: "",
		white: "",
		gray: "",
	};

	return (
		<React.Fragment>
			{isAuthReady ? (
				<ThemeProvider theme={theme}>
					<NavigationBar />
					<Main />
					<Sidebar />
				</ThemeProvider>
			) : (
				<div>loading...</div>
			)}
		</React.Fragment>
	);
}

export default App;
