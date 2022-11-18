import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";

interface Props {
	isCurrentUser?: boolean;
}

function ProfileView({ isCurrentUser = false }: Props) {
	const { profile_id } = useParams();
	const { user } = useAuthContext();

	let url;

	if (isCurrentUser) {
		url = `http://localhost:5000/users/${user.id}`;
	} else {
		url = `http://localhost:5000/users/${profile_id}`;
	}

	const { document: profile, isLoading } = useFetch(url, {
		mode: "GET",
	});

	if (isLoading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<p>username: {profile.username}</p>
			<img src={profile.avatar} />
			<p>email: {profile.email}</p>
			<p>display name: {profile.displayName}</p>
			<p>bio: {profile.bio ? profile.bio : "no bio"}</p>
			{profile.followers && <p>followers: {profile.followers.length}</p>}
			{profile.following && <p>following: {profile.following.length}</p>}
			<Link to={`/profile/${profile.id}/edit`}>Edit Profile</Link>
		</div>
	);
}

export default ProfileView;
