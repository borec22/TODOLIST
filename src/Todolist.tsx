import React, {useCallback} from 'react';

import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import {AppRootStateType, useDispatch} from './state/store';
import {addTaskAC} from './state/tasks-reducer/tasks-reducer';
import {
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   FilterValuesType,
   removeTodolistAC,
   TodolistDomainType
} from './state/todolist-reducer/todolists-reducer';
import {Task} from './Task';
import {TaskStatusesType, TaskType} from './api/task-api';

type PropsType = {
   id: string
}

export const Todolist = React.memo( (props: PropsType) => {
   console.log('Todolist called');

   let dispatch = useDispatch();

   let todolist = useSelector<AppRootStateType, TodolistDomainType>(state =>
      state.todolists.filter(todolist => todolist.id === props.id)[0]);

   let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);
   let filteredTasks = filterTasks(tasks, todolist.filter);

   const addTask = useCallback((title: string) => {
      dispatch(addTaskAC(title, todolist.id));
   }, []);

   const setAll = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'all')), []);
   const setActive = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'active')), []);
   const setCompleted = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'completed')), []);

   const changeTodolistTitleHandler = useCallback((title: string) =>
      dispatch(changeTodolistTitleAC(todolist.id, title)), []);

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
               filteredTasks.map(task => <Task key={task.id} task={task} todolistId={todolist.id}/>)
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
} );

const filterTasks = (tasks: Array<TaskType>, filter: FilterValuesType) => {
   if (filter === 'completed') {
      return tasks.filter(task => task.status = TaskStatusesType.Completed);
   } else if (filter === 'active') {
      return tasks.filter(task => task.status = TaskStatusesType.New);
   }
   return tasks;
}

