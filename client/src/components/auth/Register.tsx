import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import API from "../utils/API";

interface Props {}

function Register({}: Props) {
	const [formData, setFormData] = useState<any>({ email: "", password: "" });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const data = await API.fetchData("/auth/register", {
			method: "POST",
			body: formData,
		});
		alert("Successfully logged in!");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor=''>Email</label>
					<input type='email' name='email' onChange={handleChange} />
				</div>
				<div>
					<label htmlFor=''>Username</label>
					<input
						type='text'
						name='username'
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor=''>Password</label>
					<input
						type='password'
						name='password'
						onChange={handleChange}
					/>
				</div>
				<button type='submit'>Register</button>
				<p>
					Already have an account?
					<Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	);
}

export default Register;
