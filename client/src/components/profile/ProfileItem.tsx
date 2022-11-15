import React from "react";

interface Props {
	profile: any;
}

function ProfileItem({ profile }: Props) {
	console.log(profile);

	return (
		<div>
			<h1>username: {profile.username}</h1>
			<p>email: {profile.email}</p>
		</div>
	);
}

export default ProfileItem;
