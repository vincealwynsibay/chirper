import React from "react";

interface Props {
	comment: any;
}

function CommentItem({ comment }: Props) {
	console.log(comment);

	return <div>{comment.content}</div>;
}

export default CommentItem;
