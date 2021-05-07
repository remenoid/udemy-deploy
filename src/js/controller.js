//ok
//import  { state, loadRecipe } from './model.js'; 
import * as model from './model.js';

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchRecipesView from './views/searchRecipesView.js';
import pageNavView from './views/pageNavView.js';
import previewView from './views/previewView.js';
import AddRecipeView from './views/addRecipeView';


import 'core-js/stable';                //transfiling
import 'regenerator-runtime/runtime';   //polyfying

import { async } from 'regenerator-runtime';
import toggleBookmarkView from './views/toggleBookmarkView.js';
import addRecipeView from './views/addRecipeView';




// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// 1. show recipes after searching
/*
정상
ok: true
​redirected: false
status: 200
statusText: "OK"

비정상
ok: false
​redirected: false
​status: 400
​statusText: "Bad Request"
*/
//


const recipeControl = async function () {
  
  try {
    //0. fetch id
    const recipeId = window.location.hash.slice(1);

    //console.log(recipeId);
    if (!recipeId) return;

    //1.1 render spinner
    recipeView.renderSpinner();

    //1.2 fetch recipe
    await model.loadRecipe(recipeId);

    //check bookmarked
    model.state.recipe.bookmarked =
      model.state.bookmarks?.some(el => el.id === recipeId) ?? false;

    console.log(model.state.recipe);

    //2. display recipe;
    recipeView.render(model.state.recipe);

    //3. search result active change when query exist
    if (model.state.query !== null)
      searchRecipesView.updateRender(model.loadPageRecipes());
  } catch (err) {
    recipeView.renderError(`❌❌${err}❌❌`);
    console.error(err);
  }

}

const searchControl = async function () {
  
  try {

    //1. get query
    const query = searchView.getSearchQuery();
    if (!query) return;
    
    //1.1 render spinner
    searchRecipesView.renderSpinner();

    //2 fetch recipes
    await model.loadSearchRecipes(query);
    
    //3. display recipes;
    //searchRecipesView.render(model.state.search.recipes); 
    searchRecipesView.render(model.loadPageRecipes())
    //console.log(model.state.search);

    //4. pagenation
    pageNavView.render(model.state.search);


  } catch (err) {
    console.error(err);
    //recipeView.renderError(`❌❌${err}❌❌`);
  }

}

const pageNavControl = function (page) {

  //3. display recipes;
  searchRecipesView.render(model.loadPageRecipes(page));

  //4. pagenation
  pageNavView.render(model.state.search);

}

const toggleBookmarkControl = function() {
  model.state.recipe.bookmarked = !model.state.recipe.bookmarked;
  model.manageBookmark();
  toggleBookmarkView.render(model.state.bookmarks);
  recipeView.updateRender(model.state.recipe);
}

const changeServingsControl = function(changeServings) {

  model.changeServings(changeServings);
  //console.log(model.state.recipe);
  recipeView.updateRender(model.state.recipe);

}

const addRecipeControl = async function (formdata) {
  try {
    //show sending start
    addRecipeView.renderSpinner();

    //uploading
    await model.uploadRecipe(formdata);

    //success mesage
    addRecipeView.renderInfo();

    //새로 입력한 자료로 다시 그리기 및 new input data init
    recipeView.render(model.state.recipe);
    model.state.uploading = {};

    //pushState()는 이전 URL과 신규 URL의 해시가 다르더라도 절대 hashchange (en-US) 이벤트를 유발하지 않습니다.
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //render bookmark view
    toggleBookmarkView.render(model.state.bookmarks);

    //close form window
    setTimeout(() => {
      addRecipeView.toggleModal();
      //입력화면 초기화
      addRecipeView.render(model.state.uploading);
    }, 3000);

    //
  } catch (err) {
    console.log('new', err);
    //addRecipeView.renderError(err.message);
    alert(err.message);
    addRecipeView.render(model.state.uploading);
  }
}; 


const init = function() {
  recipeView.addHandlerRender(recipeControl);

  //searchRecipes
  //searchControl();
  searchView.addHandlerSearch(searchControl);

  //pagenation
  pageNavView.addHandlerButton(pageNavControl);

  //change servings
  recipeView.addHandlerChangeServings(changeServingsControl);

  //toggle bookmark
  toggleBookmarkView.render(model.state.bookmarks);
  recipeView.addHandlerToggleBookmark(toggleBookmarkControl);

  //add recipe
  addRecipeView.render(model.state.uploading);
  addRecipeView.addHandlerAddRecipe(addRecipeControl);
}

init();

// window.addEventListener('hashchange', function() {
//   console.log('hash');
//   showRecipe();
// });

// window.addEventListener('load', function() {
//   console.log('load');
//   showRecipe();
// });

//여러개의 이벤트를 동시에 등록
//true
//Array('hashchange', 'load').forEach(ev => window.addEventListener(ev, recipeControl));
//const evs = ['hashchange', 'load'];
//evs.forEach(ev => window.addEventListener(ev, recipeControl));
// evs.forEach(ev => window.addEventListener(ev, showRecipe));
//false
//['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
