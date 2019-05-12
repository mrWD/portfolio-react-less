import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import store from './store'

import './index.less'

import Header from './components/Header'
import CardList from './containers/CardList/CardList'
import Description from './containers/Description/Description'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={CardList} />
        <Route path="/:id?" component={Description} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
