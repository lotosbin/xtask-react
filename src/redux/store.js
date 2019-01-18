import _ from "lodash";
import {Action, combineReducers, createStore} from "redux";
import {devToolsEnhancer} from "redux-devtools-extension";
import {IMember} from "../components/MemberIdFilter";
import {IProject} from "../components/ProjectIdFilter";
import {IStatus} from "../components/StatusFilter";
import {loadState, saveState} from "./localStorage";

function recentProject(state: any, action: { type: string, payload: IProject }) {
    switch (action.type) {
        case "RECENT_PROJECT":
            if (!action.payload) return state;
            return {
                ...state,
                recent_project_list: [action.payload, ..._.filter(state.recent_project_list, (it) => it.id !== action.payload.id)].slice(0, 5),
            };
        default:
            return state || {recent_project_list: []};
    }
}

function recentMember(state: any, action: { type: string, payload: IMember }) {
    switch (action.type) {
        case "RECENT_MEMBER":
            if (!action.payload) return state;
            return {
                ...state,
                list: [action.payload, ..._.filter(state.list, (it) => it.id !== action.payload.id)].slice(0, 5),
            };
        default:
            return state || {list: []};
    }
}

function recentStatus(state: any, action: { type: string, payload: IStatus }) {
    switch (action.type) {
        case "RECENT_STATUS":
            if (!action.payload) return state;
            return {
                ...state,
                list: [action.payload, ..._.filter(state.list, (it) => it.id !== action.payload.id)].slice(0, 5),
            };
        default:
            return state || {list: []};
    }
}

function viewSelect(state: any, action: { type: string, payload: any }) {
    switch (action.type) {
        case "SELECT":
            return action.payload || null;
        default:
            return state || null;
    }
}
const reducers = combineReducers({
    recentMember,
    recentProject,
    recentStatus,
    viewSelect,
    // apollo: client.reducer(),
});
const persistedState = loadState();
// const preloadedState: any = {
//     recentProject: {recent_project_list: []},
// };
// let enhancer = compose(applyMiddleware(client.middleware()),
// 如果你正在使用开发者工具扩展程序，你可以在这里添加如下代码
// (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
// );
const enhancer = devToolsEnhancer({});
const store = createStore(reducers, persistedState, enhancer);
store.subscribe(() => saveState(store.getState()));
export default store;
