import { registerRootComponent } from "expo";
// import {Provider}from 'react-redux'
// import {createStore,applyMiddleware,compose} from 'redux'
// import thunk from 'redux-thunk'
// import IndexReducer  from './Reducer/index';

// const store = createStore(IndexReducer, compose(applyMiddleware(thunk)));
import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
