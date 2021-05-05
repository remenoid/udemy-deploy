import icons from 'url:../../img/icons.svg';   //parcel use
import View from './view.js';
import PreviewView from './previewView';

class SearchRecipesView extends View {
  _parentEle = document.querySelector('.results');
  _data;
  
  // render(data) {
  //   this.#data = data;
  //   const markup = this.#generateMarkup(this.#data[0]);
  //   console.log(this.#data[0]);
  //   this.#clear();
  //   this.#parentEle.insertAdjacentHTML('afterbegin',markup);
  // }

  
  
  _generateMarkup(){
    return this._data.map(row => PreviewView.render(row, false)).join('');         
  }

}

export default new SearchRecipesView();