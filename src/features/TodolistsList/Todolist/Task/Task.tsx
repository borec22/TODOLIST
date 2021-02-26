import React, {ChangeEvent, useCallback} from 'react';
import {removeTaskTC, TaskDomainType, updateTaskTC} from '../../tasks-reducer';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatusesType} from '../../../../api/task-api';
import {useDispatch} from 'react-redux';

export type TaskProsType = {
   task: TaskDomainType
   todolistId: string
   disabled: boolean
}
export const Task: React.FC<TaskProsType> = React.memo((props) => {
   const {task, todolistId, disabled} = props;

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
                   onChange={changeStatusTaskHandler}
                   disabled={disabled || task.entityStatus === 'loading'}
         />

         <EditableSpan title={task.title}
                       onChange={changeTitleTaskHandler}
                       disabled={disabled || task.entityStatus === 'loading'}
         />

         <IconButton onClick={removeTask} disabled={disabled || task.entityStatus === 'loading'}>
            <Delete/>
         </IconButton>
      </li>
   );
});