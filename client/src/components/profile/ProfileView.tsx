import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

interface Props {}

function ProfileView({}: Props) {
	const { profile_id } = useParams();
	const { document: profile, isLoading } = useFetch(
		`http://localhost:5000/users/${profile_id}`,
		{
			mode: "GET",
		}
	);

	if (isLoading) {
		return <div>loading...</div>;
	}

	return <div></div>;
}

export default ProfileView;
