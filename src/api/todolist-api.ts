import {BaseResponseType, instance} from './api-settings';


export const todolistAPI = {
   updateTodolist(id: string, title: string) {
      return instance.put<BaseResponseType>(`todo-lists/${id}`, {title});
   },
   deleteTodolist(id: string) {
      return instance.delete<BaseResponseType>(`todo-lists/${id}`);
   },
   createTodolist(title: string) {
      return instance.post<BaseResponseType<{item: TodolistType}>>('todo-lists', {title})
   },
   getTodolists() {
      return instance.get<Array<TodolistType>>('todo-lists')
   }
}


// types
export type TodolistType = {
   id: string,
   title: string,
   addedDate: string,
   order: number
}
