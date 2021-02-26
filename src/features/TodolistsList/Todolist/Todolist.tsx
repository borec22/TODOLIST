import React, {useCallback, useEffect} from 'react';

import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, ButtonGroup, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {addTaskTC, getTasksTC, TaskDomainType} from '../tasks-reducer';
import {
   changeTodolistFilterAC,
   changeTodolistTitleTC,
   FilterValuesType,
   removeTodolistTC,
   TodolistDomainType
} from '../todolists-reducer';
import {Task} from './Task/Task';
import {TaskStatusesType} from '../../../api/task-api';

type PropsType = {
   id: string
   demo?: boolean
}

export const Todolist: React.FC<PropsType> = React.memo(({demo = false, ...props}) => {
   useEffect(() => {
      if (demo) {
         return;
      }
      dispatch(getTasksTC(props.id));
   }, []);

   let dispatch = useDispatch();

   let todolist = useSelector<AppRootStateType, TodolistDomainType>(state =>
      state.todolists.filter(todolist => todolist.id === props.id)[0]);

   let tasks = useSelector<AppRootStateType, Array<TaskDomainType>>(state => state.tasks[props.id]);
   let filteredTasks = filterTasks(tasks, todolist.filter);

   const addTask = useCallback((title: string) => {
      dispatch(addTaskTC(todolist.id, title));
   }, []);

   const setAll = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'all')), []);
   const setActive = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'active')), []);
   const setCompleted = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'completed')), []);

   const changeTodolistTitleHandler = useCallback((title: string) =>
      dispatch(changeTodolistTitleTC(todolist.id, title)), []);

   return (
      <div>
         <h3>
            <EditableSpan title={todolist.title}
                          onChange={changeTodolistTitleHandler}
                          disabled={todolist.entityStatus === 'loading'}
            />
            <IconButton onClick={() => {
               dispatch(removeTodolistTC(todolist.id));
            }} disabled={todolist.entityStatus === 'loading'}>
               <Delete/>
            </IconButton>
         </h3>

         <AddItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'}/>

         <ul style={{listStyleType: 'none', paddingLeft: '0'}}>
            {
               filteredTasks.map(task => <Task key={task.id}
                                               task={task}
                                               todolistId={todolist.id}
                                               disabled={todolist.entityStatus === 'loading'}/>)
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
});

const filterTasks = (tasks: Array<TaskDomainType>, filter: FilterValuesType) => {
   if (filter === 'completed') {
      return tasks.filter(task => task.status = TaskStatusesType.Completed);
   } else if (filter === 'active') {
      return tasks.filter(task => task.status = TaskStatusesType.New);
   }
   return tasks;
}

