// AddRecipe.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "../style.css";

const AddRecipe: React.FC = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleAddRecipe = async () => {
    try {
      const docRef = await addDoc(collection(db, "recipes"), {
        title,
        ingredients,
      });
      console.log("Recipe added with ID: ", docRef.id);
      navigate("/"); // Redirect to homepage after adding the recipe
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Recipe</h2>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
      />
      <label htmlFor="ingredients">Ingredients</label>
      <textarea
        id="ingredients"
        value={ingredients.join("\n")}
        onChange={(e) => setIngredients(e.target.value.split("\n"))}
        placeholder="List ingredients, one per line"
      />
      <button onClick={handleAddRecipe}>Add Recipe</button>
    </div>
  );
};

export default AddRecipe;
