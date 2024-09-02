import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css'; 

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/getRecipe/${id}`, {
          withCredentials: true,
        });
        setRecipe(response.data.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch recipe details');
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-detail-container">
      <h2>{recipe.title}</h2>
      <p><strong>Created by:</strong> {recipe.creator.userName}</p>
      <p><strong>Cuisine:</strong> {recipe.cuisine.name}</p>
      {recipe.image ? (
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="recipe-detail-image"
        />
      ) : (
        <p>No image available</p>
      )}
      <p>{recipe.description}</p>
      
      <h3>Ingredients</h3>
      <ul>
        {recipe.recipeIngredients.map((recipeIngredient, index) => (
          <li key={index}>{recipeIngredient.ingredient.name}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
