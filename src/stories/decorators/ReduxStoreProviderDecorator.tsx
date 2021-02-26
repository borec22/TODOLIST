import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../../features/TodolistsList/todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatusesType} from '../../api/task-api';
import {appReducer, RequestStatusType} from '../../app/app-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: appReducer
});



const initialGlobalState: AppRootStateType = {
   todolists: [
      {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'},
      {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
   ],
   tasks: {
      ['todolistId1']: [
         {
            id: v1(),
            title: 'HTML&CSS',
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: 'todolistId1',
            entityStatus: 'idle'
         },
         {
            id: v1(),
            title: 'JS',
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: 'todolistId1',
            entityStatus: 'idle'
         }
      ],
      ['todolistId2']: [
         {
            id: v1(),
            title: 'Milk',
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: 'todolistId2',
            entityStatus: 'idle'
         },
         {
            id: v1(),
            title: 'React Book',
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: 'todolistId2',
            entityStatus: 'idle'
         }
      ]
   },
   app: {
      status: 'loading' as RequestStatusType,
      error: null as null | string,
      isInitialized: false
   },
   auth: {
      isLoggedIn: false
   }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
   return <Provider store={storyBookStore}>
      {storyFn()}
   </Provider>
}