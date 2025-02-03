// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import RecipeList from "./components/RecipeList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
      </Routes>
    </Router>
  );
};

export default App;
