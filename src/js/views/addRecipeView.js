import icons from 'url:../../img/icons.svg'; //parcel use
import View from './view.js';

class AddRecipeView extends View {
  _parentEle = document.querySelector('.upload');
  _window = document.querySelector('.overlay');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnSend = document.querySelector('.upload__btn');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _content = document.querySelector('.add-recipe-window');

  _message = 'new data uploaded successfully.';

  constructor() {
    //message, spiner show
    super();
    this._addHandlerShowModal();
    this._addHandlerHideModal();
  }

  _addHandlerShowModal() {
    this._btnOpen.addEventListener('click', this.toggleModal.bind(this));
  }

  _addHandlerHideModal() {
    this._btnClose.addEventListener('click', this.toggleModal.bind(this));
    this._window.addEventListener('click', this.toggleModal.bind(this));
  }

  addHandlerAddRecipe(subscriber) {
    this._parentEle.addEventListener('submit', function (ev) {
      ev.preventDefault();
      const data = new FormData(this._parentEle);
      subscriber(data);
    });
  }

  toggleModal() {
    this._window.classList.toggle('hidden');
    this._content.classList.toggle('hidden');
  }
}

export default new AddRecipeView();
