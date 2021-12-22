import ReactDOM from 'react-dom';
import React from 'react';
import './index.less';
import APP from './src/index';
import { AppContainer as ReactHotContainer } from 'react-hot-loader';
const AppContainer = process.env.NODE_ENV === 'development' ? ReactHotContainer : React.Fragment;
ReactDOM.render(<APP />, document.getElementById('root'));
