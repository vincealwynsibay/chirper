import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
interface Props {}

function Main({}: Props) {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<div>Home...</div>} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default Main;
