import { createContext, useEffect, useState, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import CartService from "../services/CartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    // Function to load cart from local storage
    const loadCartFromLocalStorage = () => {
        const savedCart = JSON.parse(sessionStorage.getItem("guestCart")) || [];
        setCartItems(savedCart);
        setCartCount(savedCart.length);
        //setCartCount(savedCart.reduce((acc, item) => acc + item.quantity, 0));
    };

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (token) {
            fetchCartItems();
        } else {
            loadCartFromLocalStorage();
        }
    }, []);

    const fetchCartItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await CartService.getCartItems();
            setCartItems(response?.data?.data || []);
            setCartCount(response?.data?.data?.length || 0);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // const addToCart = async (foodId, quantity = 1) => {
    //     setIsLoading(true);
    //     try {
    //         const existingItem = cartItems.find(item => item.foodId === foodId);
    //         const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

    //         const cartItem = { quantity: newQuantity, foodId };
    //         const IsSuccess = await CartService.addToCart(cartItem);
    //         if (IsSuccess) {
    //             toast.success("Item Added to cart");
    //             setCartCount((prevCount) => prevCount + quantity);
    //             await fetchCartItems();
    //         }
    //     } catch (error) {
    //         console.error('Failed to add item to cart:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // Function to Add Item to Cart

    const addToCart = async (foodItem, quantity = 1) => {
        const token = sessionStorage.getItem("authToken");
        console.log("Just Food Item:", foodItem)
        console.log("Just Food Item(image):", foodItem.images)
        // console.log("Just Food Item with image:", foodItem.images)

        if (token) {
            // User is logged in, update API
            setIsLoading(true);
            try {
                const existingItem = cartItems.find(item => item.foodId === foodItem.id);
                console.log("Existing Item(insert):", existingItem)
                const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

                const cartItem = { quantity: newQuantity, foodId: foodItem.id };
                const IsSuccess = await CartService.addToCart(cartItem);
                if (IsSuccess) {
                    toast.success("Item Added to Cart");
                    await fetchCartItems();
                }
            } catch (error) {
                console.error("Failed to add item to cart:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            let guestCart = JSON.parse(sessionStorage.getItem("guestCart")) || [];
            const existingItemIndex = guestCart.findIndex(item => item.id === foodItem.id);

            if (existingItemIndex !== -1) {
                // Update quantity of existing item
                guestCart[existingItemIndex].quantity += quantity;
            } else {
                // Add new item
                guestCart.push({
                    id: foodItem.id,
                    quantity,
                    food: {
                        name: foodItem.name,
                        price: foodItem.price,
                        images: {
                            imageURL: foodItem?.images?.imageURL || foodItem?.imageURL || ""
                        }
                    }
                });
            }

            sessionStorage.setItem("guestCart", JSON.stringify(guestCart));
            toast.success("Item added to cart (saved locally)");
            setCartItems(guestCart);
            setCartCount(guestCart.length);

        }
    };

    // Sync local cart to API after login
    const syncCartToAPI = async () => {
        const guestCart = JSON.parse(sessionStorage.getItem("guestCart")) || [];
        if (guestCart.length === 0) return;

        try {
            for (const item of guestCart) {
                await CartService.addToCart({ foodId: item.id, quantity: item.quantity });
            }
            sessionStorage.removeItem("guestCart");
            fetchCartItems(); // Refresh the cart from API
        } catch (error) {
            console.error("Error syncing cart:", error);
        }
    };

    const updateCart = async (foodId, newQuantity) => {
        console.log("update cart", foodId)
        setIsLoading(true);
        const token = sessionStorage.getItem("authToken");
        try {
            if (token) {
                const apiExistingItem = cartItems.find(item => item.foodId === foodId);
                if (!apiExistingItem) return; // Prevent updating non-existent items

                // const cartItem = { quantity: newQuantity, foodId };
                // const IsSuccess = await CartService.addToCart(cartItem);
                // if (IsSuccess) {
                //     toast.success("Item quantity updated");
                //     await fetchCartItems();
                // }

                // User is logged in, update via API
                const cartItem = { quantity: newQuantity, foodId };
                const IsSuccess = await CartService.addToCart(cartItem);
                if (IsSuccess) {
                    toast.success("Item quantity updated");
                    await fetchCartItems();
                }

            } else {
                // User is not logged in, update local storage
                let guestCart = JSON.parse(sessionStorage.getItem("guestCart")) || [];
                const existingItem = guestCart.find(item => item.id === foodId);
                if (existingItem) {
                    existingItem.quantity = newQuantity;
                    sessionStorage.setItem("guestCart", JSON.stringify(guestCart));
                    toast.success("Item quantity updated (saved locally)");
                    setCartItems(guestCart);
                }
            }

        } catch (error) {
            console.error('Failed to update item quantity:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const removeFromCart = async (cartItemId) => {
        setIsLoading(true);
        const token = sessionStorage.getItem("authToken");

        try {
            if (token) {
                await CartService.removeFromCart(cartItemId);
                await fetchCartItems(); // Refresh cart count
                toast.success("Item removed from cart")
            } else {
                // User is not logged in, remove from local storage
                let guestCart = JSON.parse(sessionStorage.getItem("guestCart")) || [];
                guestCart = guestCart.filter(item => item.id !== cartItemId);
                sessionStorage.setItem("guestCart", JSON.stringify(guestCart));
                toast.success("Item removed from cart (saved locally)");
                setCartItems(guestCart);
                setCartCount(guestCart.length);
            }

        } catch (error) {
            console.error('Failed to remove item:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                isLoading,
                addToCart,
                removeFromCart,
                updateCart,
                syncCartToAPI
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
