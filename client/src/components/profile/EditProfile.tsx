import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API";

interface Props {}

interface ProfileData {
	displayName?: string;
	bio?: string;
	avatar: any;
}

function EditProfile({}: Props) {
	const [formData, setFormData] = useState<ProfileData>({
		displayName: "",
		bio: "",
		avatar: null,
	});

	const { profile_id } = useParams();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// create new form data for multipart
		const avatarObject = new FormData();
		// update profile text fields
		for (const [key, value] of Object.entries(formData)) {
			if (value) {
				console.log(key, value);

				avatarObject.append(key, value);
			}
		}

		await API.fetchData(`/users/${profile_id}`, {
			method: "PUT",
			body: avatarObject,
		});

		// // update profile image
		// await API.fetchData(`/users/${profile_id}/avatar`, {
		// 	method: "PUT",
		// 	body: avatarObject,
		// });
	};

	// change form state aside from input file
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData((prevVal: ProfileData) => ({
			...prevVal,
			[e.target.name]: e.target.value,
		}));
	};

	// change avatar state
	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const image = e.target.files ? e.target.files[0] : null;

		if (!image) {
			return null;
		}

		setFormData((prevVal: any) => ({ ...prevVal, avatar: image }));
	};

	return (
		<div>
			<h2>Edit Profile</h2>
			<form onSubmit={handleSubmit}>
				{/* change avatar */}
				<div>
					<input
						type='file'
						name='avatar'
						onChange={handleAvatarChange}
					/>
				</div>

				{/* change name */}
				<div>
					<label>Name</label>
					<input
						type='text'
						name='displayName'
						onChange={handleChange}
					/>
				</div>
				{/* change bio */}
				<div>
					<label>Bio</label>
					<textarea name='bio' onChange={handleChange}></textarea>
				</div>
				<button type='submit'>Save</button>
			</form>
		</div>
	);
}

export default EditProfile;
