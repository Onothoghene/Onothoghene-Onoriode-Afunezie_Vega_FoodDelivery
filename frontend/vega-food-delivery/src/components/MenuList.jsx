import React from 'react'
import MenuItem from './MenuItem';
import Spinner from './Spinner';
import EmptyState from './EmptyState';

const MenuList = ({ items, isLoading, onEdit, onDelete }) => {

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner className="mt-3" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="No Menu available"
        message="We're working hard to enhance your experience and deliver the best service possible. Stay tuned for exciting updates!"
      />
    );
  }

  return (
    <div className="row">
      {items.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onEdit} />
      ))}
    </div>
  );
}

export default MenuList