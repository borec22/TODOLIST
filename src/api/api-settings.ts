import axios from 'axios';

export const settings = {
   withCredentials: true,
   headers: {
      'API-KEY': '89e8e364-2267-45f8-866b-f315992878e1'
   }
}

export let instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   ...settings
})


// types
export type BaseResponseType<D = {}> = {
   resultCode: number
   messages: string[],
   fieldsErrors: string[]
   data: D
}