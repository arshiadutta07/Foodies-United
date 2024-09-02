import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RecipeList.css'; 

const RecipeList = () => {
  const [recipes, setRecipes] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getAllRecipes', {
          withCredentials: true,
        });
        setRecipes(response.data.data); 
      } catch (err) {
        console.error(err);
        setError('Failed to fetch recipes');
      }
    };

    fetchRecipes();
  }, []);

  const handleViewClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleUpdateClick = (id) => {
    navigate(`/recipes/${id}/update`);
  };

  const handleCreateClick = () => {
    navigate('/recipes/create');
  };

  return (
    <div className="recipe-list-container">
      <h2>Recipe List</h2>
      {error && <p className="error-message">{error}</p>}
      {Object.keys(recipes).length === 0 ? (
        <p>No recipes available</p>
      ) : (
        Object.entries(recipes).map(([cuisine, recipesList]) => (
          <div key={cuisine} className="cuisine-group">
            <h3>{cuisine}</h3>
            <ul>
              {recipesList.map(recipe => (
                <li key={recipe.id}>
                  <h4>{recipe.title}</h4>
                  <p>{recipe.description}</p>
                  {recipe.image ? (
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="recipe-image"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                  <div className="recipe-buttons">
                    <button className="view" onClick={() => handleViewClick(recipe.id)}>View</button>
                    <button className="update" onClick={() => handleUpdateClick(recipe.id)}>Update</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
