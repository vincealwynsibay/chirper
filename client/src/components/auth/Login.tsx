import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

interface Props {}

function Login({}: Props) {
	const [formData, setFormData] = useState<any>({ email: "", password: "" });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
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
