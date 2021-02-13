import React, {ChangeEvent, useEffect, useState} from 'react'
import axios from 'axios';
import {todolistAPI} from './api/todolist-api';
import {tasksAPI, UpdateApiTaskModelType} from './api/task-api';

export default {
   title: 'API'
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)

   useEffect(() => {
      // здесь мы будем делать запрос и ответ закидывать в стейт.
      // который в виде строки будем отображать в div-ке
      todolistAPI.getTodolists()
         .then(response => {
            setState(response.data);
         })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null);
   const [title, setTitle] = useState<string>('');

   const handleClick = () => {
      todolistAPI.createTodolist(title)
         .then(response => {
            setState(response.data);
         })
      setTitle('');
   }

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
   }

   return (
      <div>
         <h3>Create todolist</h3>
         <input type="text"
                placeholder='title'
                value={title}
                onChange={handleChange}
                style={{width: '280px'}}
         />
         <button onClick={handleClick}>
            create
         </button>

         <div>
            <h4>Response from server</h4>
            {JSON.stringify(state)}
         </div>
      </div>
   );
}

export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null);
   const [todolistId, setTodolistId] = useState<string>('');

   const handleClick = () => {
      todolistAPI.deleteTodolist(todolistId)
         .then(response => {
            setState(response.data);
         })
      setTodolistId('');
   }

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTodolistId(e.currentTarget.value);
   }

   return (
      <div>
         <h3>Delete todolist</h3>
         <input type="text"
                placeholder='todolistId'
                value={todolistId}
                onChange={handleChange}
                style={{width: '280px'}}
         />
         <button onClick={handleClick}>
            delete
         </button>

         <div>
            <h4>Response from server</h4>
            {JSON.stringify(state)}
         </div>
      </div>
   );
}

export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null);
   const [todolistId, setTodolistId] = useState<string>('');
   const [title, setTitle] = useState<string>('');

   const handleClick = () => {
      todolistAPI.updateTodolist(todolistId, title)
         .then(response => {
            setState(response.data);
            console.log(response.data);
         })
      setTitle('');
      setTodolistId('')
   }

   const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
   }

   const changeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTodolistId(e.currentTarget.value);
   }

   return (
      <div>
         <h3>Update todolist</h3>
         <input type="text"
                placeholder='todolistId'
                value={todolistId}
                onChange={changeTodolistIdHandler}
                style={{width: '280px'}}
         />
         <input type="text"
                placeholder='title'
                value={title}
                onChange={changeTitleHandler}
                style={{width: '280px'}}
         />
         <button onClick={handleClick}>
            update
         </button>

         <div>
            <h4>Response from server</h4>
            {JSON.stringify(state)}
         </div>
      </div>
   );
}

// -----------------------------------------------------------------------

export const GetTasksSelectedTodolist = () => {
   const [state, setState] = useState<any>(null);

   const [todolistId, setTodolistId] = useState<string>('');
   const [count, setCount] = useState<number>(10);
   const [page, setPage] = useState<number>(1);

   const handleClick = () => {
      tasksAPI.getTasks(todolistId, count, page)
         .then(response => {
            setState(response.data);
         })
      setTodolistId('')
   }

   const changeCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setCount(Number(e.currentTarget.value));
   }
   const changePageHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setPage(Number(e.currentTarget.value));
   }
   const changeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTodolistId(e.currentTarget.value);
   }

   return (
      <div>
         <h3>Get tasks</h3>
         <input type="text"
                placeholder='todolistId'
                value={todolistId}
                onChange={changeTodolistIdHandler}
                style={{width: '280px'}}
         /><br/>
         <input type="number"
                placeholder='count'
                value={count}
                onChange={changeCountHandler}
                style={{width: '280px'}}
         /><br/>
         <input type="number"
                placeholder='page'
                value={page}
                onChange={changePageHandler}
                style={{width: '280px'}}
         /><br/>
         <button onClick={handleClick}>
            GET TASKS
         </button>

         <div>
            <h4>Response from server</h4>
            {JSON.stringify(state)}
         </div>
      </div>
   );
}

export const CreateTaskSelectedTodolist = () => {
   const [state, setState] = useState<any>(null);

   const [todolistId, setTodolistId] = useState<string>('');
   const [title, setTitle] = useState<string>('');


   const handleClick = () => {
      tasksAPI.createTask(todolistId, title)
         .then(response => {
            setState(response.data);
         });

      setTitle('');
   }

   const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
   }

   const changeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTodolistId(e.currentTarget.value);
   }

   return (
      <div>
         <h3>Create task</h3>
         <input type="text"
                placeholder='todolistId'
                value={todolistId}
                onChange={changeTodolistIdHandler}
                style={{width: '280px'}}
         /><br/>
         <input type="text"
                placeholder='title'
                value={title}
                onChange={changeTitleHandler}
                style={{width: '280px'}}
         /><br/>
         <button onClick={handleClick}>
            CREATE TASK
         </button>

         <div>
            <h4>Response from server</h4>
            {JSON.stringify(state)}
         </div>
      </div>
   );
}

export const DeleteTaskSelectedTodolist = () => {
   const [state, setState] = useState<any>(null);

   const [todolistId, setTodolistId] = useState<string>('');
   const [taskId, setTaskId] = useState<string>('');


   const handleClick = () => {
      tasksAPI.deleteTask(todolistId, taskId)
         .then(response => {
            setState(response.data);
         });

      setTaskId('');
   }

   const changeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTaskId(e.currentTarget.value);
   }

   const changeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTodolistId(e.currentTarget.value);
   }

   return (
      <div>
         <h3>Delete task</h3>
         <input type="text"
                placeholder='todolistId'
                value={todolistId}
                onChange={changeTodolistIdHandler}
                style={{width: '280px'}}
         /><br/>
         <input type="text"
                placeholder='taskId'
                value={taskId}
                onChange={changeTaskIdHandler}
                style={{width: '280px'}}
         /><br/>
         <button onClick={handleClick}>
            DELETE TASK
         </button>

         <div>
            <h4>Response from server</h4>
            {JSON.stringify(state)}
         </div>
      </div>
   );
}

export const UpdateTaskSelectedTodolist = () => {
   const [state, setState] = useState<any>(null);

   const [todolistId, setTodolistId] = useState<string>('');
   const [taskId, setTaskId] = useState<string>('');

   let model: UpdateApiTaskModelType = {
      deadline: '05-02-2021',
      description: 'my first update task',
      priority: 0,
      startDate: '05-02-2021',
      status: 2,
      title: 'Rembo'
   }

   const handleClick = () => {
      tasksAPI.updateTask(todolistId, taskId, model)
         .then(response => {
            setState(response.data);
         });

      setTaskId('');
   }

   const changeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTaskId(e.currentTarget.value);
   }

   const changeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTodolistId(e.currentTarget.value);
   }

   return (
      <div>
         <h3>Update task</h3>
         <input type="text"
                placeholder='todolistId'
                value={todolistId}
                onChange={changeTodolistIdHandler}
                style={{width: '280px'}}
         /><br/>
         <input type="text"
                placeholder='taskId'
                value={taskId}
                onChange={changeTaskIdHandler}
                style={{width: '280px'}}
         /><br/>
         <button onClick={handleClick}>
            UPDATE TASK
         </button>

         <div>
            <h4>Response from server</h4>
            {JSON.stringify(state)}
         </div>
      </div>
   );
}