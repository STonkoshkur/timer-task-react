import { combineReducers } from 'redux';

import task from './task';
import timer from './timer';

export default combineReducers({ task, timer });
