import React, { useContext } from 'react';
import './FoodDisplay.css'; // Assuming you have a CSS file named 'FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'; // Adjust the path based on your file structure
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    return (
        <div className='food-display' id='food-display'> {/* Corrected className */}
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {

                    if(category==='ALL' || category===item.category){
                        
                    return <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                />
                    }

})}
            </div>
        </div>
    );
};

export default FoodDisplay;
