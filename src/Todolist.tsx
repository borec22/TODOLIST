import React, {ChangeEvent} from 'react';

import {FilterValuesType, TodolistType} from './AppRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import {AppRootStateType, useDispatch} from './state/store';
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from './state/tasks-reducer/tasks-reducer';
import {
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   removeTodolistAC
} from './state/todolist-reducer/todolists-reducer';

export type TaskType = {
   id: string,
   title: string,
   isDone: boolean
}

type PropsType = {
   id: string
}

export function Todolist(props: PropsType) {
   let dispatch = useDispatch();

   let todolist = useSelector<AppRootStateType, TodolistType>(state =>
      state.todolists.filter(todolist => todolist.id === props.id)[0]);

   let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);
   let filteredTasks = filterTasks(tasks, todolist.filter);

   const addTask = (title: string) => {
      dispatch(addTaskAC(title, todolist.id));
   }

   const setAll = () => dispatch(changeTodolistFilterAC(todolist.id, 'all'));
   const setActive = () => dispatch(changeTodolistFilterAC(todolist.id, 'active'));
   const setCompleted = () => dispatch(changeTodolistFilterAC(todolist.id, 'completed'));

   const changeTodolistTitleHandler = (title: string) => dispatch(changeTodolistTitleAC(todolist.id, title));

   return (
      <div>
         <h3><EditableSpan title={todolist.title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={() => {
               dispatch(removeTodolistAC(todolist.id));
            }}>
               <Delete/>
            </IconButton>
         </h3>
         <AddItemForm addItem={addTask}/>
         <ul style={{listStyleType: 'none', paddingLeft: '0'}}>

            {
               filteredTasks.map(task => {
                  const removeTask = () => dispatch(removeTaskAC(task.id, todolist.id));
                  const changeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeStatusTaskAC(task.id, e.currentTarget.checked, todolist.id));
                  const changeTitleTaskHandler = (title: string) => dispatch(changeTitleTaskAC(task.id, title, todolist.id));

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
               <Button variant={todolist.filter === 'all' ? 'contained' : 'text'}
                       color='default'
                       onClick={setAll}
                       className={todolist.filter === 'all' ? 'active-filter' : ''}>All</Button>
               <Button variant={todolist.filter === 'active' ? 'contained' : 'text'}
                       color='primary'
                       onClick={setActive}
                       className={todolist.filter === 'active' ? 'active-filter' : ''}>Active</Button>
               <Button variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                       color='secondary'
                       onClick={setCompleted}
                       className={todolist.filter === 'completed' ? 'active-filter' : ''}>Completed
               </Button>
            </ButtonGroup>
         </div>
      </div>
   );
}

const filterTasks = (tasks: Array<TaskType>, filter: FilterValuesType) => {
   if (filter === 'completed') {
      return tasks.filter(task => task.isDone);
   } else if (filter === 'active') {
      return tasks.filter(task => !task.isDone);
   }
   return tasks;
}

