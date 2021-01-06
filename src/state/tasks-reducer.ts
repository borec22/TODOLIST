import {TasksType} from '../App';
import {v1} from 'uuid';
import {ADD_TODOLIST, addTodolistAC, REMOVE_TODOLIST, removeTodolistAC} from './todolist-reducer/todolists-reducer';

const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASK';
const CHANGE_STATUS_TASK = 'CHANGE-STATUS-TASK';
const CHANGE_TITLE_TASK = 'CHANGE-TITLE-TASK';

export type actionsType =
   ReturnType<typeof removeTaskAC> |
   ReturnType<typeof addTaskAC> |
   ReturnType<typeof changeStatusTaskAC> |
   ReturnType<typeof changeTitleTaskAC> |
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof removeTodolistAC>;

export const tasksReducer = (state: TasksType, action: actionsType) => {
   switch (action.type) {
      case REMOVE_TASK:
         return {
            ...state,
            [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskID)
         }
      case ADD_TASK:
         const newTask = {id: v1(), title: action.title, isDone: false};

         return {
            ...state,
            [action.todoListID]: [newTask, ...state[action.todoListID]]
         }
      case CHANGE_STATUS_TASK:
         return {
            ...state,
            [action.todoListID]: state[action.todoListID]
               .map(task => task.id === action.taskID ?
                  {...task, isDone: action.isDone} :
                  task)
         }
      case CHANGE_TITLE_TASK:
         return {
            ...state,
            [action.todoListID]: state[action.todoListID]
               .map(task => task.id === action.taskID ?
                  {...task, title: action.title} :
                  task)
         }
      case ADD_TODOLIST:
         return {
            ...state,
            [action.id]: []
         }
      case REMOVE_TODOLIST:
         //delete state[action.id];
         const {[action.id]: tasksOfRemoveTodolist, ...rest} = state;
         return {...rest};
      default:
         throw new Error('I don`t understand action type');
   }
}

export const removeTaskAC = (taskID: string, todoListID: string) => ({type: REMOVE_TASK, taskID, todoListID}) as const;
export const addTaskAC = (title: string, todoListID: string) => ({type: ADD_TASK, title, todoListID}) as const;
export const changeStatusTaskAC = (taskID: string, isDone: boolean, todoListID: string) =>
   ({type: CHANGE_STATUS_TASK, taskID, isDone, todoListID}) as const;
export const changeTitleTaskAC = (taskID: string, title: string, todoListID: string) =>
   ({type: CHANGE_TITLE_TASK, taskID, title, todoListID}) as const;