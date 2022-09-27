import React from 'react';
import '../styles/Recipes.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategories, fetchRecipes } from '../redux/actions';

const MAX_NUMBER_RECIPES = 11;
const MAX_NUMBER_CATEGORIES = 4;

function Recipes({ type, recipes, categories }) {
  return (
    <div>
      {categories
        .filter((cat, index) => (
          index <= MAX_NUMBER_CATEGORIES
        ))
        .map((cat, index) => (
          <button
            data-testid={ `${cat.strCategory}-category-filter` }
            key={ index }
            type="button"
          >
            {cat.strCategory}
          </button>
        ))}
      {type === 'meals'
        && recipes
          .filter((_, index) => (
            index <= MAX_NUMBER_RECIPES
          ))
          .map((rec, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ rec.idMeal }
            >
              <img
                data-testid={ `${index}-card-img` }
                className="thumbnail"
                src={ rec.strMealThumb }
                alt={ rec.strMeal }
              />
              <span
                data-testid={ `${index}-card-name` }
              >
                { rec.strMeal }
              </span>
            </div>
          ))}
      {type === 'drinks'
        && recipes
          .filter((rec, index) => (
            index <= MAX_NUMBER_RECIPES
          ))
          .map((rec, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ rec.idDrink }
            >
              <img
                data-testid={ `${index}-card-img` }
                className="thumbnail"
                src={ rec.strDrinkThumb }
                alt={ rec.strDrink }
              />
              <span
                data-testid={ `${index}-card-name` }
              >
                { rec.strDrink }
              </span>
            </div>
          ))}
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.instanceOf(Object).isRequired,
  categories: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.reducer.recipes,
  categories: state.reducer.categories,
});

const mapDispatchToProps = (dispatch) => ({
  fetchingRec: (state) => dispatch(fetchRecipes(state)),
  fetchingCat: (state) => dispatch(fetchCategories(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
