import {authReducer, InitialStateType, setIsLoggedInAC} from './auth-reducer';

let startState: InitialStateType;

beforeEach(() => {
   startState = {
      isLoggedIn: false
   }
})

test('isLoggedIn must be changed on true', () => {
   let endState: InitialStateType = authReducer(startState, setIsLoggedInAC(true));

   expect(endState.isLoggedIn).toBeTruthy();
});

