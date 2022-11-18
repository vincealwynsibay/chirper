import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

interface Props {}

function NavigationBar({}: Props) {
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const logout = () => {
		localStorage.setItem("token", "");
		navigate("/");
	};

	return (
		<div>
			{user ? (
				<>
					<Link to='/'>Home</Link>
					<Link to='/me'>Profile</Link>
					<Link to='/profiles'>Profiles</Link>
					<Link to='/posts/create'>Create Post</Link>
					<a href='/' onClick={logout}>
						Logout
					</a>
				</>
			) : (
				<>
					<Link to='/login'>Login</Link>
					<Link to='/register'>Register</Link>
				</>
			)}
		</div>
	);
}

export default NavigationBar;
