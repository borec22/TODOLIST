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
})

type BaseResponseType<D = {}> = {
   resultCode: number
   messages: string[],
   fieldsErrors: string[]
   data: D
}

export type TodolistType = {
   id: string,
   title: string,
   addedDate: string,
   order: number
}

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
