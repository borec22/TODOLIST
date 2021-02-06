import axios from 'axios';

const settings = {
   withCredentials: true,
   headers: {
      'API-KEY': '89e8e364-2267-45f8-866b-f315992878e1'
   }
}

let instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   ...settings
});

export enum TaskPriorities {
   Low = 0,
   Middle = 1,
   Hi = 2,
   Urgently = 3,
   Later = 4
}

export enum TaskStatusesType {
   New = 0,
   InProgress = 1,
   Completed = 2,
   Draft = 3
}

export type TaskType = {
   description: string
   title: string
   status: TaskStatusesType
   priority: TaskPriorities
   startDate: string
   deadline: string
   id: string
   todoListId: string
   order: number
   addedDate: string
}

export type UpdateTaskModelType = {
   title: string
   description: string
   status: number
   priority: number
   startDate: string
   deadline: string
}

type BaseResponseType<D = {}> = {
   resultCode: number
   fieldsErrors: string[]
   messages: string[]
   data: {
      item: D
   }
}

type ResponseGetTasksType = {
   items: TaskType[],
   totalCount: number,
   error: string
}

export const tasksAPI = {
   getTasks(
      todolistId: string,
      count: number = 10,
      page: number = 1
   ) {
      return instance.get<ResponseGetTasksType>(`todo-lists/${todolistId}/tasks?count=${count}&page=${page}`);
   },
   createTask(
      todolistId: string,
      title: string
   ) {
      return instance.post<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title});
   },
   deleteTask(
      todolistId: string,
      taskId: string
   ) {
      return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
   },
   updateTask(
      todolistId: string,
      taskId: string,
      model: UpdateTaskModelType
   ) {
      return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`,
         model);
   }
}