import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image || isNaN(price) || price <= 0) return;
    setLoading(true);

    const newPlant = { name, image, price: parseFloat(price) };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddPlant(data);
        setName("");
        setImage("");
        setPrice("");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to add plant:", error);
        setLoading(false);
      });
  };

  return (
    <div className="new-plant-form">
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Plant name" />
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
        <button type="submit" disabled={loading}>{loading ? "Adding Plant..." : "Add Plant"}</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
