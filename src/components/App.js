import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch plants");
        }
        return response.json();
      })
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load plants. Please try again.");
        setLoading(false);
      });
  }, []);

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

  const handleDelete = (id) => {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
    fetch(`http://localhost:6001/plants/${id}`, { method: "DELETE" });
  };

  const handleSoldOutToggle = (id) => {
    const plantToUpdate = plants.find((plant) => plant.id === id);
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sold_out: !plantToUpdate.sold_out }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === updatedPlant.id ? updatedPlant : plant
          )
        );
      });
  };

  const handleUpdatePrice = (id, newPrice) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === updatedPlant.id ? updatedPlant : plant
          )
        );
      });
  };

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      {loading ? (
        <p>Loading plants...</p>
      ) : (
        <PlantList
          plants={filteredPlants}
          onDelete={handleDelete}
          onSoldOutToggle={handleSoldOutToggle}
          onUpdatePrice={handleUpdatePrice}
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}

export default PlantPage;

