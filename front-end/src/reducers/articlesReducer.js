import { RECEIVE_ARTICLE, REQUEST_ARTICLE, DELETE_ARTICLE,
   REQUEST_FAIL_ARTICLES, RECEIVE_FULL_ARTICLE, RECEIVE_ARTICLE_COMMENTS } from '../actions/articlesActions'
import { Map, Record } from 'immutable'

export const Article = Record({
  id: '',
  date: '',
  title: '',
  text: '',
  comments: Map()
})

const initialArticlesState = Map({
  isFetching: false,
  data: Map()
})

function articles (state = initialArticlesState, action) {
  switch (action.type) {
    case (REQUEST_ARTICLE): {
      return state.set('isFetching', true)
    }
    case (RECEIVE_ARTICLE): {
      state = state.updateIn(['data', action.offset], article => action.article)
      return state.set('isFetching', false)
    }
    case (REQUEST_FAIL_ARTICLES): {
      return state.set('isFetching', false)
    }
    case (DELETE_ARTICLE): {
      const articleKey = state.get('data').findKey(function (item) { return item.id === action.id })
      return state.deleteIn(['data', articleKey])
    }
    case (RECEIVE_FULL_ARTICLE): {
      const articleKey = state.get('data').findKey(function (item) { return item.id === action.article.id })
      state = state.updateIn(['data', articleKey], article => action.article)
      return state.set('isFetching', false)
    }
    case (RECEIVE_ARTICLE_COMMENTS): {
      const articleKey = state.get('data').findKey(function (item) { return item.id === action.id })
      state = state.mergeIn(['data', articleKey, 'comments'], state.getIn(['data', articleKey, 'comments']), action.comments)
      return state.set('isFetching', false)
    }
    default: {
      return state
    }
  }
}
export default articles
