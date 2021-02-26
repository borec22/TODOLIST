import {applyMiddleware, combineReducers, createStore} from 'redux';
import {ActionsTodolistsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {ActionsTasksType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {useDispatch as _useDispatch} from 'react-redux';
import thunk from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reducer';

const rootReducer = combineReducers({
   todolists: todolistsReducer,
   tasks: tasksReducer,
   app: appReducer,
   auth: authReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;

export const useDispatch = () => {
   let dispatch = _useDispatch();
   return (ac: ActionsTodolistsType | ActionsTasksType) => dispatch(ac);
}
