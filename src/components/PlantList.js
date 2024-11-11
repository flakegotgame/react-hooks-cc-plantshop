import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDelete, onSoldOutToggle, onUpdatePrice }) {
  return plants.length ? (
    <ul className="cards">
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
  ) : (
    <p>No plants available. Please add some!</p>
  );
}

export default PlantList;
