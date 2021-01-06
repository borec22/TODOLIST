import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton} from '@material-ui/core';
import {CheckBox, Delete} from '@material-ui/icons';

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
   changeFilter: (filter: FilterValuesType, todolistId: string) => void
   changeStatusTask: (id: string, isDone: boolean, todolistId: string) => void
   changeTitleTask: (id: string, title: string, todolistId: string) => void
   filter: FilterValuesType
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
         <h3><EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={() => {
               props.removeTodoList(props.id)
            }}>
               <Delete/>
            </IconButton>
         </h3>
         <AddItemForm addItem={addTask}/>
         <ul style={{listStyleType: 'none', paddingLeft: '0px'}}>
            {
               props.tasks.map(task => {
                  const removeTask = () => props.removeTask(task.id, props.id);
                  const changeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatusTask(task.id, e.currentTarget.checked, props.id);
                  const changeTitleTaskHandler = (title: string) => props.changeTitleTask(task.id, title, props.id);

                  return (
                     <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <Checkbox checked={task.isDone}
                                  color="primary"
                                  onChange={changeStatusTaskHandler}/>
                        <EditableSpan title={task.title} onChange={changeTitleTaskHandler}/>
                        <IconButton onClick={removeTask}>
                           <Delete/>
                        </IconButton>
                     </li>
                  );
               })
            }
         </ul>
         <div>
            <ButtonGroup>
               <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                       color='default'
                       onClick={setAll}
                       className={props.filter === 'all' ? 'active-filter' : ''}>All</Button>
               <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                  color='primary'
                       onClick={setActive}
                       className={props.filter === 'active' ? 'active-filter' : ''}>Active</Button>
               <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                       color='secondary'
                       onClick={setCompleted}
                       className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
               </Button>
            </ButtonGroup>
         </div>
      </div>
   );
}

