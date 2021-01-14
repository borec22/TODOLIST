import {combineReducers, createStore} from 'redux';
import {todolistsReducer, ActionsTypeTodolist} from './todolist-reducer/todolists-reducer';
import {tasksReducer, ActionsTypeTasks} from './tasks-reducer/tasks-reducer';
import {useDispatch as _useDispatch} from 'react-redux';

const rootReducer = combineReducers({
   todolists: todolistsReducer,
   tasks: tasksReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;

export const useDispatch = () => {
   let dispatch = _useDispatch();
   return (ac: ActionsTypeTodolist | ActionsTypeTasks) => dispatch(ac);
}
