import { composeArticlesURLWithOffset, composeArticleTextURL, getPostCommentURL,
  composeArticleCommentsURL, getPostArticleURL } from '../utils/urlUtils'
import { Article } from '../reducers/articlesReducer'
import { goBack, push } from 'react-router-redux'
import Immutable from 'immutable'

export const REQUEST_ARTICLE = 'REQUEST_ARTICLE'
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE'
export const REQUEST_FAIL_ARTICLES = 'REQUEST_FAIL_ARTICLES'
export const RECEIVE_FULL_ARTICLE = 'RECEIVE_FULL_ARTICLE'
export const RECEIVE_ARTICLE_COMMENTS = 'RECEIVE_ARTICLE_COMMENTS'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'

function requestArticles () {
  return {
    type: REQUEST_ARTICLE
  }
}

function errorInArticles (message) {
  return (dispatch) => {
    console.error(message)
    return dispatch({
      type: REQUEST_FAIL_ARTICLES,
      message })
  }
}

function receiveArticle (article, offset) {
  return {
    type: RECEIVE_ARTICLE,
    article,
    offset
  }
}

function receiveFullArticle (article) {
  return {
    type: RECEIVE_FULL_ARTICLE,
    article
  }
}
function receiveArticleComments (comments, id) {
  return {
    type: RECEIVE_ARTICLE_COMMENTS,
    comments,
    id
  }
}

function fetchArticle (url, offset) {
  return (dispatch, getState) => {
    dispatch(requestArticles())
    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.length === 0) {
          dispatch(errorInArticles('Got nothing from backend'))
          return dispatch(goBack())
        }
        let article = new Article(json[0])
        dispatch(receiveArticle(article, offset))
      })
      .catch(err => dispatch(errorInArticles(err)))
  }
}

function fetchArticleText (id) {
  return (dispatch) => {
    dispatch(requestArticles())
    let url = composeArticleTextURL(id)
    fetch(url)
      .then(res => res.json())
      .then(json => {
        let fullArticle = new Article(json)
        dispatch(receiveFullArticle(fullArticle))
      })
      .catch(err => dispatch(errorInArticles(err)))
  }
}

function fetchArticleComments (id) {
  return (dispatch) => {
    dispatch(requestArticles())
    let url = composeArticleCommentsURL(id)
    fetch(url)
      .then(res => res.json())
      .then(json => {
        const comments = json.comments.reduce((acc, comment) => (Object.assign(acc, {[comment.id]: comment})), {})
        const commentsMap = Immutable.fromJS(comments)
        dispatch(receiveArticleComments(commentsMap, id))
      })
      .catch(err => console.error(err))
  }
}

export function fetchArticleIfNeeded (offset) {
  return (dispatch, getState) => {
    const data = getState().getIn(['articles', 'data'])
    const isFetching = getState().getIn(['articles', 'isFetching'])
    if (!data.get(offset) && !isFetching) {
      dispatch(fetchArticle(composeArticlesURLWithOffset(offset), offset))
    }
  }
}

export function fetchArticleTextIfNeeded (id) {
  return (dispatch, getState) => {
    const data = getState().getIn(['articles', 'data'])
    const isFetching = getState().getIn(['articles', 'isFetching'])
    const article = data.find(function (item) { return item.id === id })
    if (article.get('text') === '' && !isFetching) {
      dispatch(fetchArticleText(id))
    }
  }
}

export function fetchArticleCommentsIfNeeded (id) {
  return (dispatch, getState) => {
    const data = getState().getIn(['articles', 'data'])
    const isFetching = getState().getIn(['articles', 'isFetching'])
    const article = data.find(function (item) { return item.id === id })
    if (article.get('comments').size === 0 && !isFetching) {
      dispatch(fetchArticleComments(id))
    }
  }
}

export function submitArticle (newArticle) {
  return (dispatch, getState) => {
    let url = getPostArticleURL()
    let params = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newArticle)
    }
    fetch(url, params)
      .then(res => res.json())
      .then(json => {
/**
 * "It was at this moment he knew, he fucked up" ™
 * Я не знаю, с каким offset я получу свежепостнутую статью
 * => с текущей организацией стейта я не могу ее добавить => оставляю ее нетронутой.
 * При желании, я могу запушить ее в стейт с плейсхолдерным оффсетом, и при получении статьи с идентичным
 * id/содержанием перелинковать ее в нужный формат, но т.к запрос/ответ уже пройдет, особого смысла в этом нет.
 * Хотя можно сэкономить на fetch текста!
 * Печальный опыт получен :(
 */
        return dispatch(push('/'))
      })
      .catch(err => console.error(err))
  }
}

export function submitComment (newComment) {
  return (dispatch) => {
    let url = getPostCommentURL()
    let params = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newComment)
    }
    fetch(url, params)
      .then(res => res.json())
      .then(json => {
        let commentObj = { [json.id]: json }
        const newComment = Immutable.fromJS(commentObj)
        dispatch(receiveArticleComments(newComment, json.article))
      })
      .catch(err => console.error(err))
  }
}

export function deleteArticle (id) {
  return {
    type: DELETE_ARTICLE,
    id
  }
}
