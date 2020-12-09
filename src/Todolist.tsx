import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from './App';

export type TaskType = {
   id: string,
   title: string,
   isDone: boolean
}
type PropsType = {
   id: string
   title: string,
   tasks: Array<TaskType>,
   removeTask: (idTask: string, todolistId: string) => void
   addTask: (title: string, todolistId: string) => void
   changeFilter: (filter: FilterType, todolistId: string) => void
   statusTask: (id: string, isDone: boolean, todolistId: string) => void
   filter: FilterType
   removeTodoList: (id: string) => void
}

export function Todolist(props: PropsType) {
   const [newTitleTask, setNewTitleTask] = useState('');
   const [error, setError] = useState<string | null>(null);

   const onChangeTitleTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTitleTask(e.currentTarget.value);
   }
   const addTask = () => {
      if (newTitleTask.trim() == '') {
         setError('Field is required');
         return;
      }

      props.addTask(newTitleTask, props.id);
      setNewTitleTask('');
   }
   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.ctrlKey && e.key === 'Enter') {
         addTask();
      }
   }
   const setAll = () =>  props.changeFilter('all', props.id);
   const setActive = () =>  props.changeFilter('active', props.id);
   const setCompleted = () =>  props.changeFilter('completed', props.id);

   return (
      <div>
         <h3>{props.title} <button onClick={() => { props.removeTodoList(props.id) }}>X</button></h3>
         <div>
            <input value={newTitleTask}
                   onChange={onChangeTitleTaskHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
         </div>
         <ul>
            {
               props.tasks.map(task => {
                  const removeTask = () => props.removeTask(task.id, props.id);
                  const changeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => props.statusTask(task.id, e.currentTarget.checked, props.id);

                  return (
                     <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={task.isDone} onChange={changeStatusTaskHandler}/>
                        <span>{task.title} </span>
                        <button onClick={removeTask}>x</button>
                     </li>
                  );
               })
            }
         </ul>
         <div>
            <button onClick={setAll} className={props.filter === 'all' ? 'active-filter' : ''}>All</button>
            <button onClick={setActive} className={props.filter === 'active' ? 'active-filter' : ''}>Active</button>
            <button onClick={setCompleted} className={props.filter === 'completed' ? 'active-filter' : ''}>Completed</button>
         </div>
      </div>
   );
}