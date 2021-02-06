import {v1} from 'uuid';
import {ADD_TODOLIST, addTodolistAC, REMOVE_TODOLIST, removeTodolistAC} from '../todolist-reducer/todolists-reducer';
import {TaskPriorities, TaskStatusesType, TaskType} from '../../api/task-api';

const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASK';
const CHANGE_STATUS_TASK = 'CHANGE-STATUS-TASK';
const CHANGE_TITLE_TASK = 'CHANGE-TITLE-TASK';

export type TasksType = {
   [key: string]: Array<TaskType>
}

export type ActionsTypeTasks =
   ReturnType<typeof removeTaskAC> |
   ReturnType<typeof addTaskAC> |
   ReturnType<typeof changeStatusTaskAC> |
   ReturnType<typeof changeTitleTaskAC> |
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof removeTodolistAC>;

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: ActionsTypeTasks) => {
   switch (action.type) {
      case REMOVE_TASK:
         return {
            ...state,
            [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskID)
         }
      case ADD_TASK:
         const newTask: TaskType = {
            id: v1(),
            title: action.title,
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: action.todoListID
         };

         return {
            ...state,
            [action.todoListID]: [newTask, ...state[action.todoListID]]
         }
      case CHANGE_STATUS_TASK:
         return {
            ...state,
            [action.todoListID]: state[action.todoListID]
               .map(task => task.id === action.taskID ?
                  {...task, status: action.status} :
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
         return state;
   }
}

export const removeTaskAC = (taskID: string, todoListID: string) => ({type: REMOVE_TASK, taskID, todoListID}) as const;
export const addTaskAC = (title: string, todoListID: string) => ({type: ADD_TASK, title, todoListID}) as const;
export const changeStatusTaskAC = (taskID: string, status: TaskStatusesType, todoListID: string) =>
   ({type: CHANGE_STATUS_TASK, taskID, status, todoListID}) as const;
export const changeTitleTaskAC = (taskID: string, title: string, todoListID: string) =>
   ({type: CHANGE_TITLE_TASK, taskID, title, todoListID}) as const;