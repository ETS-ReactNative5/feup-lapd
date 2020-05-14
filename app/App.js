// * Description: App Entry Point

import React, { Component } from 'react';

import { Provider } from 'react-redux';

import Router from './routes'
// import store from './redux/store';

export default function App() {
  return (
    /*<Provider store={store}>*/
      <Router />
    // </Provider>
  );
}
