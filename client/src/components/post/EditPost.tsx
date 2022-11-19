import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import API from "../utils/API";

interface Props {}

interface PostData {
	title: string;
	content: string;
}

function EditPost({}: Props) {
	const { post_id } = useParams();

	const [formData, setFormData] = useState<PostData>({
		title: "",
		content: "",
	});

	useEffect(() => {
		const fetchPost = async () => {
			const data = await API.fetchData(`/posts/${post_id}`, {
				method: "GET",
			});
			setFormData((prevVal) => ({
				...prevVal,
				title: data.title,
				content: data.content,
			}));
		};

		fetchPost();
	}, []);

	const { title, content } = formData;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// create new form data for multipart
		const postObject = new FormData();
		// update profile text fields
		for (const [key, value] of Object.entries(formData)) {
			if (value) {
				postObject.append(key, value);
			}
		}

		await API.fetchData(`/users/${post_id}`, {
			method: "PUT",
			body: postObject,
		});
	};

	// change form state aside from input file
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData((prevVal: PostData) => ({
			...prevVal,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div>
			<h2>Edit Post</h2>
			<form onSubmit={handleSubmit}>
				{/* change title */}
				<div>
					<label>Title</label>
					<input
						type='text'
						value={title}
						name='title'
						onChange={handleChange}
					/>
				</div>
				{/* change content */}
				<div>
					<label>Content</label>
					<textarea
						value={content}
						name='content'
						onChange={handleChange}
					></textarea>
				</div>
				<button type='submit'>Save</button>
			</form>
		</div>
	);
}

export default EditPost;
