import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterType = 'all' | 'active' | 'completed';

function App() {
   const [tasks, setTasks] = useState<Array<TaskType>>([
      {id: 1, title: 'CSS', isDone: true},
      {id: 2, title: 'HTML', isDone: true},
      {id: 3, title: 'REACT', isDone: false},
      {id: 4, title: 'REDUX', isDone: false},
   ]);
   const [filter, setFilter] = useState<FilterType>('all');

   const handleRemoveTask = (taskId: number) => {
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      setTasks(filteredTasks);
   }
   const handleChangeFilter = (filter: FilterType) => {
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
            onRemoveTask={handleRemoveTask}
            onChangeFilter={handleChangeFilter}/>
      </div>
   );
}

export default App;
