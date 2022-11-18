import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Login from "../auth/Login";
import Register from "../auth/Register";
import EditProfile from "../profile/EditProfile";
import ProfileList from "../profile/ProfileList";
import ProfileView from "../profile/ProfileView";
interface Props {}

function Main({}: Props) {
	const { isAuthReady } = useAuthContext();
	return (
		<div>
			{isAuthReady ? (
				<Routes>
					<Route path='/' element={<div>Home...</div>} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/profiles' element={<ProfileList />} />
					<Route
						path='/me'
						element={<ProfileView isCurrentUser={true} />}
					/>
					<Route
						path='/profile/:profile_id'
						element={<ProfileView />}
					/>
					<Route
						path='/profile/:profile_id/edit'
						element={<EditProfile />}
					/>
				</Routes>
			) : (
				<div>loading...</div>
			)}
		</div>
	);
}

export default Main;
