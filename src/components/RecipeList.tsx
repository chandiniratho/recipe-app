import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase"; // Assuming db is initialized properly
import '../style.css';

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
}

const RecipeList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Fetch recipes from Firestore
  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const fetchedRecipes: Recipe[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Recipe[];

      setRecipes(fetchedRecipes);
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const title = recipe.title?.toLowerCase() || ""; // Ensure title is a string
    const ingredients = recipe.ingredients || []; // Ensure ingredients is an array

    const searchLower = search.toLowerCase(); // Ensure search is a string

    return (
      title.includes(searchLower) ||
      ingredients.some((ing) =>
        ing.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="recipe-list-container">
      <input
        type="text"
        placeholder="Search Recipes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>Ingredients: {(recipe.ingredients || []).join(", ")}</p>
            <Link to={`/edit/${recipe.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => alert("Deleted!")}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/add">
        <button>Add New Recipe</button>
      </Link>
    </div>
  );
};

export default RecipeList;
