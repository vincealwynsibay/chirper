import React, { useEffect } from "react";
import MainBar from "./components/layout/MainBar";
import Sidebar from "./components/layout/Sidebar";
import NavigationBar from "./components/layout/NavigationBar";
import { ThemeProvider } from "styled-components";
import useFetch from "./hooks/useFetch";
import { useAuthContext } from "./hooks/useAuthContext";
import { BrowserRouter } from "react-router-dom";

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
				<BrowserRouter>
					<ThemeProvider theme={theme}>
						<NavigationBar />
						<MainBar />
						<Sidebar />
					</ThemeProvider>
				</BrowserRouter>
			) : (
				<div>loading...</div>
			)}
		</React.Fragment>
	);
}

export default App;
