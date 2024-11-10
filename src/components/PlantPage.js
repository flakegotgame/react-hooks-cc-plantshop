import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track errors

  // Fetch plants when the component mounts
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
        console.error(error); // Log any errors for debugging
        setError("Failed to load plants. Please try again.");
        setLoading(false);
      });
  }, []);

  // Filter the plants based on the search query
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding a new plant
  const handleAddPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add new plant");
        }
        return response.json();
      })
      .then((data) => {
        console.log("New plant added:", data);
      })
      .catch((error) => {
        console.error("Error adding new plant:", error);
        // Rollback optimistically added plant in case of failure
        setPlants((prevPlants) =>
          prevPlants.filter((plant) => plant.id !== newPlant.id)
        );
        setError("Error adding new plant. Please try again.");
      });
  };

  // Handle search query change
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle deleting a plant
  const handleDelete = (id) => {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete plant");
        }
        console.log(`Plant with id ${id} deleted successfully`);
      })
      .catch((error) => {
        console.error("Error deleting plant:", error);
        // Restore plant if delete fails
        setPlants((prevPlants) => [
          ...prevPlants,
          plants.find((plant) => plant.id === id),
        ]);
        setError("Failed to delete plant. Please try again.");
      });
  };

  // Handle updating plant's sold-out status
  const handleSoldOutToggle = (id) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, sold_out: !plant.sold_out } : plant
    );
    setPlants(updatedPlants);

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sold_out: !plants.find((plant) => plant.id === id).sold_out,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update sold-out status");
        }
        return response.json();
      })
      .then((updatedPlant) => {
        console.log(`Plant ${updatedPlant.name} status updated`);
      })
      .catch((error) => {
        console.error("Error updating sold-out status:", error);
        // Rollback the UI update in case of failure
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === id ? { ...plant, sold_out: !plant.sold_out } : plant
          )
        );
        setError("Failed to update plant status. Please try again.");
      });
  };

  // Handle updating plant price
  const handleUpdatePrice = (id, newPrice) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, price: newPrice } : plant
    );
    setPlants(updatedPlants);

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: newPrice,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update price");
        }
        return response.json();
      })
      .then((updatedPlant) => {
        console.log(`Plant price updated: ${updatedPlant.name} - $${newPrice}`);
      })
      .catch((error) => {
        console.error("Error updating price:", error);
        // Rollback the price change in case of failure
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === id ? { ...plant, price: plant.price } : plant
          )
        );
        setError("Failed to update plant price. Please try again.");
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
      {filteredPlants.length === 0 && !loading && <p>No plants found.</p>}
    </main>
  );
}

export default PlantPage;
