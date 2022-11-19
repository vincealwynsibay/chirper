import React from "react";
import { useParams, Link } from "react-router-dom";
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
			{post.photos &&
				post.photos.map((photo: any) => {
					return <img src={photo} key={photo} />;
				})}
			<h1>{post.title}</h1>
			<p>{post.content}</p>
			<p>{post.user_id}</p>
			<Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
		</div>
	);
}

export default PostView;
