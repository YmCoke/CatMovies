import React from 'react';
import Layout from './pages/Layout';
// import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import store from './redux/store';
import history from './redux/history';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Layout />
        </>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;