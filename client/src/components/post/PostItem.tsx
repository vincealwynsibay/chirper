import React from "react";

interface Props {
	post: any;
}

function PostItem({ post }: Props) {
	return (
		<div>
			<h2>{post.title}</h2>
			<p>{post.content}</p>
		</div>
	);
}

export default PostItem;
