import {BaseResponseType, instance} from './api-settings';

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
      return instance.post<BaseResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title});
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
      model: UpdateApiTaskModelType
   ) {
      return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`,
         model);
   }
}


// types
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

export type UpdateApiTaskModelType = {
   title: string
   description: string
   status: number
   priority: number
   startDate: string
   deadline: string
}

type ResponseGetTasksType = {
   items: TaskType[],
   totalCount: number,
   error: string
}