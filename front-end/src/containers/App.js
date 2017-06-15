import React, { Component } from 'react'
import { connect } from 'react-redux'
import ArticlesContainer from './ArticlesContainer'

class App extends Component {
  render () {
    return (
      <ArticlesContainer />
    )
  }
}

const mapStateToProps = state => {
  return {
    articles: state.get('articles'),
    router: state.get('router')
  }
}

export default connect(mapStateToProps)(App)
