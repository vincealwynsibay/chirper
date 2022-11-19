import React from "react";
import { Link } from "react-router-dom";

interface Props {
	post: any;
}

function PostItem({ post }: Props) {
	console.log(post.photos);
	return (
		<div>
			<Link to={`/posts/${post.id}`}>
				<h2>{post.title}</h2>
				<p>{post.content}</p>
			</Link>
		</div>
	);
}

export default PostItem;
