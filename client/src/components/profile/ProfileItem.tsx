import React from "react";
import { Link } from "react-router-dom";

interface Props {
	profile: any;
}

function ProfileItem({ profile }: Props) {
	console.log(profile);

	return (
		<Link to={`/profiles/${profile.id}`}>
			<div>
				<h1>username: {profile.username}</h1>
				<p>email: {profile.email}</p>
			</div>
		</Link>
	);
}

export default ProfileItem;
