import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

declare global {
   interface Window {
      tasks: Array<TaskType>
   }
}

export type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed';
type TasksType = {
   [key: string]: Array<TaskType>
}

const filterTasks = (tasks: Array<TaskType>, filter: FilterValuesType) => {
   if (filter === 'completed') {
      return tasks.filter(task => task.isDone);
   } else if (filter === 'active') {
      return tasks.filter(task => !task.isDone);
   }
   return tasks;
}

function App() {
   let todoListId1 = v1();
   let todoListId2 = v1();

   let [todolists, setTodolists] = useState<Array<TodolistType>>([
      {id: todoListId1, title: 'What to lear?', filter: 'all'},
      {id: todoListId2, title: 'What to watch?', filter: 'all'},
   ]);

   let [tasks, setTasks] = useState<TasksType>({
      [todoListId1]: [
         {id: v1(), title: 'CSS', isDone: true},
         {id: v1(), title: 'HTML', isDone: true},
         {id: v1(), title: 'JS', isDone: false},
         {id: v1(), title: 'REDUX', isDone: false},
      ],
      [todoListId2]: [
         {id: v1(), title: 'Spartacus', isDone: false},
         {id: v1(), title: 'Tom and Jerry', isDone: false},
      ]
   });

   // window.tasks = tasks;

   const removeTodoList = (id: string) => {
      setTodolists(todolists.filter(tl => tl.id !== id));

      delete tasks[id];

      setTasks({...tasks});
   }
   const addTodolist = (title: string) => {
      let todolist: TodolistType = {
         id: v1(),
         title,
         filter: 'all'
      }
      setTodolists([todolist, ...todolists]);
      setTasks({
         ...tasks,
         [todolist.id]: []
      });
   }
   const changeTodolistTitle = (title: string, todolistId: string) => setTodolists(
      todolists.map(t => t.id === todolistId ? {...t, title} : t)
   );
   const changeFilter = (filter: FilterValuesType, todoListID: string) => {
      setTodolists(todolists.map(tl => tl.id === todoListID ? {...tl, filter} : tl));
   };

   const removeTask = (taskId: string, todoListID: string) => {
      setTasks({
         ...tasks,
         [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)
      });
   };
   const addTask = (title: string, todoListID: string) => {
      const newTask = {id: v1(), title: title, isDone: false};
      setTasks({
         ...tasks,
         [todoListID]: [newTask, ...tasks[todoListID]]
      });
   }
   const changeStatusTask = (id: string, isDone: boolean, todoListID: string) => {
      setTasks({
         ...tasks,
         [todoListID]: tasks[todoListID].map(task => task.id === id ? {...task, isDone} : task)
      });
   }
   const changeTitleTask = (id: string, title: string, todoListID: string) => {
      setTasks({
         ...tasks,
         [todoListID]: tasks[todoListID].map(task => task.id === id ? {...task, title} : task)
      });
   }

   return (
      <div className="App">
         <AppBar position="static">
            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu/>
               </IconButton>
               <Typography variant="h6">
                  News
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>
         <Container fixed>
            <Grid container>
               <Box p={2} pl={0}>
                  <AddItemForm addItem={addTodolist}/>
               </Box>
            </Grid>
            <Grid container spacing={3}>
               {todolists.map(t => {
                  const filteredTasks = filterTasks(tasks[t.id], t.filter);
                  return (
                     <Grid item>
                        <Paper>
                           <Box p={2}>
                              <Todolist
                                 key={t.id}
                                 id={t.id}
                                 title={t.title}
                                 tasks={filteredTasks}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeStatusTask={changeStatusTask}
                                 changeTitleTask={changeTitleTask}
                                 filter={t.filter}
                                 removeTodoList={removeTodoList}
                                 changeTodolistTitle={changeTodolistTitle}
                              />
                           </Box>
                        </Paper>
                     </Grid>
                  );
               })}
            </Grid>
         </Container>
      </div>
   );
}

export default App;
