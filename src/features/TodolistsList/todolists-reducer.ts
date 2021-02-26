import {todolistAPI, TodolistType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


export enum TODOLISTS_ACTIONS_TYPE {
   REMOVE_TODOLIST = 'TODOLISTS/REMOVE-TODOLIST',
   ADD_TODOLIST = 'TODOLISTS/ADD-TODOLIST',
   CHANGE_TODOLIST_TITLE = 'TODOLISTS/CHANGE-TODOLIST-TITLE',
   CHANGE_TODOLIST_FILTER = 'TODOLISTS/CHANGE-TODOLIST-FILTER',
   SET_TODOLISTS = 'TODOLISTS/REDSET_TODOLISTS',
   CHANGE_TODOLIST_ENTITY_STATUS = 'APP/CHANGE-TODOLIST-ENTITY-STATUS',
}

const initialState: Array<TodolistDomainType> = [];


export const todolistsReducer =
   (state: Array<TodolistDomainType> = initialState, action: ActionsTodolistsType): Array<TodolistDomainType> => {
      switch (action.type) {
         case TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter(todolist => todolist.id !== action.id)

         case TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST:
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state,];

         case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE:
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist);

         case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER:
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist);

         case TODOLISTS_ACTIONS_TYPE.SET_TODOLISTS:
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));

         case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_ENTITY_STATUS:
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl);

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

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
   ({type: TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_ENTITY_STATUS, id, entityStatus} as const);


// thunks
export const getTodolistsTC = () =>
   (dispatch: Dispatch<ActionsTodolistsType>) => {
      dispatch(setAppStatusAC('loading'));

      todolistAPI.getTodolists()
         .then(res => {
            dispatch(setTodolistsAC(res.data));
            dispatch(setAppStatusAC('succeeded'));
         })
   }

export const removeTodolistTC = (id: string) =>
   (dispatch: Dispatch<ActionsTodolistsType>) => {
      dispatch(setAppStatusAC('loading'));
      dispatch(changeTodolistEntityStatusAC(id, 'loading'));

      todolistAPI.deleteTodolist(id)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(removeTodolistAC(id));
               dispatch(setAppStatusAC('succeeded'));
            } else {
               handleServerAppError(res.data, dispatch);
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch);
         })
   }

export const addTodolistTC = (title: string) =>
   (dispatch: Dispatch<ActionsTodolistsType>) => {
      dispatch(setAppStatusAC('loading'));

      todolistAPI.createTodolist(title)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(addTodolistAC(res.data.data.item));
            } else {
               handleServerAppError(res.data, dispatch);
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch);
         })
   }

export const changeTodolistTitleTC = (id: string, title: string) =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatusAC('loading'));

      todolistAPI.updateTodolist(id, title)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(changeTodolistTitleAC(id, title));
               dispatch(setAppStatusAC('succeeded'));
            } else {
               handleServerAppError(res.data, dispatch);
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch);
         })
   }


// types
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
   entityStatus: RequestStatusType
}

export type ActionsTodolistsType =
   | ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof addTodolistAC>
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeTodolistFilterAC>
   | ReturnType<typeof setTodolistsAC>
   | SetAppStatusActionType
   | SetAppErrorActionType
   | ReturnType<typeof changeTodolistEntityStatusAC>

