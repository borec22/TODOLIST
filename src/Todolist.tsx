import React from 'react';
import {FilterType} from './App';

export type TaskType = {
   id: number,
   title: string,
   isDone: boolean
}

type PropsType = {
   title: string,
   tasks: Array<TaskType>,
   onRemoveTask: (idTask: number) => void
   onChangeFilter: (filter: FilterType) => void
}

export function Todolist(props: PropsType) {

   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input/>
            <button>+</button>
         </div>
         <ul>
            {
               props.tasks.map(task =>
                  <li key={task.id}>
                     <input type="checkbox" checked={task.isDone}/>
                     <span>{task.title} </span>
                     <button onClick={() => {
                        props.onRemoveTask(task.id);
                     }}>
                        x
                     </button>
                  </li>)
            }
         </ul>
         <div>
            <button onClick={ () => { props.onChangeFilter('all') } }>All</button>
            <button onClick={ () => { props.onChangeFilter('active') } }>Active</button>
            <button onClick={ () => { props.onChangeFilter('completed') } }>Completed</button>
         </div>
      </div>
   );
}