import React, { useEffect, useState } from "react";
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

	useEffect(() => {
		const fetchProfile = async () => {
			const data = await API.fetchData(`/users/${profile_id}`, {
				method: "GET",
			});
			console.log(data);

			setFormData((prevVal) => ({
				...prevVal,
				displayName: data.displayName,
				bio: data.bio,
			}));
		};

		fetchProfile();
	}, []);

	const { displayName, bio } = formData;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// create new form data for multipart
		const profileObject = new FormData();
		// update profile text fields
		for (const [key, value] of Object.entries(formData)) {
			if (value) {
				profileObject.append(key, value);
			}
		}

		await API.fetchData(`/users/${profile_id}`, {
			method: "PUT",
			body: profileObject,
		});
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
				{/* change name */}
				<div>
					<label>Name</label>
					<input
						type='text'
						name='displayName'
						value={displayName}
						onChange={handleChange}
					/>
				</div>
				{/* change bio */}
				<div>
					<label>Bio</label>
					<textarea
						name='bio'
						onChange={handleChange}
						value={bio}
					></textarea>
				</div>
				{/* change avatar */}
				<div>
					<input
						type='file'
						name='avatar'
						onChange={handleAvatarChange}
					/>
				</div>
				<button type='submit'>Save</button>
			</form>
		</div>
	);
}

export default EditProfile;
