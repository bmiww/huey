/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Help } from './src/Help';
import { HueyMain } from './src/MainView';




function App(): React.JSX.Element {
  const [page] = useState('Main');

  console.log('What?', page);

  return {
    Help: <Help />,
    Main: <HueyMain />
  }[page] || <Help />;
}


export default App;
