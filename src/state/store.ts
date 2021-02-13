import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer, ActionsTypeTodolist} from './todolist-reducer/todolists-reducer';
import {tasksReducer, ActionsTypeTasks} from './tasks-reducer/tasks-reducer';
import {getTodolistsTC} from './todolist-reducer/todolists-reducer';
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
   return (ac: ActionsTypeTodolist | ActionsTypeTasks) => dispatch(ac);
}
