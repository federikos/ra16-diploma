import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import Layout from './Layout';
import NotFound from '../pages/404';
import About from '../pages/About';
import Cart from '../pages/Cart';
import Catalog from '../pages/Catalog';
import Contacts from '../pages/Contacts';
import Main from '../pages/Main';
import Product from '../pages/Product';
import { restoreCartFromLS } from '../actions/actionCreators';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreCartFromLS());
  }, []);

  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/catalog/:id">
              <Product />
            </Route>
            <Route exact path="/catalog">
              <Catalog />
            </Route>
            <Route exact path="/contacts">
              <Contacts />
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/404">
              <NotFound />
            </Route>
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
