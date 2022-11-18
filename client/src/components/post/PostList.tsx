import React from "react";

import useFetch from "../../hooks/useFetch";
import PostItem from "./PostItem";

interface Props {}

function PostList({}: Props) {
	const { document: posts, isLoading } = useFetch("/posts", {
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
