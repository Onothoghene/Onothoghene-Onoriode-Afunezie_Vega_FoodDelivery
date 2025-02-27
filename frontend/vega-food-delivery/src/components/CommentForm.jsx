import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import CommentService from "../services/CommentService";
import toast from "react-hot-toast";

const CommentForm = ({ foodId, onNewComment }) => {
    const [commentText, setCommentText] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim() === "" || rating === 0) return;

        const newComment = { id: 0, foodId, commentText, rating };
        try {
            setLoading(true);
            await CommentService.addOrUpdateComment(newComment);
            onNewComment(newComment);
            toast.success("Review submitted successfully!");
            setCommentText("");
            setRating(0);
        } catch (error) {
            console.error("Error submitting comment:", error);
            toast.error("Failed to submit review. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3">
            {/* Star Rating */}
            <div className="mb-2">
                <strong>Rate this item:</strong>
                <div>
                    {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                            <FaStar
                                key={index}
                                size={20}
                                className="star"
                                color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                onMouseEnter={() => setHover(starValue)}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => setRating(starValue)}
                                style={{ cursor: "pointer", marginRight: 5 }}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Comment Box */}
            <textarea
                className="form-control"
                rows="2"
                placeholder="Leave a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary btn-sm mt-2" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
};

export default CommentForm;
