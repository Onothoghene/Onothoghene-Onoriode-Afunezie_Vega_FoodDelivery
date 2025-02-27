import React, { useContext, useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import Comments from '../components/Comments';
import SortBar from '../components/SortBar';
import AddToCartButton from '../components/AddToCartButton';
import CartQuantityChange from '../components/CartQuantityChange';
import CartContext from '../context/CartContext';
import CommentService from '../services/CommentService';

const MenuItemDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { updateCart } = useContext(CartContext);

    // Get item details from state
    const item = location.state?.item;
    console.log("from menu det: ", item)

    if (!item) {
        navigate('/menu');
        return null;
    }

    // State for average rating
    const [averageRating, setAverageRating] = useState(item.avgRating || 0);
    const [comments, setComments] = useState(item.comments || []);

    // Fetch comments from the API when component mounts
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await CommentService.getCommentsByMenuItem(item.id); 
                console.log(response.data?.data)
                setComments(response.data?.data); 
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [item.id]);

    // Function to handle new comments
    const handleNewComment = async (newComment) => {
        try {
            await CommentService.addOrUpdateComment(newComment); // Save to API
            setComments((prevComments) => [newComment, ...prevComments]); // Update UI
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row mt-5">
                <div className="col-md-5">
                    <img
                        src={item?.images?.imageURL}
                        alt={item.name}
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-7">
                    <h3>{item.name}</h3>
                    <p className="single-product-pricing">
                        <span>$</span>{item.price}
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Dicta sint dignissimos, rem commodi cum voluptatem quae reprehenderit
                        repudiandae ea tempora incidunt ipsa, quisquam animi perferendis
                        eos eum modi! Tempora, earum.
                    </p>

                    {/* Rating Component */}
                    <Rating itemId={item.id} currentRating={averageRating} onRatingChange={setAverageRating} />

                    <div className="col-sm-3 mb-2">
                        <CartQuantityChange item={item} onQuantityChange={updateCart} />
                    </div>
                    <AddToCartButton foodItem={item} price={item.price} />
                    <p className="mt-3">
                        <strong>Category:</strong> {item.categoryName}
                    </p>

                    {/* Comments Section */}
                    <Comments foodId={item.id} comments={comments} onNewComment={handleNewComment} />
                    {/* <Comments foodId={item.id} comments={item.comments} onNewComment={handleNewComment} /> */}

                </div>
            </div>
        </div>
    );
};

export default MenuItemDetails;
