import _ from "lodash";
import {Action, combineReducers, createStore} from "redux";
import {devToolsEnhancer} from "redux-devtools-extension";
import {IProject} from "../components/ProjectIdFilter";

function counter(state = 0, action: any) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}

function recentProject(state: any, action: { type: string, payload: IProject }) {
    switch (action.type) {
        case "RECENT_PROJECT":
            return {
                ...state,
                recent_project_list: [action.payload, ..._.filter(state.recent_project_list, (it) => it.id !== action.payload.id)].slice(0, 5),
            };
        default:
            return state || {recent_project_list: []};
    }
}

const reducers = combineReducers({
    counter,
    recentProject,
    // apollo: client.reducer(),
});
const preloadedState: any = {
    recentProject: {recent_project_list: []},
};
// let enhancer = compose(applyMiddleware(client.middleware()),
// 如果你正在使用开发者工具扩展程序，你可以在这里添加如下代码
// (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
// );
const enhancer = devToolsEnhancer({});
const store = createStore(reducers, preloadedState, enhancer);
store.subscribe(() => console.log(store.getState()));

store.dispatch({type: "INCREMENT"});
store.dispatch({type: "INCREMENT"});
store.dispatch({type: "DECREMENT"});
export default store;
