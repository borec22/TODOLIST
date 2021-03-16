import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {authAPI, LoginParamsType} from '../../api/auth-api';

enum AUTH_ACTIONS_TYPE {
   SET_IS_LOGGED_IN = 'AUTH/SET-IS-LOGGED-IN',
}

const initialState = {
   isLoggedIn: false
}


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case AUTH_ACTIONS_TYPE.SET_IS_LOGGED_IN:
         return {...state, isLoggedIn: action.value}
      default:
         return state
   }
}


// actions
export const setIsLoggedInAC = (value: boolean) =>
   ({type: AUTH_ACTIONS_TYPE.SET_IS_LOGGED_IN, value} as const)


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
   dispatch(setAppStatusAC('loading'));

   authAPI.login(data)
      .then((res) => {
         if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'));
         } else {
            handleServerAppError(res.data, dispatch);
         }
      })
      .catch(error => {
         handleServerNetworkError(error, dispatch);
      })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
   dispatch(setAppStatusAC('loading'))
   authAPI.logout()
      .then(res => {
         if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
         } else {
            handleServerAppError(res.data, dispatch)
         }
      })
      .catch((error) => {
         handleServerNetworkError(error, dispatch)
      })
}


// types
export type InitialStateType = typeof initialState
type ActionsType =
   | ReturnType<typeof setIsLoggedInAC>
   | SetAppStatusActionType
   | SetAppErrorActionType