import React, { useState } from "react";

function PlantCard({ plant, onDelete, onSoldOutToggle, onUpdatePrice }) {
  const [price, setPrice] = useState(plant.price);

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    setPrice(newPrice);
    onUpdatePrice(plant.id, newPrice);
  };

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h2>{plant.name}</h2>
      <p>Price: ${price}</p>
      <input type="number" value={price} onChange={handlePriceChange} />
      <button onClick={() => onSoldOutToggle(plant.id)} className={plant.sold_out ? "" : "primary"}>
        {plant.sold_out ? "Out of Stock" : "In Stock"}
      </button>
      <button onClick={() => onDelete(plant.id)}>Delete</button>
    </li>
  );
}

export default PlantCard;
