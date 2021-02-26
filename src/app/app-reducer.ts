import {Dispatch} from 'redux';
import {authAPI} from '../api/auth-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

enum APP_ACTIONS_TYPE {
   SET_STATUS = 'APP/SET-STATUS',
   SET_ERROR = 'APP/SET-ERROR',
   SET_IS_INITIALIZED = 'APP/SET_IS_INITIALIZED',
}

const initialState = {
   status: 'idle' as RequestStatusType,
   error: null as string | null,
   isInitialized: false
}

export type InitialStateType = typeof initialState


export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType): InitialStateType => {
   switch (action.type) {
      case APP_ACTIONS_TYPE.SET_STATUS:

         return {...state, status: action.status}

      case APP_ACTIONS_TYPE.SET_ERROR: {
         return {...state, error: action.error}
      }

      case APP_ACTIONS_TYPE.SET_IS_INITIALIZED: {
         return {...state, isInitialized: action.isInitialized}
      }

      default:
         return state
   }
}


// actions
export const setAppStatusAC = (status: RequestStatusType) =>
   ({type: APP_ACTIONS_TYPE.SET_STATUS, status} as const);

export const setAppErrorAC = (error: null | string) =>
   ({type: APP_ACTIONS_TYPE.SET_ERROR, error} as const);

export const setIsInitialized = (isInitialized: boolean) =>
   ({type: APP_ACTIONS_TYPE.SET_IS_INITIALIZED, isInitialized} as const);


// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
   authAPI.me().then(res => {
      if (res.data.resultCode === 0) {
         dispatch(setIsLoggedInAC(true));
      } else {
         handleServerAppError(res.data, dispatch)
      }
      dispatch(setIsInitialized(true));
   })
      .catch((error) => {
         handleServerNetworkError(error, dispatch)
      })
}


// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;

type ActionsAppType =
   | SetAppStatusActionType
   | SetAppErrorActionType
   | ReturnType<typeof setIsInitialized>