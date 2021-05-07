import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { API_KEY } from './config';
import { CNT_PER_PAGE } from './config';
import { STORAGE_KEY } from './config';

// import { getJSON } from './helpers';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  //bookmarked: false,  recipe.bookmarked
  search: {
    query: '',
    recipes: [],
    curPage: 1,
    listCount: CNT_PER_PAGE,
  },
  bookmarks: [],
  uploading: {}
}

const createRecipeFormat = function(data) {

  const { recipe } = data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key : recipe.key})
  }
}

export const loadRecipe = async function(recipeId) {

  try {
    
    const result = await AJAX(`${API_URL}/${recipeId}`);
    //console.log(result);


    state.recipe = createRecipeFormat(result.data);
    
    //console.log(state.recipe);

  } catch (err) {
    console.log(err);
    throw err;
  }    
}

const validateUploadRecipe = function (raw) {
  
  const recipeNew = Object.fromEntries(raw.entries());
  const newIngredients = Object.entries(recipeNew)
    .filter( entry => entry[0].startsWith('ingredient') &&  entry[1] !== '')
    .map( entry => {
      const ingDetails = entry[1].trim().split(',');
      if (ingDetails.length !== 3) throw new Error('ingredient input data wrong.');
      console.log(ingDetails);
      const  [ amount , unit, description ] = ingDetails;
      return { quantity: +amount ? amount : null, unit, description };
    });  
    //error 시 다시 보여줌
    state.uploading = recipeNew;
    console.log(recipeNew);

    return {
      // id: recipeNew.id,
      title: recipeNew.title,
      publisher: recipeNew.publisher,
      source_url: recipeNew.sourceUrl,
      image_url: recipeNew.image,
      servings: +recipeNew.servings,
      cooking_time: +recipeNew.cookingTime,
      ingredients: newIngredients,

    };

}

export const uploadRecipe = async function (formData) {
  try {
    const newRecipe = validateUploadRecipe(formData);
    console.log(newRecipe);
    const result = await AJAX(`${API_URL}?key=${API_KEY}`,newRecipe);
    console.log(result);
    
    state.recipe = createRecipeFormat(result.data);

  } catch (err) {
    console.log(err);
    throw err;
  }
};

//https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
export const loadSearchRecipes = async function(query) {

  try {
    state.search.query = query;
    
    const result = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    //console.log(result);
    
    state.search.recipes = result.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && {key : recipe.key})
      };
    });
    
    state.search.curPage = 1;
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
