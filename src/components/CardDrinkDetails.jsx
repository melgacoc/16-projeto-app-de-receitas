import React from 'react';

function CardDrinkDetails(recipe) {
  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions,
  } = recipe;

  const getRecipes = Object.entries(recipe)
    .filter((kV) => kV[0].includes('strIngredient'))
    .filter((kV) => kV[1] !== null);
  const getMeasures = Object.entries(recipe).filter((kV) => kV[0].includes('strMeasure'))
    .filter((kV) => kV[1] !== null);

  const recipesAndMeasures = () => {
    const result = [];
    for (let i = 0; i < getRecipes.length; i += 1) {
      result.push(
        <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
          { `${getRecipes[i][1]} ${getMeasures[i] && getMeasures[i][1]}` }
        </li>,
      );
    }
    return result;
  };
  return (
    <div className="recipe-container">
      <h1 data-testid="recipe-title">{ strDrink }</h1>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
      <div className="details-container">
        <h3 data-testid="recipe-category">{ strAlcoholic }</h3>
        <h3>Ingredients</h3>
        <ul className="ingredients-container">
          { recipesAndMeasures() }
        </ul>
        <h6 className="instructions" data-testid="instructions">{ strInstructions }</h6>
      </div>
    </div>
  );
}

export default CardDrinkDetails;
