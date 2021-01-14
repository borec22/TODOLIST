import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTodolistAC} from './state/todolist-reducer/todolists-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useDispatch} from './state/store';

export type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TasksType = {
   [key: string]: Array<TaskType>
}

function App() {
   let dispatch = useDispatch();

   const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);

   const addTodolist = (title: string) => {
      dispatch(addTodolistAC(title));
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
               {todolists.map(todolist => {
                  return (
                     <Grid item key={todolist.id}>
                        <Paper>
                           <Box p={2}>
                              <Todolist key={todolist.id} id={todolist.id}/>
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
