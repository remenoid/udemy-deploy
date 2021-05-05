import icons from 'url:../../img/icons.svg';   //parcel use

class SearchView {
  _parentElement = document.querySelector('form.search');
  #query = '';

  getSearchQuery(){
    this.#query = this._parentElement.querySelector('input.search__field').value;
    //FIXME:
    return 'pizza';
    //return this.#query;
  }

  addHandlerSearch(callbackF) {
    this._parentElement.querySelector('button.search__btn').addEventListener('click', function(ev) {
      ev.preventDefault();
      callbackF();
    });

    this._parentElement.querySelector('input.search__field').addEventListener('focus', function(ev) {
      this.value = '';
    });

    this._parentElement.querySelector('input.search__field').addEventListener('keydown', function(ev) {
      if (ev.key === 'Enter') {
        this.blur();
        callbackF();
      } 
    });
  }
}

export default new SearchView();