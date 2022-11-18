import React from "react";
import { Link } from "react-router-dom";

interface Props {
	profile: any;
}

function ProfileItem({ profile }: Props) {
	console.log(profile);

	return (
		<div>
			<Link to={`/profiles/${profile.id}`}>
				<h1>username: {profile.username}</h1>
				<p>email: {profile.email}</p>
			</Link>
		</div>
	);
}

export default ProfileItem;
