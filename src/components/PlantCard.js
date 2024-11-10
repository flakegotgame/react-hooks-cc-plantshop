import React, { useState } from "react";

function PlantCard({ plant, onDelete, onSoldOutToggle, onUpdatePrice }) {
  const [newPrice, setNewPrice] = useState(plant.price);
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePriceChange = () => {
    if (newPrice !== plant.price) {
      setIsUpdating(true);
      onUpdatePrice(plant.id, parseFloat(newPrice)).finally(() => {
        setIsUpdating(false);
      });
    }
  };

  return (
    <li className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h2>{plant.name}</h2>
      <p>
        ${plant.price}{" "}
        <button onClick={() => onSoldOutToggle(plant.id)}>
          {plant.sold_out ? "Mark as Available" : "Mark as Sold Out"}
        </button>
      </p>
      <input
        type="number"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
        placeholder="New Price"
      />
      <button onClick={handlePriceChange} disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update Price"}
      </button>
      <button onClick={() => onDelete(plant.id)}>Delete</button>
    </li>
  );
}

export default PlantCard;

