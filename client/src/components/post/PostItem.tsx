import React from "react";

interface Props {
	post: any;
}

function PostItem({ post }: Props) {
	console.log(post.photos);
	return (
		<div>
			{/* {post.photos.length > 0 &&
				post.photos.map((photo: any) => {
					return <img src={photo} key={photo} />;
				})} */}
			<h2>{post.title}</h2>
			<p>{post.content}</p>
		</div>
	);
}

export default PostItem;
