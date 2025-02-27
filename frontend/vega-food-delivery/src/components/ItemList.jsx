  import React, { useContext } from 'react';
  import EmptyState from './EmptyState';
  import { Link } from 'react-router-dom';
  import Spinner from './Spinner';
  import CartQuantityChange from './CartQuantityChange';
  import CartContext from '../context/CartContext';
  import AddToCartButton from './AddToCartButton';

  const ItemList = ({ title, items, isLoading, routePath }) => {
    const { updateCart } = useContext(CartContext);
    return (
      <section className="container my-5">
        {/* Title and View More button in the same row */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark">{title}</h2>
          {items.length > 0 && !isLoading && (
            <Link to={routePath} className="btn btn-outline-info">View More</Link>
          )}
        </div>

        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title={`No ${title.toLowerCase()} available`}
            message={"We're working hard to enhance your experience and deliver the best service possible. Stay tuned for exciting updates!"} />
        ) : (
          <div className="row">
            {items.map((item, index) => (
              <div key={index} className="col-sm-6 col-lg-3 mb-4">
                <div className="card border-0 shadow-sm">
                  {console.log("Item list:", item)}
                  <img src={item?.images?.imageURL || "https://i.pinimg.com/474x/5c/83/16/5c83164a83f9c0635de227c5be9461a6.jpg"} className="card-img-top" alt={item.name} />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Tasty and delicious, perfect for your cravings.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">${item.price}</h6>
                      {/* <CartQuantityChange item={item} onQuantityChange={updateCart} /> */}
                      {/* <button className="btn btn-warning rounded-pill btn-sm text-white">Add to Cart</button> */}
                      {/* <AddToCartButton foodItem={item}/> */}
                      <Link
                                    className="btn btn-info rounded-pill btn-sm text-white"
                                    to={`/menu-details`}
                                    state={{  item}}>
                                    View
                                  </Link>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };

  export default ItemList;
