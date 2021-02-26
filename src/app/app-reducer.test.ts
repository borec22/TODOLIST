import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC, setIsInitialized} from './app-reducer';

let startState: InitialStateType;

beforeEach(() => {
   startState = {
      status: 'idle',
      error: null,
      isInitialized: false
   }
})

test('status must be changed', () => {
   let endState: InitialStateType = appReducer(startState, setAppStatusAC('loading'));

   expect(endState.status).toBe('loading');
});

test('error must be set', () => {
   const errorText = 'You are not authorized';
   let endState: InitialStateType = appReducer(startState, setAppErrorAC(errorText));

   expect(endState.error).toBe(errorText);
});

test('isInitialized must be changed on true', () => {
   let endState: InitialStateType = appReducer(startState, setIsInitialized(true));

   expect(endState.isInitialized).toBeTruthy();
});

