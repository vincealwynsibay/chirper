import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";
import CommentItem from "./CommentItem";

interface Props {
	type: string;
	document?: any;
}

function CommentsList({ type, document }: Props) {
	const { user } = useAuthContext();

	let url;
	if (type === "post") {
		url = `/posts/${document}/comments`;
	} else if (type === "user") {
		url = `/user/${user.id}/comments`;
	} else {
		url = "/comments";
	}

	const { document: comments, isLoading } = useFetch(url, { method: "GET" });

	if (isLoading) {
		return <div>Loading...</div>;
	}

	console.log(comments);

	return (
		<div>
			{comments &&
				comments.map((comment: any) => {
					return <CommentItem key={comment.id} comment={comment} />;
				})}
		</div>
	);
}

export default CommentsList;
