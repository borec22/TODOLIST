import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
   addTodolistAC,
   addTodolistTC,
   getTodolistsTC,
   TodolistDomainType
} from './state/todolist-reducer/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

function AppWithRedux() {
   useEffect(() => {
      dispatch(getTodolistsTC())
   }, [])

   let dispatch = useDispatch();

   const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);

   const addTodolist = useCallback((title: string) => {
      dispatch(addTodolistTC(title));
   }, []);

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

export default AppWithRedux;
