import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState('All')

  const foodsToDisplay = foods.filter(({cuisine}) => {
    if (filterBy === 'All') {
      return true;
    } else {
      return cuisine === filterBy;
    }
  })

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const updatedFoods = [...foods, newFood];
    setFoods(() => updatedFoods)
  }

  function handleClick(id) {
    const updatedFoods = foods.map(food => {
      const {heatLevel} = food;
      if (food.id === id) {
        return { ...food, heatLevel: heatLevel + 1}
      }
      return food
    })
    setFoods(() => updatedFoods);
  }

  function handleFilterChange(event) {
    setFilterBy(() => event.target.value);
  }

  //{ id: 2, name: "Mapo Tofu", cuisine: "Sichuan", heatLevel: 6 },
  const foodList = foodsToDisplay.map(({id, name, cuisine, heatLevel}) => {
    return (
      <li key={id} onClick={() => handleClick(id)}>
        {name} | Heat: {heatLevel} | Cuisine {cuisine}
      </li>
    )
  });

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;

//shows a button to generate a new spicy food
//when the button is clicked, adds the newly generated food to a list