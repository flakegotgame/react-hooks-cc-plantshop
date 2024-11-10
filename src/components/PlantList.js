import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDelete, onSoldOutToggle, onUpdatePrice }) {
  if (plants.length === 0) {
    return <p>No plants available. Please add some!</p>;
  }

  return (
    <ul>
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onDelete={onDelete}
          onSoldOutToggle={onSoldOutToggle}
          onUpdatePrice={onUpdatePrice}
        />
      ))}
    </ul>
  );
}

export default PlantList;


