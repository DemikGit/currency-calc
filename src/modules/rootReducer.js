import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { appReducer as app } from '../components/App/AppReducer';
import { convertorReducer as convertor } from '../components/Pages/Convertor/ConvertorReducer';
import { routerReducer } from 'react-router-redux';

export const rootReducer = combineReducers({
  app,
  convertor,
  form: formReducer,
  routing: routerReducer,
});
