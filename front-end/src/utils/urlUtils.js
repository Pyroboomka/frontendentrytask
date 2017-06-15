export function composeArticlesURLWithOffset (offset) {
  return `http://localhost:3000/api/article?limit=1&offset=${offset}`
}
export function composeArticleTextURL (id) {
  return `http://localhost:3000/api/article/${id}`
}
export function composeArticleCommentsURL (id) {
  return `http://localhost:3000/api/comment?article=${id}`
}
export function getPostArticleURL () {
  return `http://localhost:3000/api/article`
}
export function getPostCommentURL () {
  return `http://localhost:3000/api/comment`
}
