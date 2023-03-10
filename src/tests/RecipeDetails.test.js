import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const MEAL_DETAIL_PATHNAME = '/meals/52977';
const START_RECIPE_BUTTON = 'start-recipe-btn';

describe('Testes do componente RecipeDetails em meals', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    // jest.spyOn(global, 'fetch');
  });

  test('Se ao entrar na rota com id 52977 os detalhes da receita aparecem', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [MEAL_DETAIL_PATHNAME] });

    // await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const recommendedMeal = await screen.findByTestId('0-recommendation-card');

    await waitFor(() => expect(recommendedMeal).toBeInTheDocument());

    const mealTitle = await screen.findByText('Corba');

    await waitFor(() => expect(mealTitle).toBeInTheDocument());
  });
  test('Se ao clicar no botão de Start Recipe muda a rota para 529977/in-progress', async () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [MEAL_DETAIL_PATHNAME] },
    );

    const startRecipeButton = await screen.findByTestId(START_RECIPE_BUTTON);

    await waitFor(() => expect(startRecipeButton).toBeInTheDocument());

    expect(startRecipeButton).toBeInTheDocument();

    userEvent.click(startRecipeButton);

    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
  test('Se ao clicar no botão de Share, copia a url ', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [MEAL_DETAIL_PATHNAME] });
    window.document.execCommand = jest.fn().mockImplementation(() => 'Link copied!');

    const recommendedMeal = await screen.findByTestId('0-recommendation-card');

    await waitFor(() => expect(recommendedMeal).toBeInTheDocument());

    const shareButton = screen.getByTestId('share-btn');

    userEvent.click(shareButton);

    const copiedLink = screen.getByText('Link copied!');
    waitFor(() => expect(copiedLink).toBeInTheDocument());
  });
});

describe('Testes do componente RecipeDetails em drinks', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('Se ao entrar na rota com id 13501 os detalhes da receita aparecem', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/13501'] });

    // jest.spyOn(global, 'fetch');

    // expect(global.fetch).toHaveBeenCalledTimes(2);

    const mealTitle = await screen.findByText('ABC');

    await waitFor(() => expect(mealTitle).toBeInTheDocument());
  });
  test('Se ao clicar no botão de Start Recipe muda a rota para 13501/in-progress', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/13501'] });

    const startRecipeButton = await screen.findByTestId(START_RECIPE_BUTTON);

    await waitFor(() => expect(startRecipeButton).toBeInTheDocument());

    userEvent.click(startRecipeButton);

    expect(history.location.pathname).toBe('/drinks/13501/in-progress');
  });

  test('Se ao clicar em favoritar, a ação acontece', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/178319'] });

    const favoriteRecipeButton = await screen.findByTestId('favorite-btn');

    await waitFor(() => expect(favoriteRecipeButton).toBeInTheDocument());

    userEvent.click(favoriteRecipeButton);
  });

  test('Se ao entrar em uma pagina de detalhes com uma receita ja favoritada ele reconhece, e depois favorita e desfavorita', async () => {
    const favoriteRecipes = [{
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    console.log(localStorage.getItem('favoriteRecipes'));

    renderWithRouterAndRedux(<App />, { initialEntries: [MEAL_DETAIL_PATHNAME] });

    const mealTitle = await screen.findByText('Corba');

    expect(mealTitle).toBeInTheDocument();

    const favoriteRecipeButton = await screen.findByTestId('favorite-btn');
    expect(favoriteRecipeButton).toBeInTheDocument();

    userEvent.click(favoriteRecipeButton);

    userEvent.click(favoriteRecipeButton);
  });

  test('Se a receita estiver em progresso, o titulo do botao start recipe muda', async () => {
    const inProgressRecipes = [{
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    }];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    renderWithRouterAndRedux(<App />, { initialEntries: [MEAL_DETAIL_PATHNAME] });

    const startRecipeButton = await screen.findByTestId(START_RECIPE_BUTTON);

    await waitFor(() => expect(startRecipeButton).toBeInTheDocument());

    expect(startRecipeButton).toHaveTextContent('Continue Recipe');

    userEvent.click(startRecipeButton);
  });
});
