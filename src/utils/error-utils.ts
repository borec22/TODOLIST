import { Dispatch } from 'redux';
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../app/app-reducer';
import {BaseResponseType} from '../api/api-settings';


// generic function
export const handleServerAppError = <T>(data: BaseResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
   if (data.messages.length) {
      dispatch(setAppErrorAC(data.messages[0]))
   } else {
      dispatch(setAppErrorAC('Some error occurred'))
   }
   dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
   dispatch(setAppErrorAC(error.message))
   dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>