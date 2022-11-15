import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/API";
import { useAuthContext } from "../../hooks/useAuthContext";

interface Props {}

function Login({}: Props) {
	const [formData, setFormData] = useState<any>({ email: "", password: "" });
	const { dispatch } = useAuthContext();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const data = await API.fetchData("/auth/login", {
			method: "POST",
			body: formData,
		});
		localStorage.setItem("token", data.token);
		dispatch({ type: "LOGIN", payload: data.user });
		navigate("/");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor=''>Email</label>
					<input type='email' name='email' onChange={handleChange} />
				</div>
				<div>
					<label htmlFor=''>Password</label>
					<input
						type='password'
						name='password'
						onChange={handleChange}
					/>
				</div>
				<button type='submit'>Login</button>
				<p>
					Don't have an account yet?{" "}
					<Link to='/register'>Register</Link>
				</p>
			</form>
		</div>
	);
}

export default Login;
