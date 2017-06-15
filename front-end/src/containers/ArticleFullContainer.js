import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchArticleTextIfNeeded, fetchArticleCommentsIfNeeded, deleteArticle } from '../actions/articlesActions'
import Comments from '../components/Comments'
import CommentsForm from '../containers/CommentFormContainer'

class ArticleFull extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isCommentsShown: false
    }
    this.showComments = this.showComments.bind(this)
    this.renderCommentSection = this.renderCommentSection.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  componentWillMount () {
    const { dispatch } = this.props
    const data = this.props.articleData
    dispatch(fetchArticleTextIfNeeded(data.get('id')))
  }

  showComments () {
    const { dispatch } = this.props
    const data = this.props.articleData
    dispatch(fetchArticleCommentsIfNeeded(data.get('id')))
    this.setState({isCommentsShown: !this.state.isCommentsShown})
  }

  handleDeleteClick () {
    const { dispatch } = this.props
    const articleId = this.props.articleData.get('id')
    dispatch(deleteArticle(articleId))
    //  idk where i should redirect after
    dispatch(push('/search'))
  }

  renderCommentSection () {
    const { dispatch } = this.props
    const articleCommentsMap = this.props.articleData.get('comments')
    const articleId = this.props.articleData.get('id')
    if (this.state.isCommentsShown) {
      return (
        <div className='comments-section'>
          <Comments commentsMap={articleCommentsMap} />
          <CommentsForm dispatch={dispatch} articleId={articleId} />
        </div>
      )
    } else {
      return null
    }
  }

  render () {
    const data = this.props.articleData
    let formattedDate = new Date(data.get('date')).toLocaleDateString()
    return (
      <div className='container'>
        <div className='fl-r-wrap'>
          <p>{formattedDate}</p>
          <button className='button-delete' onClick={this.handleDeleteClick}>X</button>
        </div>
        <h3>{data.get('title')}</h3>
        {this.props.isFetching ? <div className='spinner'>Loading...</div> : <p>{data.get('text')}</p>}
        <hr />
        <div className='fl-r-wrap'>
          <button onClick={this.showComments}>{this.state.isCommentsShown ? 'Hide comments' : 'Show comments'}</button>
        </div>
        {this.renderCommentSection()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const articleData = state.getIn(['articles', 'data', +id])
  const isFetching = state.getIn(['articles', 'isFetching'])
  return {
    articles: state.get('articles'),
    router: state.get('router'),
    articleData,
    isFetching
  }
}
export default connect(mapStateToProps)(ArticleFull)
