import { combineReducers } from 'redux-immutable'
import articles from './articlesReducer'
import { routerReducer } from 'react-router-redux'

export const rootReducer = combineReducers({
  articles,
  router: routerReducer
})
