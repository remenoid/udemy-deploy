const Fraction = require('fractional').Fraction;
import View from './view.js';
import preView from './previewView';

import icons from 'url:../../img/icons.svg';   //parcel use


class ToggleBookmarkView extends View {
  _data;
  _parentEle = document.querySelector('.bookmarks__list');

  _errorDefault = '';
  _infoDefault = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  _generateMarkup() {
    return this._data.map(row => preView.render(row, false)).join();
  }
}

export default new ToggleBookmarkView();