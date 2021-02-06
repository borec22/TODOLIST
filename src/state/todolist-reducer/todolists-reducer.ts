import {v1} from 'uuid';
import {TodolistType} from '../../api/todolist-api';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
export const ADD_TODOLIST = 'ADD-TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
}

export type ActionsTypeTodolist =
   ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof addTodolistAC>
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeTodolistFilterAC>;

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTypeTodolist): Array<TodolistDomainType> => {
   switch (action.type) {
      case REMOVE_TODOLIST:
         return state.filter(todolist => todolist.id !== action.id)
      case ADD_TODOLIST:
         let todolist: TodolistDomainType = {
            id: action.id,
            title: action.title,
            filter: 'all',
            addedDate: '',
            order: 0
         }
         return [todolist, ...state,];
      case CHANGE_TODOLIST_TITLE:
         return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist);
      case CHANGE_TODOLIST_FILTER:
         return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist)
      default:
         return state;
   }
}

export const removeTodolistAC = (id: string) => ({type: REMOVE_TODOLIST, id: id}) as const;
export const addTodolistAC = (title: string) => ({type: ADD_TODOLIST, title, id: v1()}) as const;
export const changeTodolistTitleAC = (id: string, title: string) => ({type: CHANGE_TODOLIST_TITLE, id, title}) as const;
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
   type: CHANGE_TODOLIST_FILTER,
   id,
   filter
}) as const;