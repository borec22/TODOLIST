import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch} from './state/store';
import {changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from './state/tasks-reducer/tasks-reducer';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatusesType, TaskType} from './api/task-api';

export type TaskProsType = {
   task: TaskType
   todolistId: string
}
export const Task: React.FC<TaskProsType> = React.memo((props) => {
   const {task, todolistId} = props;

   const dispatch = useDispatch();

   const removeTask = () =>
      dispatch(removeTaskAC(task.id, todolistId));

   const changeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(
         changeStatusTaskAC(
            task.id,
            e.currentTarget.checked ? TaskStatusesType.Completed : TaskStatusesType.New,
            todolistId)
      );

   const changeTitleTaskHandler = useCallback((title: string) =>
      dispatch(changeTitleTaskAC(task.id, title, todolistId)), [todolistId, task]);

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