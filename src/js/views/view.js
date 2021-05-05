import icons from 'url:../../img/icons.svg';   //parcel use

export default class View {
  _data;
  _parentEle;
  _errorDefault;
  _infoDefault;
  
  render(data, render = true) {

    if(!data || (Array.isArray(data) && data.length === 0)) {
      this._errorDefault = 'data not found. try again!';
      this.renderError();
      return;
    }
    
    this._data = data;

    const markup = this._generateMarkup();
    if (!render) return markup;

    this._clear();
    this._parentEle.insertAdjacentHTML('beforeend',markup);

  }
  
  updateRender(data){
    if(!data || (Array.isArray(data) && data.length === 0)) {
      this._errorDefault = 'data not found. try again!';
      this.renderError();
      return;
    }
    this._data = data;
    const newMarkup = this._generateMarkup();

    //갱신될 화면요소를 임시nodelist로 저장
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newEles = Array.from(newDOM.querySelectorAll('*'));   
    const curEles = Array.from(this._parentEle.querySelectorAll('*'));

    //console.log(curEles);
    newEles.forEach( (newEl, idx) => {
      let curEl = curEles[idx];
      // 5 <span class=​"recipe__info-data recipe__info-data--people">​5​</span>​ 
      // nodevalue에 값이 있고 이전 html과 다르면 textContent를 갱신
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() ) curEl.textContent = newEl.textContent;

      const attrs = newEl.attributes;
      if (!newEl.isEqualNode(curEl) && attrs.length) {
        Array.from(attrs).forEach((attr) => {
          //console.log(attr.name, attr.value)
          curEl.setAttribute(attr.name, attr.value); 
        });
      }
    });


  }

  renderSpinner() {
    this._clear();
    const markup =`
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>  
      </div>  
    `;  
    this._parentEle.insertAdjacentHTML('afterbegin',markup);
  }  

  renderError(message = this._errorDefault) {
    this._clear()
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._parentEle.insertAdjacentHTML('afterbegin',markup);
  }

  renderInfo(message = this._infoDefault) {
    this._clear()
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._parentEle.insertAdjacentHTML('afterbegin',markup);
  }


  _clear() {
    this._parentEle.innerHTML = '';  
  }

  _generateMarkup() {
    return 'subclass method name check ';
  }

}

