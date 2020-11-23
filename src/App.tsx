import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed';

function App() {
   const [tasks, setTasks] = useState<Array<TaskType>>([
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'REACT', isDone: false},
      {id: v1(), title: 'REDUX', isDone: false},
   ]);
   const [filter, setFilter] = useState<FilterType>('all');

   const removeTask = (taskId: string) => {
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      setTasks(filteredTasks);
   }
   const addTask = (title: string) => {
      const newTask = { id: v1(), title: title, isDone: false };
      const newTasks = [newTask, ...tasks];
      setTasks(newTasks);
   }
   const changeFilter = (filter: FilterType) => {
      setFilter(filter);
   }

   let tasksTodoList = tasks;

   if (filter === 'completed') {
      tasksTodoList = tasksTodoList.filter( task => task.isDone);
   } else if (filter === 'active') {
      tasksTodoList = tasksTodoList.filter( task => !task.isDone);
   }

   return (
      <div className="App">
         <Todolist
            title='What to learn?'
            tasks={tasksTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}/>
      </div>
   );
}

export default App;
