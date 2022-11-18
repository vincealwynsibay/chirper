import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

interface Props {}

function PostView({}: Props) {
	const { post_id } = useParams();
	const { document: post, isLoading } = useFetch(`/posts/${post_id}`, {
		mode: "GET",
	});

	if (isLoading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
			<p>{post.user_id}</p>
		</div>
	);
}

export default PostView;
