import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { CNT_PER_PAGE } from './config';
import { STORAGE_KEY } from './config';

import { getJSON } from './helpers';

export const state = {
  recipe: {},
  //bookmarked: false,  recipe.bookmarked
  search: {
    query: '',
    recipes: [],
    curPage: 1,
    listCount: CNT_PER_PAGE,
  },
  bookmarks: []
}

export const loadRecipe = async function(recipeId) {

  try {
    
    const result = await getJSON(`${API_URL}/${recipeId}`);
    //console.log(result);

    const { recipe } = result.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    }
    
    //console.log(state.recipe);

  } catch (err) {
    console.log(err);
    throw err;
  }    
}

//https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
export const loadSearchRecipes = async function(query) {

  try {
    state.search.query = query;
    //state.search.curPage = 1;
    
    const result = await getJSON(`${API_URL}?search=${query}`);
    //console.log(result);

    state.search.recipes = result.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    console.log(err);
    throw err;
  }    
}

export const loadPageRecipes = function(gotoPage = 1) {
  
  const start = (gotoPage - 1) * CNT_PER_PAGE;
  const end = gotoPage * CNT_PER_PAGE;

  state.search.curPage = gotoPage;
  
  return state.search.recipes.slice(start,end);
}

export const changeServings = function(newServings) {

  if ( newServings < 1 ) return;
  const { servings, ingredients } = state.recipe; 

  ingredients.forEach(ing => ing.quantity = (ing.quantity * newServings) / servings );

  state.recipe.servings = newServings;
}

export const manageBookmark = function() {
  
  if (state.recipe.bookmarked) state.bookmarks.push(state.recipe)
  else {
    const idx = state.bookmarks.findIndex(rec => rec.id === state.recipe.id);
    console.log('find', idx);
    state.bookmarks.splice(idx,1);
  }

  //save
  localStorage.setItem('forkify', JSON.stringify(state.bookmarks));
}

const loadBookmarks = function() {
  const bookmarkString = localStorage.getItem(STORAGE_KEY);
  state.bookmarks = bookmarkString ? JSON.parse(bookmarkString) : [];
}

const init = function() {
  loadBookmarks()
}

init();
