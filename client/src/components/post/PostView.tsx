import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";
import CommentsList from "../comment/CommentsList";
import CreateComment from "../comment/CreateComment";
import API from "../utils/API";

interface Props {}

function PostView({}: Props) {
	const { post_id } = useParams();
	const { document: post, isLoading } = useFetch(`/posts/${post_id}`, {
		mode: "GET",
	});

	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [likesCount, setLikesCount] = useState<number>(0);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && post) {
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

	const { user } = useAuthContext();

	const like = async () => {
		setIsLiked(true);
		setLikesCount(likesCount + 1);
		await API.fetchData(`/posts/${post_id}/like`, {
			method: "PUT",
			body: JSON.stringify({ id: post_id }),
			contentType: "application/json",
		});
	};

	const unlike = async () => {
		try {
			setIsLiked(false);
			setLikesCount(likesCount - 1);
			await API.fetchData(`/posts/${post_id}`, {
				method: "PUT",
				body: JSON.stringify({ id: post_id }),
				contentType: "application/json",
			});
		} catch (err) {}
	};

	const handleDelete = async () => {
		await API.fetchData(`/posts/${post_id}`, {
			method: "DELETE",
		});
		navigate("/");
	};

	if (isLoading) {
		return <div>loading...</div>;
	}
	console.log(post);

	return (
		<div>
			{post && (
				<>
					{post.photos &&
						post.photos.map((photo: any) => {
							return <img src={photo} key={photo} />;
						})}

					<h1>{post.title}</h1>
					<p>{post.content}</p>
					<p>{post.user_id}</p>
					<div>{likesCount}</div>

					{isLiked ? (
						<button onClick={unlike}>Unlike</button>
					) : (
						<button onClick={like}>Like</button>
					)}
					<Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
					<a onClick={(e) => handleDelete()}>Delete</a>
					<CreateComment postId={post && post.id} />
					<CommentsList document={post && post.id} type='post' />
				</>
			)}
		</div>
	);
}

export default PostView;
