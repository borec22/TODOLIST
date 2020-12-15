import React, {ChangeEvent} from 'react';
import {FilterType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
   changeStatusTask: (id: string, isDone: boolean, todolistId: string) => void
   changeTitleTask: (id: string, title: string, todolistId: string) => void
   filter: FilterType
   removeTodoList: (id: string) => void
   changeTodolistTitle: (title: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {

   const addTask = (title: string) => {
      props.addTask(title, props.id);
   }

   const setAll = () => props.changeFilter('all', props.id);
   const setActive = () => props.changeFilter('active', props.id);
   const setCompleted = () => props.changeFilter('completed', props.id);

   const changeTodolistTitleHandler = (title: string) => props.changeTodolistTitle(title, props.id);

   return (
      <div>
         <h3><EditableSpan title={props.title} onChange={changeTodolistTitleHandler} />
            <button onClick={() => {
               props.removeTodoList(props.id)
            }}>X
            </button>
         </h3>
         <AddItemForm addItem={addTask}/>
         <ul>
            {
               props.tasks.map(task => {
                  const removeTask = () => props.removeTask(task.id, props.id);
                  const changeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatusTask(task.id, e.currentTarget.checked, props.id);
                  const changeTitleTaskHandler = (title: string) => props.changeTitleTask(task.id, title, props.id);

                  return (
                     <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={task.isDone} onChange={changeStatusTaskHandler}/>
                        <EditableSpan title={task.title} onChange={changeTitleTaskHandler}/>
                        <button onClick={removeTask}>x</button>
                     </li>
                  );
               })
            }
         </ul>
         <div>
            <button onClick={setAll} className={props.filter === 'all' ? 'active-filter' : ''}>All</button>
            <button onClick={setActive} className={props.filter === 'active' ? 'active-filter' : ''}>Active</button>
            <button onClick={setCompleted} className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
            </button>
         </div>
      </div>
   );
}

