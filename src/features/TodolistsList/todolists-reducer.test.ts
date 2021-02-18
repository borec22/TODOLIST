import {
   addTodolistAC,
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   FilterValuesType,
   removeTodolistAC, setTodolistsAC,
   TodolistDomainType,
   todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from '../../api/todolist-api';


let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistDomainType>;

beforeEach(() => {
   todolistId1 = v1();
   todolistId2 = v1();

   startState = [
      {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
      {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
   ]
})

test('correct todolist should be removed', () => {
   const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

   expect(endState.length).toBe(1)
   expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
   const todolistReceivedFromServer: TodolistType = {
      "id": "60161c17-e72d-48e6-9336-4fed822d140b",
      "title": "POSTMAN",
      "addedDate": "2021-02-13T09:57:33.0335444Z",
      "order": -4
   }

   const endState = todolistsReducer(startState, addTodolistAC(todolistReceivedFromServer))

   expect(endState.length).toBe(3);
   expect(endState[0].title).toBe(todolistReceivedFromServer.title);
});

test('correct todolist should change its name', () => {
   let newTodolistTitle = 'Todolist title'

   const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

   expect(endState[0].title).toBe("What to learn");
   expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
   let newFilter: FilterValuesType = "completed";

   const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

   expect(endState[0].filter).toBe("all");
   expect(endState[1].filter).toBe(newFilter);
});

test('added todolist from server', () => {
   let startState: Array<TodolistDomainType> = [];

   let todolistFromServer: Array<TodolistDomainType> = [
      {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
      {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
   ];

   const endState = todolistsReducer(startState, setTodolistsAC(todolistFromServer));

   expect(endState.length).toBe(2);
});



