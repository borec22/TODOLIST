import {v1} from 'uuid';
import {todolistAPI, TodolistType} from '../../api/todolist-api';
import {Dispatch} from 'redux';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
export const ADD_TODOLIST = 'ADD-TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';
export const SET_TODOLISTS = 'TODOLISTS_REDUCER/REDSET_TODOLISTS';


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
}

export type ActionsTypeTodolist =
   ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof addTodolistAC>
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeTodolistFilterAC>
   | ReturnType<typeof setTodolistsAC>;

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTypeTodolist): Array<TodolistDomainType> => {
   switch (action.type) {
      case REMOVE_TODOLIST:
         return state.filter(todolist => todolist.id !== action.id)
      case ADD_TODOLIST:
         return [{...action.todolist, filter: 'all'}, ...state,];
      case CHANGE_TODOLIST_TITLE:
         return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist);
      case CHANGE_TODOLIST_FILTER:
         return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist);
      case SET_TODOLISTS: {
         return action.todolists.map(tl => ({...tl, filter: 'all'}));
      }
      default:
         return state;
   }
}

export const removeTodolistAC = (id: string) => ({type: REMOVE_TODOLIST, id}) as const;
export const addTodolistAC = (todolist: TodolistType) => ({type: ADD_TODOLIST, todolist}) as const;
export const changeTodolistTitleAC = (id: string, title: string) => ({type: CHANGE_TODOLIST_TITLE, id, title}) as const;
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
   type: CHANGE_TODOLIST_FILTER,
   id,
   filter
}) as const;

export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: SET_TODOLISTS, todolists}) as const;


export const getTodolistsTC = () => (dispatch: Dispatch) => {
   todolistAPI.getTodolists()
      .then(res => {
         dispatch(setTodolistsAC(res.data));
      })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
   todolistAPI.deleteTodolist(id)
      .then((res) => {
         if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC(id));
         }
      })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
   todolistAPI.createTodolist(title)
      .then((res) => {
         if (res.data.resultCode === 0) {
            dispatch(addTodolistAC(res.data.data.item));
         }
      })
}

export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
   todolistAPI.updateTodolist(id, title)
      .then((res) => {
         if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(id, title));
         }
      })
}

