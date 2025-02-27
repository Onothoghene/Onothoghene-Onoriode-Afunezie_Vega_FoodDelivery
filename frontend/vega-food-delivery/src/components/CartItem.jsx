import React from "react";
import CartQuantityChange from "./CartQuantityChange";

const CartItem = ({ item, onQuantityChange, onRemove }) => {

  // const imageSrc =
  //   item?.images?.fileBinary && item?.images?.fileBinary.trim() !== ''
  //     ? `data:${item?.images?.fileFormat};base64,${item?.images?.fileBinary}`
  //     : item?.images.imageURL && item?.images.imageURL.trim() !== ''
  //       ? item?.images?.imageURL
  //       : 'https://via.placeholder.com/150'; // Default placeholder image
        
  return (
    <tr>
      <td>
        <img
          src={item?.food?.images?.imageURL || item?.imageURL || "https://i.pinimg.com/474x/5c/83/16/5c83164a83f9c0635de227c5be9461a6.jpg"}
          // src={imageSrc || item?.imageURL}
          alt={item.food?.name || item.name}
          className="img-fluid object-fit-cover"
          style={{ width: "100px", height: "100px" }} />
      </td>
      <td>{item.food?.name || item.name || `Food #${item.foodId}`}</td>
      <td>${item.food?.price || item.price || "N/A"}</td>
      <td className="col-sm-2">
        <CartQuantityChange item={item} onQuantityChange={onQuantityChange} />

      </td>
      {/* <td>${item.food.price * item.quantity}</td> */}
      <td>${(item?.food?.price * item.quantity).toFixed(2) || "N/A"}</td>
      <td className="text-center">
        <button className="btn btn-danger btn-sm" onClick={() => onRemove(item.id)}>X</button>
      </td>
    </tr>
  );
};

export default CartItem;
