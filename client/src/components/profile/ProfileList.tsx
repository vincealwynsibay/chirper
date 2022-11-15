import React from "react";
import useFetch from "../../hooks/useFetch";
import ProfileItem from "./ProfileItem";

interface Props {}

function ProfileList({}: Props) {
	const { document: profiles, isLoading } = useFetch(
		"http://localhost:5000/users/",
		{
			method: "GET",
		}
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	console.log(document);

	return (
		<div>
			{profiles &&
				profiles.map((profile: any) => {
					return <ProfileItem key={profile.id} profile={profile} />;
				})}
		</div>
	);
}

export default ProfileList;
