import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProfileList from "../profile/ProfileList";
import ProfileView from "../profile/ProfileView";
interface Props {}

function Main({}: Props) {
	const { isAuthReady } = useAuthContext();
	return (
		<div>
			{isAuthReady ? (
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<div>Home...</div>} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/profiles' element={<ProfileList />} />
						<Route
							path='/profile/:profile_id'
							element={<ProfileView />}
						/>
					</Routes>
				</BrowserRouter>
			) : (
				<div>loading...</div>
			)}
		</div>
	);
}

export default Main;
