import React, { useState } from "react";
import API from "../utils/API";

interface Props {
	postId: string;
}

function CreateComment({ postId }: Props) {
	const [formData, setFormData] = useState<any>({
		content: "",
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await API.fetchData(`/posts/${postId}/comments`, {
			method: "POST",
			body: JSON.stringify(formData),
			contentType: "application/json",
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData((prevVal: any) => ({
			...prevVal,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div>
			<h2>Create Comment</h2>
			<form onSubmit={handleSubmit}>
				<div className=''>
					<label htmlFor=''>Content</label>
					<textarea name='content' onChange={handleChange}></textarea>
				</div>
				<button type='submit'>Create</button>
			</form>
		</div>
	);
}

export default CreateComment;
