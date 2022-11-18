import React, { useState } from "react";
import API from "../utils/API";

interface Props {}

interface PostData {
	title: string;
	content: string;
	photos?: any[];
}

function CreatePost({}: Props) {
	const [formData, setFormData] = useState<PostData>({
		title: "",
		content: "",
		photos: new Array(),
	});

	// const [photos, setPhotos] = useState({})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const postObject = new FormData();

		for (const [key, value] of Object.entries(formData)) {
			if (Array.isArray(value)) {
				for (let i = 0; i < value.length; i++) {
					postObject.append("photos", value[i]);
				}
			} else {
				postObject.append(key, value);
			}
		}
		console.log(postObject);

		await API.fetchData("/posts", {
			method: "POST",
			body: postObject,
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData((prevVal) => ({
			...prevVal,
			[e.target.name]: e.target.value,
		}));
	};

	const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}

		const photos = Array.from(e.target.files);

		if (photos) {
			setFormData({ ...formData, photos });
		}
	};

	return (
		<div>
			<h2>Create Post</h2>
			<form onSubmit={handleSubmit} encType='multipart/form-data'>
				<div className=''>
					<label htmlFor=''>Title</label>
					<input type='text' name='title' onChange={handleChange} />
				</div>
				<div className=''>
					<label htmlFor=''>Content</label>
					<textarea name='content' onChange={handleChange}></textarea>
				</div>
				<div className=''>
					<label htmlFor=''>Photos</label>
					<input
						type='file'
						name='photos'
						onChange={handlePhotos}
						multiple
					></input>
				</div>

				<button type='submit'>Create</button>
			</form>
		</div>
	);
}

export default CreatePost;
