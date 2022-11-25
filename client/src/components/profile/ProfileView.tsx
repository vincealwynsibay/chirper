import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";
import PostList from "../post/PostList";
import API from "../utils/API";

interface Props {
	isCurrentUser?: boolean;
}

function ProfileView({ isCurrentUser = false }: Props) {
	const { profile_id } = useParams();
	const { user } = useAuthContext();
	const navigate = useNavigate();

	let url;

	if (!profile_id && !user) {
		return <div>Profile is not available</div>;
	}

	if (isCurrentUser) {
		url = `/users/${user.id}`;
	} else {
		url = `/users/${profile_id}`;
	}

	const { document: profile, isLoading } = useFetch(url, {
		method: "GET",
	});

	const deleteProfile = async () => {
		await API.fetchData(`/users/${profile.id}`, {
			method: "DELETE",
		});
		localStorage.setItem("token", "");
		navigate("/");
	};

	if (isLoading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			{profile && (
				<>
					<p>username: {profile.username}</p>
					<img src={profile.avatar} />
					<p>email: {profile.email}</p>
					<p>display name: {profile.displayName}</p>
					<p>bio: {profile.bio ? profile.bio : "no bio"}</p>
					{profile.followers && (
						<p>followers: {profile.followers.length}</p>
					)}
					{profile.following && (
						<p>following: {profile.following.length}</p>
					)}
					<Link to={`/profile/${profile.id}/edit`}>Edit Profile</Link>
					<button onClick={deleteProfile}>Delete Profile</button>
					<div>
						<h1>Posts</h1>
						<PostList isProfile={true} />
					</div>
				</>
			)}
		</div>
	);
}

export default ProfileView;
