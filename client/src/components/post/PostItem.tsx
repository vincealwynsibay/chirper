import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import API from "../utils/API";

interface Props {
	post: any;
}

function PostItem({ post }: Props) {
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [likesCount, setLikesCount] = useState<number>(0);

	const { user } = useAuthContext();

	useEffect(() => {
		if (post.likes && user) {
			setLikesCount(post.likes.length);

			if (
				post.likes.some(
					(like: any) => like.toString() === user.id.toString()
				)
			) {
				setIsLiked(true);
			} else {
				setIsLiked(false);
			}
		}
	}, [post]);

	const like = async () => {
		setIsLiked(true);
		setLikesCount(likesCount + 1);
		await API.fetchData(`/posts/${post.id}/like`, {
			method: "PUT",
			body: JSON.stringify({ id: post.id }),
			contentType: "application/json",
		});
	};

	const unlike = async () => {
		try {
			setIsLiked(false);
			setLikesCount(likesCount - 1);
			await API.fetchData(`/posts/${post.id}/unlike`, {
				method: "PUT",
				body: JSON.stringify({ id: post.id }),
				contentType: "application/json",
			});
		} catch (err) {}
	};

	return (
		<div>
			<Link to={`/posts/${post.id}`}>
				<h2>{post.title}</h2>
				<p>{post.content}</p>
			</Link>
			<div>{user && likesCount}</div>

			{user && isLiked ? (
				<button onClick={unlike}>Unlike</button>
			) : (
				<button onClick={like}>Like</button>
			)}
		</div>
	);
}

export default PostItem;
