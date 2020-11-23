import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from './App';

export type TaskType = {
   id: string,
   title: string,
   isDone: boolean
}
type PropsType = {
   title: string,
   tasks: Array<TaskType>,
   removeTask: (idTask: string) => void
   addTask: (title: string) => void
   changeFilter: (filter: FilterType) => void
}

export function Todolist(props: PropsType) {
   const [newTitleTask, setNewTitleTask] = useState('');

   const onChangeTitleTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTitleTask(e.currentTarget.value);
   }
   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.ctrlKey && e.charCode === 13) {
         props.addTask(newTitleTask);
      }
   }
   const addTask = () => {
      props.addTask(newTitleTask);
      setNewTitleTask('');
   }
   const setAll = () =>  props.changeFilter('all');
   const setActive = () =>  props.changeFilter('active');
   const setCompleted = () =>  props.changeFilter('completed');

   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input value={newTitleTask}
                   onChange={onChangeTitleTaskHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
         </div>
         <ul>
            {
               props.tasks.map(task => {
                  const removeTask = () => props.removeTask(task.id);

                  return (
                     <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title} </span>
                        <button onClick={removeTask}>x</button>
                     </li>
                  );
               })
            }
         </ul>
         <div>
            <button onClick={setAll}>All</button>
            <button onClick={setActive}>Active</button>
            <button onClick={setCompleted}>Completed</button>
         </div>
      </div>
   );
}