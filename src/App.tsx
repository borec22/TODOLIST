import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

declare global {
   interface Window {
      tasks: Array<TaskType>
   }
}

type TodolistType = {
   id: string
   title: string
   filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed';
type TasksType = {
   [key: string]: Array<TaskType>
}

const filterTasks = (tasks: Array<TaskType>, filter: FilterType) => {
   if (filter === 'completed') {
      return tasks.filter(task => task.isDone);
   } else if (filter === 'active') {
      return tasks.filter(task => !task.isDone);
   }
   return tasks;
}

function App() {
   let todoListId1 = v1();
   let todoListId2 = v1();

   let [todolists, setTodolists] = useState<Array<TodolistType>>([
      {id: todoListId1, title: 'What to lear?', filter: 'all'},
      {id: todoListId2, title: 'What to watch?', filter: 'all'},
   ]);

   let [tasks, setTasks] = useState<TasksType>({
      [todoListId1]: [
         {id: v1(), title: 'CSS', isDone: true},
         {id: v1(), title: 'HTML', isDone: true},
         {id: v1(), title: 'JS', isDone: false},
         {id: v1(), title: 'REDUX', isDone: false},
      ],
      [todoListId2]: [
         {id: v1(), title: 'Spartacus', isDone: false},
         {id: v1(), title: 'Tom and Jerry', isDone: false},
      ]
   });

   // window.tasks = tasks;

   const removeTodoList = (id: string) => {
      setTodolists(todolists.filter(tl => tl.id !== id));

      delete tasks[id];

      setTasks({...tasks});
   }
   const addTodolist = (title: string) => {
      let todolist: TodolistType = {
         id: v1(),
         title,
         filter: 'all'
      }
      setTodolists([todolist, ...todolists]);
      setTasks({
         ...tasks,
         [todolist.id]: []
      });
   }
   const changeTodolistTitle = (title: string, todolistId: string) => setTodolists(
      todolists.map(t => t.id === todolistId ? {...t, title} : t)
   );


   const removeTask = (taskId: string, todoListID: string) => {
      setTasks({
         ...tasks,
         [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)
      });
   };
   const addTask = (title: string, todoListID: string) => {
      const newTask = {id: v1(), title: title, isDone: false};
      setTasks({
         ...tasks,
         [todoListID]: [newTask, ...tasks[todoListID]]
      });
   }
   const changeStatusTask = (id: string, isDone: boolean, todoListID: string) => {
      setTasks({
         ...tasks,
         [todoListID]: tasks[todoListID].map(task => task.id === id ? {...task, isDone} : task)
      });
   }
   const changeTitleTask = (id: string, title: string, todoListID: string) => {
      setTasks({
         ...tasks,
         [todoListID]: tasks[todoListID].map(task => task.id === id ? {...task, title} : task)
      });
   }
   const changeFilter = (filter: FilterType, todoListID: string) => {
      setTodolists(todolists.map(tl => tl.id === todoListID ? {...tl, filter} : tl));
   };

   return (
      <div className="App">
         <AddItemForm addItem={addTodolist}/>
         {todolists.map(t => {
            const filteredTasks = filterTasks(tasks[t.id], t.filter);
            return (
               <Todolist
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  tasks={filteredTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeStatusTask={changeStatusTask}
                  changeTitleTask={changeTitleTask}
                  filter={t.filter}
                  removeTodoList={removeTodoList}
                  changeTodolistTitle={changeTodolistTitle}
               />
            );
         })}

      </div>
   );
}

export default App;
