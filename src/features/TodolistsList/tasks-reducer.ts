import {addTodolistAC, removeTodolistAC, setTodolistsAC, TODOLISTS_ACTIONS_TYPE} from './todolists-reducer';
import {tasksAPI, TaskType} from '../../api/task-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


enum TASKS_ACTIONS_TYPE {
   REMOVE_TASK = 'TASKS/REMOVE-TASK',
   ADD_TASK = 'TASKS/ADD-TASK',
   UPDATE_TASK = 'TASKS/CHANGE-STATUS-TASK',
   SET_TASKS = 'TASKS/SET-TASKS',
   CHANGE_TASK_ENTITY_STATUS = 'APP/CHANGE-TASK-ENTITY-STATUS',
}

const initialState: TasksType = {};


export const tasksReducer = (state: TasksType = initialState, action: ActionsTasksType): TasksType => {
   switch (action.type) {
      case TASKS_ACTIONS_TYPE.SET_TASKS:
         return {...state, [action.todolistId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))}

      case TASKS_ACTIONS_TYPE.REMOVE_TASK:
         return {
            ...state,
            [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskID)
         }

      case TASKS_ACTIONS_TYPE.ADD_TASK:
         return {
            ...state,
            [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]
         }

      case TASKS_ACTIONS_TYPE.UPDATE_TASK:
         return {
            ...state,
            [action.todoListID]: state[action.todoListID]
               .map(task => task.id === action.taskID ?
                  {...task, ...action.domainModel} :
                  task)
         }

      case TASKS_ACTIONS_TYPE.CHANGE_TASK_ENTITY_STATUS:
         return {
            ...state,
            [action.todolistId]: state[action.todolistId]
               .map(t => t.id === action.id ? {...t, entityStatus: action.status} : t)
         }

      case TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST:
         return {...state, [action.todolist.id]: []}

      case TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST:
         const {[action.id]: tasksOfRemoveTodolist, ...rest} = state;
         return {...rest};

      case TODOLISTS_ACTIONS_TYPE.SET_TODOLISTS: {
         let copyState = {...state};

         action.todolists.forEach(tl => {
            copyState[tl.id] = [];
         });

         return copyState;
      }

      default:
         return state;
   }
}


// actions
export const addTaskAC = (task: TaskType) =>
   ({type: TASKS_ACTIONS_TYPE.ADD_TASK, task}) as const;

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
   ({type: TASKS_ACTIONS_TYPE.SET_TASKS, tasks, todolistId}) as const;

export const updateTaskAC = (taskID: string, domainModel: UpdateDomainTaskModelType, todoListID: string) =>
   ({type: TASKS_ACTIONS_TYPE.UPDATE_TASK, domainModel, taskID, todoListID}) as const;

export const removeTaskAC = (todoListID: string, taskID: string) =>
   ({type: TASKS_ACTIONS_TYPE.REMOVE_TASK, taskID, todoListID}) as const;

export const changeTaskEntityStatusAC = (id: string, status: RequestStatusType, todolistId: string) =>
   ({type: TASKS_ACTIONS_TYPE.CHANGE_TASK_ENTITY_STATUS, id, status, todolistId} as const);


// thunks
export const getTasksTC = (todolistId: string) =>
   (dispatch: Dispatch<ActionsTasksType>) => {
      dispatch(setAppStatusAC('loading'));

      tasksAPI.getTasks(todolistId)
         .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId));
            dispatch(setAppStatusAC('succeeded'));
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch);
         })
   }

export const addTaskTC = (todolistID: string, title: string) =>
   (dispatch: Dispatch<ActionsTasksType>) => {
      dispatch(setAppStatusAC('loading'));

      tasksAPI.createTask(todolistID, title)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(addTaskAC(res.data.data.item));
               dispatch(setAppStatusAC('succeeded'));
            } else {
               handleServerAppError(res.data, dispatch);
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch);
         })
   }

export const removeTaskTC = (todolistId: string, taskId: string) =>
   (dispatch: Dispatch<ActionsTasksType>) => {
      dispatch(setAppStatusAC('loading'));
      dispatch(changeTaskEntityStatusAC(taskId, 'loading', todolistId));

      tasksAPI.deleteTask(todolistId, taskId)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(removeTaskAC(todolistId, taskId));
               dispatch(setAppStatusAC('succeeded'));
            } else {
               handleServerAppError(res.data, dispatch);
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch);
         })
   }

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
   (dispatch: Dispatch<ActionsTasksType>, getState: () => AppRootStateType) => {

      const task = getState()
         .tasks[todolistId]
         .find(t => t.id === taskId);

      if (task) {
         dispatch(setAppStatusAC('loading'));
         dispatch(changeTaskEntityStatusAC(taskId, 'loading', todolistId));

         tasksAPI.updateTask(todolistId, taskId, {
            title: task.title,
            status: task.status,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            ...domainModel
         })
            .then(res => {
               if (res.data.resultCode === 0) {
                  dispatch(updateTaskAC(taskId, domainModel, todolistId));
                  dispatch(setAppStatusAC('succeeded'));
                  dispatch(changeTaskEntityStatusAC(taskId, 'idle', todolistId));
               } else {
                  handleServerAppError(res.data, dispatch);
               }
            })
            .catch(error => {
               handleServerNetworkError(error, dispatch);
            })
      }
   }


// types
export type TaskDomainType = TaskType & {
   entityStatus: RequestStatusType
}

export type TasksType = {
   [key: string]: Array<TaskDomainType>
}

export type ActionsTasksType =
   | ReturnType<typeof removeTaskAC>
   | ReturnType<typeof addTaskAC>
   | ReturnType<typeof updateTaskAC>
   | ReturnType<typeof addTodolistAC>
   | ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof setTodolistsAC>
   | ReturnType<typeof setTasksAC>
   | ReturnType<typeof changeTaskEntityStatusAC>
   | SetAppStatusActionType
   | SetAppErrorActionType;

export type UpdateDomainTaskModelType = {
   title?: string
   description?: string
   status?: number
   priority?: number
   startDate?: string
   deadline?: string
}


