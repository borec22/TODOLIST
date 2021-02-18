import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer, ActionsTodolistsType} from '../features/TodolistsList/todolists-reducer';
import {tasksReducer, ActionsTasksType} from '../features/TodolistsList/tasks-reducer';
import {getTodolistsTC} from '../features/TodolistsList/todolists-reducer';
import {useDispatch as _useDispatch} from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
   todolists: todolistsReducer,
   tasks: tasksReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;

export const useDispatch = () => {
   let dispatch = _useDispatch();
   return (ac: ActionsTodolistsType | ActionsTasksType) => dispatch(ac);
}
