import React from 'react'

const MenuTabs = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <ul className="nav nav-pills justify-content-center mb-4">
      {categories.map(([key, value]) => (
        <li className="nav-item" key={key}>
          <button
            className={`nav-link ${Number(selectedCategory) === Number(key) ? "active" : ""}`}
            onClick={() => setSelectedCategory(Number(key))}
          >
            {value}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MenuTabs