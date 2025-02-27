import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

const CartBadge = () => {
  const { cartCount } = useContext(CartContext);

  return (
    <span class="position-absolute top-1 start-95 translate-middle badge rounded-pill bg-danger">
      {cartCount > 20 ? "20+" : cartCount}
      <span class="visually-hidden">items</span>
    </span>
  );
}

export default CartBadge;
