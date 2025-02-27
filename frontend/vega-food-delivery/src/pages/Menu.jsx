import React, { useEffect, useState } from 'react'
import MenuTabs from '../components/MenuTabs';
import MenuList from '../components/MenuList';
import MenuForm from '../components/MenuForm';
import { useLoading } from '../context/LoadingContext';
import { MenuCategories } from '../enum/MenuItemEnum';
import MenuService from '../services/MenuService';
import HeroSection from '../components/HeroSection';
import { useAuth } from '../hooks/useAuth';

const Menu = () => {
  const { authUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [menuItems, setMenuItems] = useState([]);
  const { isLoading, setIsLoading } = useLoading();
  const categories = Object.entries(MenuCategories).sort(([a], [b]) => a - b);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadMenuItems();
  }, [setIsLoading]);

  const loadMenuItems = async () => {
    setIsLoading(true);
    try {
      const items = await MenuService.getAllMenuItems();
      setMenuItems(items);
    } catch (error) {
      console.error("Failed to load menu items", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = (deletedId) => {
    setMenuItems(menuItems.filter(item => item.id !== deletedId));
    loadMenuItems();
  };

  const handleFormSubmit = () => {
    setIsLoading(true);
    setSelectedItem(null); // Reset form
    loadMenuItems(); // Refresh items after add/update
  };

  const filteredItems =
    selectedCategory === 0
      ? menuItems
      : menuItems.filter((item) => item.categoryId === Number(selectedCategory));

  return (
    <>
      <HeroSection title="Our Menu" />
      <section className="food_section py-5">
        <div className="container">
          <MenuTabs
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory} />

          <MenuList 
          items={filteredItems} 
          isLoading={isLoading} 
          onEdit={handleEdit} 
          onDelete={handleDelete} />

        </div>
      </section>

      {authUser?.roles.includes("Admin") && (
        <MenuForm selectedItem={selectedItem} onFormSubmit={handleFormSubmit} />
      )}


    </>
  );
};

export default Menu