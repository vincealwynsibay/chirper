import React from "react";
import useFetch from "../../hooks/useFetch";

interface Props {
	comment: any;
}

function CommentItem({ comment }: Props) {
	const { document: user, isLoading } = useFetch(
		`/users/${comment.user_id}`,
		{ method: "GET" }
	);

	if (isLoading) {
		<div>loading...</div>;
	}

	console.log(user);

	return (
		<div>
			<p>{comment.content}</p>
			<div>
				<p>{user.displayName}</p>
				<img src={user.avatar} />
			</div>
		</div>
	);
}

export default CommentItem;
