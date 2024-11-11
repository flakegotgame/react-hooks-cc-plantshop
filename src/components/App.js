import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import '../index.css';// Import global CSS

function App() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch plants");
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

  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const handleDelete = (id) => {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
    fetch(`http://localhost:6001/plants/${id}`, { method: "DELETE" });
  };

  const handleSoldOutToggle = (id) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, sold_out: !plant.sold_out } : plant
    );
    setPlants(updatedPlants);
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sold_out: !plants.find((plant) => plant.id === id).sold_out }),
    });
  };

  const handleUpdatePrice = (id, newPrice) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, price: newPrice } : plant
    );
    setPlants(updatedPlants);
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice }),
    });
  };

  return (
    <main className="app">
      <header>
        <h1 className="logo">Plantsy</h1>
      </header>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={setSearchQuery} />
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

export default App;

