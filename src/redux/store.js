import {combineReducers, createStore} from 'redux';
import {devToolsEnhancer} from "redux-devtools-extension";

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state
    }
}

let reducers = combineReducers({
    counter: counter,
    // apollo: client.reducer(),
});
let preloadedState = {};
// let enhancer = compose(applyMiddleware(client.middleware()),
// 如果你正在使用开发者工具扩展程序，你可以在这里添加如下代码
// (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
// );
let enhancer = devToolsEnhancer();
let store = createStore(reducers, preloadedState, enhancer);
store.subscribe(() =>
    console.log(store.getState())
);
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'DECREMENT'});
export default store;