import React from 'react'
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import MenuItemAction from './MenuItemAction';

const MenuItem = ({ item, onEdit, onDelete }) => {
  // console.log(item);
  //Determine image source
  const imageSrc =
    item?.images?.fileBinary && item?.images?.fileBinary.trim() !== ''
      ? `data:${item?.images?.fileFormat};base64,${item?.images?.fileBinary}`
      : item?.images?.imageURL && item?.images?.imageURL.trim() !== ''
        ? item?.images?.imageURL
        : 'https://i.pinimg.com/474x/5c/83/16/5c83164a83f9c0635de227c5be9461a6.jpg'; // Default placeholder image

  //console.log(item?.images.imageURL)

  console.log(imageSrc); // Debugging purpose

  //console.log(item?.images?.imageURL)

  return (
    <div className="col-sm-6 col-lg-4 mb-4">
      <div className="card border-0 shadow-sm">
        <img src={imageSrc} className="card-img-top" alt={item.name} />
        {/* <img src="https://i.pinimg.com/736x/03/d4/b1/03d4b1563efdbd8325785d856f812bb9.jpg" className="card-img-top" alt={item.name} /> */}
        <div className="card-body text-center">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Tasty and delicious, perfect for your cravings.</p>
          <div className="d-flex justify-content-between align-items-center">
            <Link
              className="btn btn-info rounded-pill btn-sm text-white"
              to={`/menu-details`}
              state={{ item }}>
              View
            </Link>
            <h6 className="mb-0">${item.price}</h6>
            <AddToCartButton foodItem={item} />
          </div>

          <MenuItemAction item={item} onEdit={onEdit} onDelete={onDelete} />

        </div>
      </div>
    </div>
  );
};

export default MenuItem