import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ icon, title = "No items found", message, buttonText, linkRoute }) => {
  return (
    <div className="text-center mt-5">
      {icon && <div className="mb-3">{icon}</div>}
      <h4 className="fw-bold">{title}</h4>
      <p className="text-muted fs-5">{message}</p> {/* Increased font size */}
      {buttonText && linkRoute && (
        <Link className="btn btn-info px-4 py-2 mt-2 text-white" to={linkRoute}>
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
