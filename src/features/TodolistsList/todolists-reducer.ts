import {todolistAPI, TodolistType} from '../../api/todolist-api';
import {Dispatch} from 'redux';


export enum TODOLISTS_ACTIONS_TYPE {
   REMOVE_TODOLIST = 'TODOLISTS/REMOVE-TODOLIST',
   ADD_TODOLIST = 'TODOLISTS/ADD-TODOLIST',
   CHANGE_TODOLIST_TITLE = 'TODOLISTS/CHANGE-TODOLIST-TITLE',
   CHANGE_TODOLIST_FILTER = 'TODOLISTS/CHANGE-TODOLIST-FILTER',
   SET_TODOLISTS = 'TODOLISTS/REDSET_TODOLISTS',
}

const initialState: Array<TodolistDomainType> = [];


export const todolistsReducer =
   (state: Array<TodolistDomainType> = initialState, action: ActionsTodolistsType): Array<TodolistDomainType> => {
      switch (action.type) {
         case TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter(todolist => todolist.id !== action.id)

         case TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST:
            return [{...action.todolist, filter: 'all'}, ...state,];

         case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE:
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist);

         case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER:
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist);

         case TODOLISTS_ACTIONS_TYPE.SET_TODOLISTS: {
            return action.todolists.map(tl => ({...tl, filter: 'all'}));
         }

         default:
            return state;
      }
   }

// actions
export const removeTodolistAC = (id: string) =>
   ({type: TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST, id}) as const;

export const addTodolistAC = (todolist: TodolistType) =>
   ({type: TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST, todolist}) as const;

export const changeTodolistTitleAC = (id: string, title: string) =>
   ({type: TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE, id, title}) as const;

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
   ({type: TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER, id, filter}) as const;

export const setTodolistsAC = (todolists: Array<TodolistType>) =>
   ({type: TODOLISTS_ACTIONS_TYPE.SET_TODOLISTS, todolists}) as const;


// thunks
export const getTodolistsTC = () =>
   (dispatch: Dispatch<ActionsTodolistsType>) => {
      todolistAPI.getTodolists()
         .then(res => {
            dispatch(setTodolistsAC(res.data));
         })
   }

export const removeTodolistTC = (id: string) =>
   (dispatch: Dispatch<ActionsTodolistsType>) => {
      todolistAPI.deleteTodolist(id)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(removeTodolistAC(id));
            }
         })
   }

export const addTodolistTC = (title: string) =>
   (dispatch: Dispatch<ActionsTodolistsType>) => {
      todolistAPI.createTodolist(title)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(addTodolistAC(res.data.data.item));
            }
         })
   }

export const changeTodolistTitleTC = (id: string, title: string) =>
   (dispatch: Dispatch) => {
      todolistAPI.updateTodolist(id, title)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(changeTodolistTitleAC(id, title));
            }
         })
   }


// types
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
}

export type ActionsTodolistsType =
   ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof addTodolistAC>
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeTodolistFilterAC>
   | ReturnType<typeof setTodolistsAC>;

