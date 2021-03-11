import {submitForm} from './user-form.js';
import {renderStatusModalSuccess, renderStatusModalError} from './status-modal.js';
import './image-preview.js'

submitForm(renderStatusModalSuccess, renderStatusModalError);
