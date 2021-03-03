import {getData} from './api.js'
import {submitForm} from './user-form.js';
import {renderAdIcons} from './render-map.js';
import {renderStatusModalSuccess, renderStatusModalError} from './status-modal.js';

getData(renderAdIcons);
submitForm(renderStatusModalSuccess, renderStatusModalError);
