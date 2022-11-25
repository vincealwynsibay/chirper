import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import PostItem from "./PostItem";

interface Props {
	isProfile?: boolean;
}

function PostList({ isProfile }: Props) {
	const { profile_id } = useParams();

	// checks if in profile or not
	const url = isProfile ? `/user/${profile_id}/posts` : "/posts";

	const { document: posts, isLoading } = useFetch(url, {
		method: "GET",
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{posts &&
				posts.map((post: any) => {
					return <PostItem key={post.id} post={post} />;
				})}
		</div>
	);
}

export default PostList;
