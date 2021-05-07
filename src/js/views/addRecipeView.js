import icons from 'url:../../img/icons.svg'; //parcel use
import View from './view.js';

class AddRecipeView extends View {
  _parentEle = document.querySelector('.upload');
  _window = document.querySelector('.overlay');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnSend = document.querySelector('.upload__btn');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _content = document.querySelector('.add-recipe-window');

  _infoDefault = 'new data uploaded successfully.';

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
      const data = new FormData(this);
      subscriber(data);
    });
  }

  toggleModal() {
    this._window.classList.toggle('hidden');
    this._content.classList.toggle('hidden');
  }

  _generateMarkup() {
    return `
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="${
          this._data.title ?? ''
        }" required name="title" type="text" />
        <label>URL</label>
        <input value="${
          this._data.sourceUrl ?? ''
        }" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="${
          this._data.image ?? ''
        }" required name="image" type="text" />
        <label>Publisher</label>
        <input value="${
          this._data.publisher ?? ''
        }" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="${
          this._data.cookingTime ?? 10
        }" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="${
          this._data.servings ?? 4
        }" required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input
          value="0.5,kg,Rice"
          type="text"
          required
          name="ingredient-1"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 2</label>
        <input
          value="1,,Avocado"
          type="text"
          name="ingredient-2"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 3</label>
        <input
          value=",,salt"
          type="text"
          name="ingredient-3"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 4</label>
        <input
          type="text"
          name="ingredient-4"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 5</label>
        <input
          type="text"
          name="ingredient-5"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 6</label>
        <input
          type="text"
          name="ingredient-6"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="src/img/icons.svg#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    `;
  }
}

export default new AddRecipeView();
