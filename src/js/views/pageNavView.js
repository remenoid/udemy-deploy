import icons from 'url:../../img/icons.svg';   //parcel use
import View from './view.js';

class PageNavView extends View {
  _parentEle = document.querySelector('.pagination');

  addHandlerButton(naviControl) {
    this._parentEle.addEventListener('click', function(ev) {
      const btn = ev.target.closest('.btn--inline');
      
      if (!btn) return;
    
      naviControl(+btn.dataset.goto);
    });
  }

  _generateMarkup(){
    const pageLast = Math.ceil(this._data.recipes.length / this._data.listCount);

    const cur = this._data.curPage;
    // cur = 1  do not draw backward
    const backward = cur > 1 ? this.#buttonBackward(cur-1) : '';
    // last = cur  do not draw forward
    const forward = pageLast > cur ? this.#buttonForward(+cur+1) :'';
    
    return `${backward}${forward}`;    
  }

  #buttonBackward(page) {
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${page}">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${page}</span>
      </button>
    `;
  }

  #buttonForward(page) {
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${page}">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
        <span>Page ${page}</span>
      </button>
    `;
  }
}

export default new PageNavView();