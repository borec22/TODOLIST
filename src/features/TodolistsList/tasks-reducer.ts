import {
   addTodolistAC, removeTodolistAC, setTodolistsAC, TODOLISTS_ACTIONS_TYPE
} from './todolists-reducer';
import {tasksAPI, TaskType} from '../../api/task-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';


enum TASKS_ACTIONS_TYPE {
   REMOVE_TASK = 'TASKS/REMOVE-TASK',
   ADD_TASK = 'TASKS/ADD-TASK',
   UPDATE_TASK = 'TASKS/CHANGE-STATUS-TASK',
   SET_TASKS = 'TASKS/SET-TASKS',
}

const initialState: TasksType = {};


export const tasksReducer = (state: TasksType = initialState, action: ActionsTasksType) => {
   switch (action.type) {
      case TASKS_ACTIONS_TYPE.SET_TASKS:
         return {...state, [action.todolistId]: action.tasks}

      case TASKS_ACTIONS_TYPE.REMOVE_TASK:
         return {
            ...state,
            [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskID)
         }

      case TASKS_ACTIONS_TYPE.ADD_TASK:
         return {
            ...state,
            [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
         }

      case TASKS_ACTIONS_TYPE.UPDATE_TASK:
         return {
            ...state,
            [action.todoListID]: state[action.todoListID]
               .map(task => task.id === action.taskID ?
                  {...task, ...action.domainModel} :
                  task)
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
export const removeTaskAC = (todoListID: string, taskID: string) =>
   ({type: TASKS_ACTIONS_TYPE.REMOVE_TASK, taskID, todoListID}) as const;

export const addTaskAC = (task: TaskType) =>
   ({type: TASKS_ACTIONS_TYPE.ADD_TASK, task}) as const;

export const updateTaskAC = (taskID: string, domainModel: UpdateDomainTaskModelType, todoListID: string) =>
   ({type: TASKS_ACTIONS_TYPE.UPDATE_TASK, domainModel, taskID, todoListID}) as const;

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
   ({type: TASKS_ACTIONS_TYPE.SET_TASKS, tasks, todolistId}) as const;


// thunks
export const getTasksTC = (todolistId: string) =>
   (dispatch: Dispatch<ActionsTasksType>) => {
      tasksAPI.getTasks(todolistId)
         .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId));
         })
   }

export const addTaskTC = (todolistID: string, title: string) =>
   (dispatch: Dispatch<ActionsTasksType>) => {
      tasksAPI.createTask(todolistID, title)
         .then((res) => {
            dispatch(addTaskAC(res.data.data.item));
         })
   }

export const removeTaskTC = (todolistId: string, taskId: string) =>
   (dispatch: Dispatch<ActionsTasksType>) => {
      tasksAPI.deleteTask(todolistId, taskId)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(removeTaskAC(todolistId, taskId));
            }
         })
   }

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
   (dispatch: Dispatch<ActionsTasksType>, getState: () => AppRootStateType) => {

      const task = getState()
         .tasks[todolistId]
         .find(t => t.id === taskId);

      if (task) {
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
               }
            })
      }
   }


// types
export type TasksType = {
   [key: string]: Array<TaskType>
}

export type ActionsTasksType =
   ReturnType<typeof removeTaskAC> |
   ReturnType<typeof addTaskAC> |
   ReturnType<typeof updateTaskAC> |
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof removeTodolistAC> |
   ReturnType<typeof setTodolistsAC> |
   ReturnType<typeof setTasksAC>;

export type UpdateDomainTaskModelType = {
   title?: string
   description?: string
   status?: number
   priority?: number
   startDate?: string
   deadline?: string
}


