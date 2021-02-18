import {v1} from 'uuid';
import {addTaskAC, removeTaskAC, tasksReducer, TasksType, updateTaskAC} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatusesType, TaskType} from '../../api/task-api';
import {TodolistType} from '../../api/todolist-api';

let todoListId1: string;
let todoListId2: string;

let startState: TasksType;

beforeEach(() => {
   todoListId1 = v1();
   todoListId2 = v1();

   startState = {
      [todoListId1]: [
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
            todoListId: todoListId1
         },
         {
            id: '2',
            title: 'HTML',
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: todoListId1
         },
         {
            id: '3', title: 'JS', status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: todoListId1
         },
         {
            id: '4',
            title: 'REDUX',
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: todoListId1
         },
      ],
      [todoListId2]: [
         {id: '1',
            title: 'Spartacus',
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: todoListId2},
         {id: '2',
            title: 'Tom and Jerry',
            status: TaskStatusesType.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: todoListId2},
      ]
   }
})

test('task of correct todolist should be deleted', () => {
   let action = removeTaskAC(todoListId2, '2');
   let endState: TasksType = tasksReducer(startState, action);

   expect(endState[todoListId1].length).toBe(4);
   expect(endState[todoListId2].length).toBe(1);
   expect(endState[todoListId2].every(task => task.id !== action.taskID)).toBeTruthy();
   expect(endState[todoListId2][0].id).toBe('1');
   expect(endState[todoListId2][0].id).toBe('1');
   expect(endState[todoListId2][1]).toBeUndefined();
});

test('task of correct todolist should be added', () => {
   let task: TaskType = {
      id: '5',
      title: 'New Task',
      status: TaskStatusesType.New,
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      priority: TaskPriorities.Middle,
      startDate: '',
      todoListId: todoListId1
   }

   let action = addTaskAC(task);

   let endState: TasksType = tasksReducer(startState, action);

   expect(endState[todoListId1].length).toBe(5);
   expect(endState[todoListId2].length).toBe(2);

   expect(endState[todoListId1][0].title).toBe('New Task');
   expect(endState[todoListId1][0].status).toBe(TaskStatusesType.New);
});

test('task of correct todolist should be have another status', () => {
   let newStatus = TaskStatusesType.Completed;

   let action = updateTaskAC('1', {status: newStatus}, todoListId2);

   let endState: TasksType = tasksReducer(startState, action);

   expect(endState[todoListId1].length).toBe(4);
   expect(endState[todoListId2].length).toBe(2);

   expect(endState[todoListId2][0].status).toBe(newStatus);
});

test('task of correct todolist should be have another title', () => {
   let newTaskTitle = 'new task';



   let action = updateTaskAC('4', {title: newTaskTitle}, todoListId1);

   let endState: TasksType = tasksReducer(startState, action);

   expect(endState[todoListId1].length).toBe(4);
   expect(endState[todoListId2].length).toBe(2);

   expect(endState[todoListId1][3].title).toBe(newTaskTitle);
});

test('when add todolist we should have tasks for this todolist in TASKS', () => {
   const todolistReceivedFromServer: TodolistType = {
      "id": "60161c17-e72d-48e6-9336-4fed822d140b",
      "title": "POSTMAN",
      "addedDate": "2021-02-13T09:57:33.0335444Z",
      "order": -4
   }

   let action = addTodolistAC(todolistReceivedFromServer);

   let endState: TasksType = tasksReducer(startState, action);

   let keys = Object.keys(endState);
   let newKey = keys.find(key => key !== todoListId1 && key !== todoListId2);

   if (!newKey) {
      throw new Error('new key should be added');
   }

   expect(keys.length).toBe(3);
   expect(endState[newKey]).toStrictEqual([]);
});

test('when delete todolist we should have deleted tasks for this todolist in TASKS', () => {
   let action = removeTodolistAC(todoListId1);

   let endState: TasksType = tasksReducer(startState, action);

   let keys = Object.keys(endState);
   let newKey = keys.find(key => key === todoListId1);

   if (newKey) {
      throw new Error('key should be deleted');
   }

   expect(keys.length).toBe(1);
   expect(newKey).toBeUndefined();
});