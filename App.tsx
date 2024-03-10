/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Help } from './src/Help';
import { HueyMain } from './src/MainView';
import { selectPage } from './src/selectors';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { reducer, rootSaga } from './src/store';
import { Provider, useSelector } from 'react-redux';


// TODO: Persist user id in android storage for the application
let user = null;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, { user, promptBridgeButton: false, page: 'Main', lights: [] }, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const Pages = () => {
  const page = useSelector(selectPage);
  return {
    Help: <Help />,
    Main: <HueyMain />
  }[page] || <Help />;
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Pages />
    </Provider>
  )
}

export default App;
