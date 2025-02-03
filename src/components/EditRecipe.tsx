// EditRecipe.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../style.css";

const EditRecipe: React.FC = () => {
  const [recipe, setRecipe] = useState<any | null>(null); // Set proper type for the recipe
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const { id } = useParams(); // Get recipe id from the route
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRecipe(data);
          setTitle(data.title);
          setIngredients(data.ingredients);
        } else {
          console.log("Recipe not found!");
        }
      };

      fetchRecipe();
    }
  }, [id]);

  const handleUpdate = async () => {
    if (recipe && id) {
      try {
        await updateDoc(doc(db, "recipes", id), {
          title,
          ingredients,
        });
        console.log("Recipe updated successfully!");
        navigate("/"); // Redirect to homepage after update
      } catch (error) {
        console.error("Error updating recipe: ", error);
      }
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Recipe</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={ingredients.join("\n")}
        onChange={(e) => setIngredients(e.target.value.split("\n"))}
        placeholder="Ingredients"
      />
      <button onClick={handleUpdate}>Update Recipe</button>
    </div>
  );
};

export default EditRecipe;
