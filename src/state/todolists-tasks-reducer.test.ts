import {
   addTodolistAC,
   removeTodolistAC,
   setTodolistsAC,
   TodolistDomainType,
   todolistsReducer
} from './todolist-reducer/todolists-reducer';
import {tasksReducer, TasksType} from './tasks-reducer/tasks-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatusesType} from '../api/task-api';
import {TodolistType} from '../api/todolist-api';

test('ids should be equals', () => {
   const startTasksState: TasksType = {};
   const startTodolistsState: Array<TodolistDomainType> = [];

   const todolistReceivedFromServer: TodolistType = {
      "id": "60161c17-e72d-48e6-9336-4fed822d140b",
      "title": "POSTMAN",
      "addedDate": "2021-02-13T09:57:33.0335444Z",
      "order": -4
   }

   const action = addTodolistAC(todolistReceivedFromServer);

   const endTasksState = tasksReducer(startTasksState, action)
   const endTodolistsState = todolistsReducer(startTodolistsState, action)

   const keys = Object.keys(endTasksState);
   const idFromTasks = keys[0];
   const idFromTodolists = endTodolistsState[0].id;

   expect(idFromTasks).toBe(todolistReceivedFromServer.id);
   expect(idFromTodolists).toBe(todolistReceivedFromServer.id);
});


test('property with todolistId should be deleted', () => {
   const startState: TasksType = {
      'todolistId1': [
         {
            id: '1',
            title: 'CSS',
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: 'todoListId1'
         },
         {
            id: '2',
            title: 'JS',
            status: TaskStatusesType.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: 'todoListId1'
         },
         {
            id: '3',
            title: 'React',
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: 'todoListId1'
         }
      ],
      'todolistId2': [
         {
            id: '1',
            title: 'bread',
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: 'todoListId2'
         },
         {
            id: '2',
            title: 'milk',
            status: TaskStatusesType.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: 'todoListId2'
         },
         {
            id: '3',
            title: 'tea',
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: 'todoListId2'
         }
      ]
   };

   const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))


   const keys = Object.keys(endState);

   expect(keys.length).toBe(1);
   expect(endState['todolistId2']).not.toBeDefined();
});

test('when todolist have been received from server', () => {
   const todolistId1 = v1();
   const todolistId2 = v1();

   const startState: TasksType = {};

   let todolistReceivedFromServer: Array<TodolistDomainType> = [
      {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
      {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
   ];

   const endState = tasksReducer(startState, setTodolistsAC(todolistReceivedFromServer))

   expect(Object.keys(endState).length).toBe(2);
   expect(endState[todolistId1]).toStrictEqual([]);
   expect(endState[todolistId2]).toStrictEqual([]);
});

