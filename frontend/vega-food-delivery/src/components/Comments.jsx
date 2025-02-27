import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { FaStar } from "react-icons/fa";
import SortBar from "./SortBar";
import CommentService from "../services/CommentService";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Comments = ({ foodId, comments, onNewComment }) => {
    const { authUser, authToken } = useAuth();
    const [visibleCount, setVisibleCount] = useState(1);
    const [commentsToShow, setCommentsToShow] = useState(1);

    // Function to load more comments
    const loadMore = () => {
        setVisibleCount((prev) => prev + commentsToShow);
    };

    useEffect(() => {
        setVisibleCount(commentsToShow);
    }, [commentsToShow]);

    return (
        <div className="mt-4">
            {/* Reviews Header with SortBar on the Same Line */}

            <div className="d-flex justify-content-between align-items-center mb-3">

                <p className="mb-0 .fs-5 text">Customer Reviews</p>
                <SortBar onCommentsToShowChange={setCommentsToShow} />
                {/* <SortBar/> */}
            </div>

            {/* Display Comments First */}
            {comments.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <>
                    {comments.slice(0, visibleCount).map((comment, index) => (
                        <div key={index} className="border p-2 mb-3 rounded">
                            {/* Display Star Rating */}
                            <div className="mb-1">
                                {[...Array(5)].map((_, starIndex) => (
                                    <FaStar
                                        key={starIndex}
                                        size={16}
                                        color={starIndex < comment.rating ? "#ffc107" : "#e4e5e9"}
                                    />
                                ))}
                            </div>
                            <p><strong>User:</strong> {comment.commentText}</p>
                        </div>
                    ))}
                    {visibleCount < comments.length && (
                        <button className="btn btn-outline-primary btn-sm mt-2" onClick={loadMore}>
                            Show more reviews
                        </button>
                    )}
                </>
            )}

            {/* Spacing Between Comments and Form */}
            <div className="mt-4 p-3 border rounded bg-light">
                <h6>Leave a Review</h6>
                {/* <CommentForm foodId={foodId} onNewComment={handleNewComment} /> */}
                {authUser && authToken ? (
                    <CommentForm foodId={foodId} onNewComment={onNewComment} />
                ) : (
                    <>
                        <div className="d-flex flex-column align-items-center mt-3">
                            <p className="text-center"> Log in to leave a review</p>
                            <Link className="btn btn-outline-primary text-center" to="/login">Login</Link>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default Comments;
