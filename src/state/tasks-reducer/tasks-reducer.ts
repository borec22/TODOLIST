import {
   ADD_TODOLIST,
   addTodolistAC,
   REMOVE_TODOLIST,
   removeTodolistAC,
   SET_TODOLISTS,
   setTodolistsAC
} from '../todolist-reducer/todolists-reducer';
import {tasksAPI, TaskType} from '../../api/task-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../store';

const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASK';
const UPDATE_TASK = 'CHANGE-STATUS-TASK';
const SET_TASKS = 'SET-TASKS';

export type TasksType = {
   [key: string]: Array<TaskType>
}

export type ActionsTypeTasks =
   ReturnType<typeof removeTaskAC> |
   ReturnType<typeof addTaskAC> |
   ReturnType<typeof updateTaskAC> |
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof removeTodolistAC> |
   ReturnType<typeof setTodolistsAC> |
   ReturnType<typeof setTasksAC>;


const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: ActionsTypeTasks) => {
   switch (action.type) {
      case REMOVE_TASK:
         return {
            ...state,
            [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskID)
         }
      case ADD_TASK:
         return {
            ...state,
            [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
         }
      case UPDATE_TASK:
         return {
            ...state,
            [action.todoListID]: state[action.todoListID]
               .map(task => task.id === action.taskID ?
                  {...task, ...action.domainModel} :
                  task)
         }
      case ADD_TODOLIST:
         return {
            ...state,
            [action.todolist.id]: []
         }
      case REMOVE_TODOLIST:
         const {[action.id]: tasksOfRemoveTodolist, ...rest} = state;
         return {...rest};
      case SET_TODOLISTS: {
         let copyState = {...state};
         action.todolists.forEach(tl => {
            copyState[tl.id] = [];
         });
         return copyState;
      }
      case SET_TASKS: {
         const stateCopy = {...state}
         stateCopy[action.todolistId] = action.tasks
         return stateCopy
      }
      default:
         return state;
   }
}


export const removeTaskAC = (todoListID: string, taskID: string) => ({type: REMOVE_TASK, taskID, todoListID}) as const;

export const addTaskAC = (task: TaskType) => ({type: ADD_TASK, task}) as const;

export const updateTaskAC = (taskID: string, domainModel: UpdateDomainTaskModelType, todoListID: string) =>
   ({type: UPDATE_TASK, domainModel, taskID, todoListID}) as const;

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
   type: SET_TASKS,
   tasks,
   todolistId
}) as const;


export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
   tasksAPI.getTasks(todolistId)
      .then((res) => {
         dispatch(setTasksAC(res.data.items, todolistId));
      })
}

export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
   tasksAPI.createTask(todolistID, title)
      .then((res) => {
         dispatch(addTaskAC(res.data.data.item));
      })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
   tasksAPI.deleteTask(todolistId, taskId)
      .then(res => {
         if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(todolistId, taskId));
         }
      })
}

export type UpdateDomainTaskModelType = {
   title?: string
   description?: string
   status?: number
   priority?: number
   startDate?: string
   deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
   (dispatch: Dispatch, getState: () => AppRootStateType) => {

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


