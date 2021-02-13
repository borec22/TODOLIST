import React, {ChangeEvent, useCallback} from 'react';
import {removeTaskTC, updateTaskTC} from './state/tasks-reducer/tasks-reducer';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatusesType, TaskType} from './api/task-api';
import {useDispatch} from 'react-redux';

export type TaskProsType = {
   task: TaskType
   todolistId: string
}
export const Task: React.FC<TaskProsType> = React.memo((props) => {
   const {task, todolistId} = props;

   const dispatch = useDispatch();

   const removeTask = () => {
      dispatch(removeTaskTC(todolistId, task.id))
   };

   const changeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
         updateTaskTC(
            todolistId,
            task.id,
            {
               status: e.currentTarget.checked ? TaskStatusesType.Completed : TaskStatusesType.New
            }
         )
      )
   }

   const changeTitleTaskHandler = useCallback((title: string) => {
      dispatch(updateTaskTC(todolistId, task.id, {title}));
   }, []);

   return (
      <li key={task.id} className={task.status === TaskStatusesType.Completed ? 'is-done' : ''}>
         <Checkbox checked={task.status === TaskStatusesType.Completed}
                   color="primary"
                   onChange={changeStatusTaskHandler}/>

         <EditableSpan title={task.title} onChange={changeTitleTaskHandler}/>

         <IconButton onClick={removeTask}>
            <Delete/>
         </IconButton>
      </li>
   );
});