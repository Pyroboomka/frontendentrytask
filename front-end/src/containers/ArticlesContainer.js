import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchArticleIfNeeded } from '../actions/articlesActions'
import { parseSearch } from '../utils/routerUtils'
import Article from '../components/Article'

class Articles extends Component {
  componentWillMount () {
    const { dispatch } = this.props
    const offset = this.props.currentOffset
    dispatch(push(`/?q=offset=${offset}`))
  }

  componentWillReceiveProps (nextProps) {
    const { dispatch } = this.props
    const isFetching = this.props.articles.get('isFetching')
    const nextOffset = nextProps.currentOffset
    if (!isFetching) {
      dispatch(fetchArticleIfNeeded(nextOffset))
    }
  }

  renderArticle () {
    const { data } = this.props
    const isFetching = this.props.articles.get('isFetching')
    const offset = this.props.currentOffset
    const item = data.get(offset)
    if (!isFetching && (typeof item !== 'undefined')) {
      return <Article key={item.get('id')} data={item} />
    } else {
      return <div>Loading...</div>
    }
  }

  handleNavClick (type) {
    const { dispatch } = this.props
    const currentoffset = this.props.currentOffset
    if (type === 'backward') {
      dispatch(push(`/?q=offset=${currentoffset - 1 < 0 ? 0 : currentoffset - 1}`))
    }
    if (type === 'forward') {
      dispatch(push(`/?q=offset=${currentoffset + 1}`))
    }
  }

  handleArticleClick () {
    const { dispatch } = this.props
    dispatch(push(`/article/${this.props.currentOffset}`))
  }

  render () {
    return (
      <div className='container'>
        <div onClick={this.handleArticleClick.bind(this)}
          className='article-container'>
          {this.renderArticle()}
        </div>
        <div className='page-buttons'>
          <div className='backward'>
            <button onClick={this.handleNavClick.bind(this, 'backward')}>Previous</button>
          </div>
          <div className='forward'>
            <button onClick={this.handleNavClick.bind(this, 'forward')}>Next</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let router = state.get('router')
  const currentOffset = parseSearch(router.location.search) || 0
  return {
    articles: state.get('articles'),
    data: state.getIn(['articles', 'data']),
    router,
    currentOffset
  }
}

export default connect(mapStateToProps)(Articles)
