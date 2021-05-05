const Fraction = require('fractional').Fraction;
import View from './view.js';

import icons from 'url:../../img/icons.svg';   //parcel use


class ToggleBookmarkView extends View {
  _data;
  _parentEle = document.querySelector('.bookmarks__list');

  _errorDefault = '';
  _infoDefault = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  
 
  _generateMarkup() {
    return this._data.map(row => this.#previewMarkup(row)).join();    
  }

  #previewMarkup(recipe) {
    return `
      <li class="preview">
        <a class="preview__link preview__link--active" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
          </div>
        </a>
      </li>
    `;
  }


}

export default new ToggleBookmarkView();