import React, { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection'
import ItemList from '../components/ItemList'
import HomeFeatureSection from '../components/HomeFeatureSection';
import HomeAboutSection from '../components/HomeAboutSection';
import { useLoading } from '../context/LoadingContext';
import MenuService from '../services/MenuService';


// const menuItems = [
//     { name: 'Burger', price: '$5.99', image: '/images/burger.jpg' },
//     { name: 'Pizza', price: '$8.99', image: '/images/pizza.jpg' },
//     { name: 'Pasta', price: '$7.99', image: '/images/pasta.jpg' },
//     { name: 'Salad', price: '$4.99', image: '/images/salad.jpg' },
// ];

// const pastOrders = [
//     { name: 'Chicken Wrap', price: '$6.99', image: '/images/wrap.jpg' },
//     { name: 'Sushi', price: '$10.99', image: '/images/sushi.jpg' },
//     { name: 'Tacos', price: '$5.49', image: '/images/tacos.jpg' },
//     { name: 'Steak', price: '$15.99', image: '/images/steak.jpg' },
// ];

const routes = {
    menu: "/menu",
    pastOrders: "/orders",
};

const Home = () => {
    const [menuItems, setMenuItems] = useState([]);
    const { isLoading, setIsLoading } = useLoading();

    useEffect(() => {
        const loadMenuItems = async () => {
            setIsLoading(true);
            const items = await MenuService.getAllMenuItems();

            // Randomly select 4 items
            const shuffled = items.sort(() => 0.5 - Math.random());
            const selectedItems = shuffled.slice(0, 4);

            setMenuItems(selectedItems);
            setIsLoading(false);
        };

        loadMenuItems();
    }, [setIsLoading]);

    return (
        <>
            <HeroSection
                title="Welcome to Vega Food Delivery"
                subtitle="Delicious meals delivered to your doorstep!"
            />

            <HomeFeatureSection />

            <ItemList title="Menu" items={menuItems}
                isLoading={isLoading} routePath="/menu"
            />

            <div className='my-3'>
                <HomeAboutSection />
            </div>

            {/* <div className='mb-5'>
                <ItemList title="Past Orders" items={pastOrders} routePath={routes.orders} />
            </div> */}

        </>
    )
}

export default Home

