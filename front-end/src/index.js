import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { history, configureStore } from './store/configureStore'
import '../styles/app.css'

import App from './containers/App'
import Navigation from './components/Navigation'
import AddArticleContainer from './containers/AddArticleContainer'
import ArticleFullContainer from './containers/ArticleFullContainer'
import SearchContainer from './containers/SearchContainer'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Navigation />
        <Route exact path='/' component={App} />
        <Route path='/add' component={AddArticleContainer} />
        <Route path='/article/:id' component={ArticleFullContainer} />
        <Route path='/search' component={SearchContainer} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
